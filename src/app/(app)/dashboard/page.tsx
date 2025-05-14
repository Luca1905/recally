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
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { AppSidebar } from "./_components/app-sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
        </header>
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="font-bold text-2xl">Dashboard</h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="bg-orange-500 hover:bg-orange-600">
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
            <Card className="border-zinc-700 bg-zinc-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-zinc-400">
                    Total Decks
                  </CardTitle>
                  <BookOpenIcon className="h-4 w-4 text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-bold text-2xl">3</p>
                <Badge
                  variant="outline"
                  className="mt-1 bg-transparent text-green-500 text-xs"
                >
                  +1 this week
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-zinc-700 bg-zinc-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-zinc-400">
                    Total Cards
                  </CardTitle>
                  <BrainIcon className="h-4 w-4 text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-bold text-2xl">43</p>
                <Badge
                  variant="outline"
                  className="mt-1 bg-transparent text-green-500 text-xs"
                >
                  +4 this week
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-zinc-700 bg-zinc-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-zinc-400">
                    Study Time
                  </CardTitle>
                  <BarChart3Icon className="h-4 w-4 text-green-400" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-bold text-2xl">2.5h</p>
                <Badge
                  variant="outline"
                  className="mt-1 bg-transparent text-green-500 text-xs"
                >
                  +0.5h from last week
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-zinc-700 bg-zinc-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-zinc-400">
                    Mastery
                  </CardTitle>
                  <TrendingUpIcon className="h-4 w-4 text-orange-400" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-bold text-2xl">67%</p>
                <Progress value={67} className="mt-2 h-1.5" />
                <Badge
                  variant="outline"
                  className="mt-1 bg-transparent text-green-500 text-xs"
                >
                  +5% from last week
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Daily Streaks */}
          <div className="mb-8">
            <h2 className="mb-4 font-bold text-xl">Study Streak</h2>
            <Card className="border-zinc-700 bg-zinc-800">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <CardTitle>Current streak: 3 days</CardTitle>
                  <Badge className="bg-green-900/30 text-green-400 hover:bg-green-900/50">
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
                                    ? "bg-green-900/30 text-green-400"
                                    : "bg-zinc-700/30 text-zinc-500"
                                }`}
                              >
                                <CalendarIcon className="h-5 w-5" />
                              </div>
                              <div className="text-xs text-zinc-500">{day}</div>
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
              <Card className="border-zinc-700 bg-zinc-800">
                <CardContent className="p-6">
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      <div className="border-purple-500 border-l-2 pl-4">
                        <div className="font-medium text-sm">
                          Created new deck "Glossary of Key Terms"
                        </div>
                        <div className="text-xs text-zinc-500">2 hours ago</div>
                      </div>

                      <div className="border-blue-500 border-l-2 pl-4">
                        <div className="font-medium text-sm">
                          Completed study session on "Anatomy Study Notes"
                        </div>
                        <div className="text-xs text-zinc-500">
                          Yesterday at 8:30 PM
                        </div>
                      </div>

                      <div className="border-green-500 border-l-2 pl-4">
                        <div className="font-medium text-sm">
                          Added 5 new cards to "Calculus Formulas"
                        </div>
                        <div className="text-xs text-zinc-500">3 days ago</div>
                      </div>

                      <div className="border-orange-500 border-l-2 pl-4">
                        <div className="font-medium text-sm">
                          Created new deck "Calculus Formulas"
                        </div>
                        <div className="text-xs text-zinc-500">3 days ago</div>
                      </div>

                      <div className="border-purple-500 border-l-2 pl-4">
                        <div className="font-medium text-sm">
                          Completed study session on "Glossary of Key Terms"
                        </div>
                        <div className="text-xs text-zinc-500">4 days ago</div>
                      </div>

                      <div className="border-blue-500 border-l-2 pl-4">
                        <div className="font-medium text-sm">
                          Added notes to "Anatomy Study Notes"
                        </div>
                        <div className="text-xs text-zinc-500">5 days ago</div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="mb-4 font-bold text-xl">Due Soon</h2>
              <Card className="mb-4 border-zinc-700 bg-zinc-800">
                <CardContent className="p-6">
                  <Tabs defaultValue="today" className="w-full">
                    <TabsList className="mb-4 grid grid-cols-3 bg-zinc-900">
                      <TabsTrigger value="today">Today</TabsTrigger>
                      <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
                      <TabsTrigger value="week">This Week</TabsTrigger>
                    </TabsList>

                    <TabsContent value="today">
                      <div className="space-y-2">
                        <Card className="border-zinc-700 bg-zinc-700/30">
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
                                  <Button className="h-8 bg-purple-600 text-xs hover:bg-purple-700">
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

                        <Card className="border-zinc-700 bg-zinc-700/30">
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
                                  <Button className="h-8 bg-purple-600 text-xs hover:bg-purple-700">
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
                        <Card className="border-zinc-700 bg-zinc-700/30">
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
                                  <Button className="h-8 bg-purple-600 text-xs hover:bg-purple-700">
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
                      <div className="p-4 text-center text-sm text-zinc-500">
                        No additional cards due this week.
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button
                  variant="outline"
                  className="w-full border-zinc-700 text-zinc-400"
                >
                  View All Due Cards
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
