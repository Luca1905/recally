"use client";

import {
  BarChart3Icon,
  BookOpenIcon,
  BrainIcon,
  TrendingUpIcon,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";

interface StatsData {
  totalDecks: number;
  decksDelta: number;
  totalCards: number;
  cardsDelta: number;
  studyTime: string;
  studyTimeDelta: string;
  mastery: number;
  masteryDelta: number;
}

export default function StatsCards({
  data,
}: {
  data: StatsData;
}) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-muted-foreground text-sm">
              Total Decks
            </CardTitle>
            <BookOpenIcon className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-2xl">{data.totalDecks}</p>
          <Badge
            variant="outline"
            className="mt-1 bg-transparent text-primary text-xs"
          >
            +{data.decksDelta} this week
          </Badge>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-muted-foreground text-sm">
              Total Cards
            </CardTitle>
            <BrainIcon className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-2xl">{data.totalCards}</p>
          <Badge
            variant="outline"
            className="mt-1 bg-transparent text-primary text-xs"
          >
            +{data.cardsDelta} this week
          </Badge>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-muted-foreground text-sm">
              Study Time
            </CardTitle>
            <BarChart3Icon className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-2xl">{data.studyTime}</p>
          <Badge
            variant="outline"
            className="mt-1 bg-transparent text-primary text-xs"
          >
            {data.studyTimeDelta}
          </Badge>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-muted-foreground text-sm">
              Mastery
            </CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-2xl">{data.mastery}%</p>
          <Progress value={data.mastery} className="mt-2 h-1.5" />
          <Badge
            variant="outline"
            className="mt-1 bg-transparent text-primary text-xs"
          >
            +{data.masteryDelta}% from last week
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
}
