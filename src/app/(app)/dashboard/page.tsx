"use client";

import {
  BarChart3Icon,
  BookOpenIcon,
  BrainIcon,
  CalendarIcon,
  PlusIcon,
  TrendingUpIcon,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export default function Page() {
  return (
    <>
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

        {/* Stats Cards */}
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
              <p className="font-bold text-2xl">3</p>
              <Badge
                variant="outline"
                className="mt-1 bg-transparent text-primary text-xs"
              >
                +1 this week
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
              <p className="font-bold text-2xl">43</p>
              <Badge
                variant="outline"
                className="mt-1 bg-transparent text-primary text-xs"
              >
                +4 this week
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
              <p className="font-bold text-2xl">2.5h</p>
              <Badge
                variant="outline"
                className="mt-1 bg-transparent text-primary text-xs"
              >
                +0.5h from last week
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
              <p className="font-bold text-2xl">67%</p>
              <Progress value={67} className="mt-2 h-1.5" />
              <Badge
                variant="outline"
                className="mt-1 bg-transparent text-primary text-xs"
              >
                +5% from last week
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Daily Streaks */}
        <div className="mb-8">
          <h2 className="mb-4 font-bold text-xl">Study Streak</h2>
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <CardTitle>Current streak: 3 days</CardTitle>
                <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                  +1 today
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-2 flex justify-between gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, i) => {
                    const isActive = i < 3;
                    return (
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
                            <div className="text-muted-foreground text-xs">
                              {day}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{isActive ? "Studied" : "No study session"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  },
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Due Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 font-bold text-xl">Recent Activity</h2>
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    <div className="border-primary border-l-2 pl-4">
                      <div className="font-medium text-sm">
                        Created new deck "Glossary of Key Terms"
                      </div>
                      <div className="text-muted-foreground text-xs">
                        2 hours ago
                      </div>
                    </div>

                    <div className="border-primary border-l-2 pl-4">
                      <div className="font-medium text-sm">
                        Completed study session on "Anatomy Study Notes"
                      </div>
                      <div className="text-muted-foreground text-xs">
                        Yesterday at 8:30 PM
                      </div>
                    </div>

                    <div className="border-primary border-l-2 pl-4">
                      <div className="font-medium text-sm">
                        Added 5 new cards to "Calculus Formulas"
                      </div>
                      <div className="text-muted-foreground text-xs">
                        3 days ago
                      </div>
                    </div>

                    <div className="border-primary border-l-2 pl-4">
                      <div className="font-medium text-sm">
                        Created new deck "Calculus Formulas"
                      </div>
                      <div className="text-muted-foreground text-xs">
                        3 days ago
                      </div>
                    </div>

                    <div className="border-primary border-l-2 pl-4">
                      <div className="font-medium text-sm">
                        Completed study session on "Glossary of Key Terms"
                      </div>
                      <div className="text-muted-foreground text-xs">
                        4 days ago
                      </div>
                    </div>

                    <div className="border-primary border-l-2 pl-4">
                      <div className="font-medium text-sm">
                        Added notes to "Anatomy Study Notes"
                      </div>
                      <div className="text-muted-foreground text-xs">
                        5 days ago
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

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
                      <Card className="border-border bg-muted">
                        <CardContent className="flex items-center justify-between p-3">
                          <div>
                            <CardTitle className="font-medium text-sm">
                              Glossary of Key Terms
                            </CardTitle>
                            <CardDescription className="text-xs">
                              4 cards due
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

                      <Card className="border-border bg-muted">
                        <CardContent className="flex items-center justify-between p-3">
                          <div>
                            <CardTitle className="font-medium text-sm">
                              Anatomy Study Notes
                            </CardTitle>
                            <CardDescription className="text-xs">
                              12 cards due
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
                    </div>
                  </TabsContent>

                  <TabsContent value="tomorrow">
                    <div className="space-y-2">
                      <Card className="border-border bg-muted">
                        <CardContent className="flex items-center justify-between p-3">
                          <div>
                            <CardTitle className="font-medium text-sm">
                              Calculus Formulas
                            </CardTitle>
                            <CardDescription className="text-xs">
                              8 cards due
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
                    </div>
                  </TabsContent>

                  <TabsContent value="week">
                    <div className="p-4 text-center text-muted-foreground text-sm">
                      No additional cards due this week.
                    </div>
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
        </div>
      </div>
    </>
  );
}
