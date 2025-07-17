"use client";

import { useState, useEffect } from "react";
import { getStreakData as _getStreakData, type StreakData } from "~/localdb/streak";

export function useStreakData(): StreakData {
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    history: [],
  });

  useEffect(() => {
    // this only ever runs in the browser
    const data = _getStreakData();
    setStreak(data);
  }, []);

  return streak;
}
