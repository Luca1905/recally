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

interface DailyActivity {
  day: string;
  isActive: boolean;
}

interface StreakData {
  currentStreak: number;
  delta: number;
  dailyActivity: DailyActivity[];
}

export default function StudyStreak({
  data,
}: {
  data: StreakData;
}) {
  return (
    <div className="mb-8">
      <h2 className="mb-4 font-bold text-xl">Study Streak</h2>
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <CardTitle>Current streak: {data.currentStreak} days</CardTitle>
            <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
              +{data.delta} today
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex justify-between gap-2">
            {data.dailyActivity.map(({ day, isActive }) => (
              <TooltipProvider key={day}>
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
