"use client";

import { CalendarIcon } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import type { StreakData } from "~/localdb/streak";

function getLastNDaysHistory(
  history: string[],
  numDays = 7,
): { day: string; isActive: boolean; date: string }[] {
  const result: { day: string; isActive: boolean; date: string }[] = [];
  const today = new Date();
  for (let i = numDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    const dayLabel = d.toLocaleDateString(undefined, {
      weekday: "short",
    }); // e.g. "Wed"
    result.push({
      day: dayLabel,
      isActive: history.includes(iso),
      date: iso,
    });
  }
  return result;
}

export default function StudyStreak({
  data,
}: {
  data: StreakData;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const y = new Date();
  y.setDate(y.getDate() - 1);
  const yesterday = y.toISOString().slice(0, 10);

  const { history, currentStreak } = data;
  const last = history[history.length - 1];
  const prev = history[history.length - 2] ?? null;

  // only "lengthened" if yesterday was in history and today was just added
  const didLengthen = last === today && prev === yesterday;

  const dailyActivity = getLastNDaysHistory(history, 7);

  return (
    <div className="mb-8">
      <h2 className="mb-4 font-bold text-xl">Study Streak</h2>
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <CardTitle>Current streak: {currentStreak} days</CardTitle>
            <Badge
              className={`${
                didLengthen
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-primary/20 text-primary hover:bg-primary/30"
              }`}
            >
              today
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex justify-between gap-2">
            {dailyActivity.map(({ day, isActive, date }) => (
              <TooltipProvider key={date}>
                <Tooltip>
                  <TooltipTrigger className="flex flex-col items-center">
                    <div
                      className={`mb-1 flex h-10 w-10 items-center justify-center rounded-full ${
                        isActive
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <CalendarIcon className="h-5 w-5" />
                    </div>
                    <div className="text-muted-foreground text-xs">{day}</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isActive ? "Studied" : "No study session"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
