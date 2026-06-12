"use client";

import { createContext, useContext, useEffect, useState } from "react";

type LikesCtx = {
  likedIds: string[];
  toggleLike: (slug: string, newVal: boolean) => void;
};

const LikesContext = createContext<LikesCtx>({
  likedIds: [],
  toggleLike: () => {},
});

export function LikesProvider({ children }: { children: React.ReactNode }) {
  const [likedIds, setLikedIds] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      const r = await fetch("/api/likes");
      const data = r.ok ? await r.json() : { toolIds: [] };
      setLikedIds(data.toolIds ?? []);
    }
    load();
  }, []);

  function toggleLike(slug: string, newVal: boolean) {
    setLikedIds((prev) =>
      newVal ? [...prev, slug] : prev.filter((id) => id !== slug),
    );
  }

  return (
    <LikesContext.Provider value={{ likedIds, toggleLike }}>
      {children}
    </LikesContext.Provider>
  );
}

export const useLikes = () => useContext(LikesContext);
