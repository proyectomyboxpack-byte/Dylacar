"use client";

import dynamic from "next/dynamic";

const Car3D = dynamic(() => import("./Car3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--yellow)] border-t-transparent" />
    </div>
  ),
});

export default function Car3DWrapper() {
  return <Car3D />;
}
