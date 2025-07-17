"use client";

import { useEffect, useState } from "react";
import {
  type StreakData,
  getStreakData as _getStreakData,
} from "~/localdb/streak";

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
