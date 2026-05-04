/**
 * Tiny admin auth — password-only, stored in ADMIN_PASSWORD env var.
 * On successful login we set an httpOnly cookie containing an HMAC-signed
 * token. Server-side route handlers / pages call requireAdmin() to gate.
 *
 * Not user-management — single shared password. Good enough for one admin.
 */
import "server-only";
import { createHmac } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "sc_admin";
const TTL_DAYS = 7;

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSWORD ?? "dev-only-fallback";
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

function makeToken(): string {
  const exp = Date.now() + TTL_DAYS * 24 * 60 * 60 * 1000;
  const payload = `v1.${exp}`;
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "v1") return false;
  const exp = Number(parts[1]);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  return sign(`${parts[0]}.${parts[1]}`) === parts[2];
}

export async function loginWithPassword(password: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    console.error("ADMIN_PASSWORD env var not set — admin login disabled");
    return false;
  }
  if (password !== expected) return false;
  const token = makeToken();
  const c = await cookies();
  c.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: TTL_DAYS * 24 * 60 * 60,
  });
  return true;
}

export async function logout(): Promise<void> {
  const c = await cookies();
  c.delete(COOKIE_NAME);
}

export async function isLoggedIn(): Promise<boolean> {
  const c = await cookies();
  return verifyToken(c.get(COOKIE_NAME)?.value);
}

export async function requireAdmin(): Promise<void> {
  if (!(await isLoggedIn())) redirect("/admin/login");
}
