"use client";

import { Card, CardContent } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { formatUNIX } from "~/lib/utils";
import type { Activity } from "~/localdb/dexie";

export default function RecentActivity({
  data,
}: {
  data: Activity[];
}) {
  return (
    <div>
      <h2 className="mb-4 font-bold text-xl">Recent Activity</h2>
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {data
                .sort((a, b) => a.timestamp - b.timestamp)
                .map((act) => (
                  <div key={act.id} className="border-primary border-l-2 pl-4">
                    <div className="font-medium text-sm">{act.message}</div>
                    <div className="text-muted-foreground text-xs">
                      {formatUNIX(act.timestamp)}
                    </div>
                  </div>
                ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
