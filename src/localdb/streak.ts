const STREAK_KEY = "streak-data";

export type StreakData = {
  currentStreak: number;
  history: string[];
};

function isBrowser(): boolean {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

export function getStreakData(): StreakData {
  if (!isBrowser()) {
    console.log("STREAK not in local Storage");
    return { currentStreak: 0, history: [] };
  }

  const json = window.localStorage.getItem(STREAK_KEY);
  if (!json) {
    return { currentStreak: 0, history: [] };
  }
  try {
    return JSON.parse(json) as StreakData;
  } catch {
    return { currentStreak: 0, history: [] };
  }
}

// compute full-day difference between two “YYYY-MM-DD” strings
function dateDiffInDays(a: string, b: string): number {
  const da = new Date(a);
  const db = new Date(b);
  const msPerDay = 1000 * 60 * 60 * 24;
  const utcA = Date.UTC(da.getFullYear(), da.getMonth(), da.getDate());
  const utcB = Date.UTC(db.getFullYear(), db.getMonth(), db.getDate());
  return Math.floor((utcB - utcA) / msPerDay);
}

export function updateStreak(): StreakData {
  if (!isBrowser()) {
    console.log("STREAK not in local Storage");
    return { currentStreak: 0, history: [] };
  }

  const data = getStreakData();
  const today = new Date().toISOString().slice(0, 10);
  const hist = data.history;
  const last = hist[hist.length - 1];

  if (last === today) {
    return data;
  }

  let newStreak: number;
  if (last && dateDiffInDays(last, today) === 1) {
    newStreak = data.currentStreak + 1;
  } else {
    newStreak = 1;
  }

  const newHistory = [...hist, today];
  const newData: StreakData = {
    currentStreak: newStreak,
    history: newHistory,
  };

  window.localStorage.setItem(STREAK_KEY, JSON.stringify(newData));
  return newData;
}
