import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import DueSoon from "~/components/dashboard/due-soon";
import RecentActivity from "~/components/dashboard/recent-activity";
import StatsCards from "~/components/dashboard/stats-card";
import StudyStreak from "~/components/dashboard/study-streak";

export default async function Page() {
  const stats = await getStats();
  const streak = await getStudyStreak();
  const activities = await getRecentActivity();
  const dueCards = await getDueCards();

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Link href="/app" className="flex items-center">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  New Deck
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create a new deck</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <StatsCards data={stats} />
      <StudyStreak data={streak} />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <RecentActivity data={activities} />
        <DueSoon data={dueCards} />
      </div>
    </div>
  );
}
