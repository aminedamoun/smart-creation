"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { CanvasTexture, LinearFilter, SRGBColorSpace, type Group } from "three";

type FaceKind = "S" | "C" | "top" | "bottom";

function makeFaceTexture(kind: FaceKind): CanvasTexture {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Background per face type
  const drawBg = (stops: [number, string][]) => {
    const grad = ctx.createLinearGradient(0, 0, size, size);
    for (const [t, c] of stops) grad.addColorStop(t, c);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  };

  if (kind === "S") {
    drawBg([
      [0, "#6fbce1"],
      [0.55, "#3a98cb"],
      [1, "#2074a0"],
    ]);
  } else if (kind === "C") {
    drawBg([
      [0, "#a8aaa9"],
      [0.55, "#7a7c7b"],
      [1, "#4a4e56"],
    ]);
  } else if (kind === "top") {
    drawBg([
      [0, "#fdfaf3"],
      [1, "#e8e2d3"],
    ]);
  } else {
    drawBg([
      [0, "#2a2d33"],
      [1, "#0d1013"],
    ]);
  }

  // Letter strokes (S / C)
  if (kind === "S" || kind === "C") {
    const pad = size * 0.18;
    const w = size - pad * 2;
    const bar = size * 0.11;
    const inner = size * 0.1;

    ctx.fillStyle = "#fbf9f3";
    // Subtle drop shadow under bars for depth
    ctx.shadowColor = "rgba(0,0,0,0.22)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 2;

    if (kind === "S") {
      // Top bar
      ctx.fillRect(pad, size * 0.22, w, bar);
      // Right connector (top -> middle)
      ctx.fillRect(pad + w - inner, size * 0.22, inner, size * 0.3);
      // Middle bar
      ctx.fillRect(pad, size * 0.445, w, bar);
      // Left connector (middle -> bottom)
      ctx.fillRect(pad, size * 0.5, inner, size * 0.3);
      // Bottom bar
      ctx.fillRect(pad, size * 0.67, w, bar);
    } else {
      // Top bar
      ctx.fillRect(pad, size * 0.22, w, bar);
      // Left spine (full height)
      ctx.fillRect(pad, size * 0.22, inner, size * 0.56);
      // Bottom bar
      ctx.fillRect(pad, size * 0.67, w, bar);
    }
    ctx.shadowColor = "transparent";
  }

  const tex = new CanvasTexture(canvas);
  tex.colorSpace = SRGBColorSpace;
  tex.minFilter = LinearFilter;
  tex.magFilter = LinearFilter;
  tex.anisotropy = 8;
  return tex;
}

function Cube() {
  const group = useRef<Group>(null);

  const { sTex, cTex, topTex, bottomTex } = useMemo(
    () => ({
      sTex: makeFaceTexture("S"),
      cTex: makeFaceTexture("C"),
      topTex: makeFaceTexture("top"),
      bottomTex: makeFaceTexture("bottom"),
    }),
    []
  );

  // Single-axis self-spin
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={group} rotation={[-0.18, 0.6, 0]}>
      <RoundedBox args={[2.4, 2.4, 2.4]} radius={0.12} smoothness={6} creaseAngle={0.4}>
        {/* BoxGeometry face order: +x, -x, +y, -y, +z, -z */}
        {/* +x right — C */}
        <meshStandardMaterial
          attach="material-0"
          map={cTex}
          metalness={0.15}
          roughness={0.38}
        />
        {/* -x left — C */}
        <meshStandardMaterial
          attach="material-1"
          map={cTex}
          metalness={0.15}
          roughness={0.38}
        />
        {/* +y top — paper */}
        <meshStandardMaterial
          attach="material-2"
          map={topTex}
          metalness={0.05}
          roughness={0.45}
        />
        {/* -y bottom — dark */}
        <meshStandardMaterial
          attach="material-3"
          map={bottomTex}
          metalness={0.1}
          roughness={0.55}
        />
        {/* +z front — S */}
        <meshStandardMaterial
          attach="material-4"
          map={sTex}
          metalness={0.15}
          roughness={0.38}
        />
        {/* -z back — S */}
        <meshStandardMaterial
          attach="material-5"
          map={sTex}
          metalness={0.15}
          roughness={0.38}
        />
      </RoundedBox>
    </group>
  );
}

export function SCCube3DModel() {
  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [2.4, 1.6, 2.6], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Soft key + cool rim + warm fill for premium finish */}
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 6, 4]} intensity={1.4} color="#ffffff" />
        <directionalLight position={[-4, 3, -2]} intensity={0.55} color="#8dc2dd" />
        <directionalLight position={[0, -5, 3]} intensity={0.3} color="#f6e8c6" />
        <pointLight position={[0, 0, 5]} intensity={0.25} color="#48a8db" />
        <Cube />
      </Canvas>
    </div>
  );
}
