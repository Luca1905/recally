"use client";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import type { DueDecksData } from "~/hooks/use-due-cards";

export default function DueSoon({
  data,
}: {
  data: DueDecksData;
}) {
  return (
    <div>
      <h2 className="mb-4 font-bold text-xl">Due Soon</h2>
      <Card className="mb-4 border-border bg-card">
        <CardContent className="p-6">
          <Tabs defaultValue="today" className="w-full">
            <TabsList className="mb-4 grid grid-cols-3 bg-muted">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
            </TabsList>

            <TabsContent value="today">
              <div className="space-y-2">
                {data.today.map((c) => (
                  <Card key={c.deckId} className="border-border bg-muted">
                    <CardContent className="flex items-center justify-between p-3">
                      <div>
                        <CardTitle className="font-medium text-sm">
                          {c.title}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {c.count} cards due
                        </CardDescription>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button className="h-8 bg-primary text-xs hover:bg-primary/90">
                              Study Now
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Start study session</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tomorrow">
              <div className="space-y-2">
                {data.tomorrow.map((c) => (
                  <Card key={c.deckId} className="border-border bg-muted">
                    <CardContent className="flex items-center justify-between p-3">
                      <div>
                        <CardTitle className="font-medium text-sm">
                          {c.title}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {c.count} cards due
                        </CardDescription>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button className="h-8 bg-primary text-xs hover:bg-primary/90">
                              Study Now
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Start study session</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="week">
              {data.week.length > 0 ? (
                <div className="space-y-2">
                  {data.week.map((c) => (
                    <Card key={c.deckId} className="border-border bg-muted">
                      <CardContent className="flex items-center justify-between p-3">
                        <div>
                          <CardTitle className="font-medium text-sm">
                            {c.title}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            {c.count} cards due
                          </CardDescription>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button className="h-8 bg-primary text-xs hover:bg-primary/90">
                                Study Now
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Start study session</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground text-sm">
                  No additional cards due this week.
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          variant="outline"
          className="w-full border-border text-muted-foreground"
        >
          View All Due Cards
        </Button>
      </div>
    </div>
  );
}
