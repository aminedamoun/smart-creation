import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/admin-auth";
import { loginAction } from "../actions";

export const dynamic = "force-dynamic";

type Args = { searchParams: Promise<{ error?: string }> };

export default async function LoginPage({ searchParams }: Args) {
  if (await isLoggedIn()) redirect("/admin");
  const sp = await searchParams;
  const showError = sp.error === "1";

  return (
    <div className="min-h-screen grid place-items-center px-6">
      <form
        action={loginAction}
        className="w-full max-w-sm rounded-3xl border border-ink/10 bg-paper p-8 shadow-[0_30px_80px_-40px_rgba(13,16,19,0.25)]"
      >
        <div className="mb-6">
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-2">
            Smart Creation · Admin
          </div>
          <h1 className="font-display text-[1.8rem] tracking-[-0.02em] text-ink">Sign in</h1>
          <p className="mt-1 text-[0.9rem] text-ink-mute">
            Enter the admin password to continue.
          </p>
        </div>
        {showError && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[0.85rem] text-red-700">
            Wrong password.
          </div>
        )}
        <label className="block text-[0.85rem] text-ink-mute mb-2">Password</label>
        <input
          name="password"
          type="password"
          required
          autoFocus
          className="w-full rounded-xl border border-ink/15 bg-paper-soft px-3 py-2.5 text-[0.95rem] text-ink focus:outline-none focus:border-ink/40"
        />
        <button
          type="submit"
          className="mt-5 w-full rounded-full bg-brand-night text-paper px-5 py-3 text-[0.95rem] font-medium hover:bg-brand transition-colors"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
