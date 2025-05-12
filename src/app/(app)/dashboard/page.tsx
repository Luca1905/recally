"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import CountUp from "react-countup";
import { Button } from "~/components/ui/button";

export default function DashboardPage() {
	const [chartHovered, setChartHovered] = useState(false);

	// Sample data for the activity chart
	const weeklyActivity = [
		{ day: "Mon", reviews: 15, newCards: 5 },
		{ day: "Tue", reviews: 22, newCards: 8 },
		{ day: "Wed", reviews: 18, newCards: 3 },
		{ day: "Thu", reviews: 25, newCards: 10 },
		{ day: "Fri", reviews: 30, newCards: 7 },
		{ day: "Sat", reviews: 12, newCards: 2 },
		{ day: "Sun", reviews: 8, newCards: 0 },
	];

	// Calculate max value for scaling
	const maxValue = Math.max(
		...weeklyActivity.map((d) => d.reviews + d.newCards),
	);

	return (
		<div className="container mx-auto p-6">
			<motion.div
				className="mb-8"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<h1 className="font-bold text-3xl">Welcome back, Alex</h1>
				<p className="text-foreground/60">
					Here's your learning progress for today
				</p>
			</motion.div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{/* Today's reviews card */}
				<motion.div
					className="overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-6 text-white shadow-lg"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					whileHover={{ y: -5, transition: { duration: 0.2 } }}
				>
					<div className="relative z-10">
						<h2 className="mb-1 font-medium text-lg text-white/80">
							Today's Reviews
						</h2>
						<div className="mb-4 font-bold text-5xl">
							<CountUp end={12} duration={2} />
						</div>
						<Button
							asChild
							className="group bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
						>
							<Link href="/study/1">
								Continue Studying
								<svg
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="ml-2 transition-transform group-hover:translate-x-1"
								>
									<path d="M5 12h14" />
									<path d="m12 5 7 7-7 7" />
								</svg>
							</Link>
						</Button>
					</div>

					{/* Decorative elements */}
					<div className="-right-6 -top-6 absolute h-24 w-24 rounded-full bg-white opacity-10" />
					<div className="-bottom-8 -left-8 absolute h-32 w-32 rounded-full bg-white opacity-10" />
				</motion.div>

				{/* Streak card */}
				<motion.div
					className="overflow-hidden rounded-2xl bg-white p-6 shadow-lg"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					whileHover={{ y: -5, transition: { duration: 0.2 } }}
				>
					<div className="relative z-10">
						<div className="mb-4 flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/20">
								<svg
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="text-warning"
								>
									<path d="M12 2v1" />
									<path d="M12 21v1" />
									<path d="M4.93 4.93l.7.7" />
									<path d="M18.36 18.36l.7.7" />
									<path d="M2 12h1" />
									<path d="M21 12h1" />
									<path d="M4.93 19.07l.7-.7" />
									<path d="M18.36 5.64l.7-.7" />
									<circle cx="12" cy="12" r="4" />
								</svg>
							</div>
							<h2 className="font-medium text-lg">Current Streak</h2>
						</div>

						<div className="mb-2 font-bold text-5xl">
							<CountUp end={5} duration={2} />
						</div>
						<p className="text-foreground/60">days in a row</p>

						<div className="mt-4 flex gap-1">
							{[1, 2, 3, 4, 5, 6, 7].map((day) => (
								<motion.div
									key={day}
									className={`h-2 w-full rounded-full ${day <= 5 ? "bg-warning" : "bg-foreground/10"}`}
									initial={{ scaleX: 0 }}
									animate={{ scaleX: 1 }}
									transition={{ duration: 0.5, delay: 0.2 + day * 0.1 }}
								/>
							))}
						</div>
					</div>
				</motion.div>

				{/* Progress card */}
				<motion.div
					className="overflow-hidden rounded-2xl bg-white p-6 shadow-lg"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					whileHover={{ y: -5, transition: { duration: 0.2 } }}
				>
					<div className="relative z-10">
						<div className="mb-4 flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/20">
								<svg
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="text-success"
								>
									<path d="M22 12h-4l-3 9L9 3l-3 9H2" />
								</svg>
							</div>
							<h2 className="font-medium text-lg">Weekly Progress</h2>
						</div>

						<div className="mb-2 font-bold text-5xl">
							<CountUp end={87} duration={2} suffix="%" />
						</div>
						<p className="text-foreground/60">cards mastered this week</p>

						<div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-foreground/10">
							<motion.div
								className="h-full rounded-full bg-success"
								initial={{ width: 0 }}
								animate={{ width: "87%" }}
								transition={{ duration: 1, delay: 0.5 }}
							/>
						</div>
					</div>
				</motion.div>
			</div>

			<div className="mt-8 grid gap-6 lg:grid-cols-3">
				{/* Activity chart */}
				<motion.div
					className="lg:col-span-2"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					<div className="rounded-2xl bg-white p-6 shadow-lg">
						<div className="mb-6 flex items-center justify-between">
							<h2 className="font-bold text-xl">Weekly Activity</h2>
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-2">
									<div className="h-3 w-3 rounded-full bg-primary" />
									<span className="text-foreground/60 text-sm">Reviews</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="h-3 w-3 rounded-full bg-accent" />
									<span className="text-foreground/60 text-sm">New Cards</span>
								</div>
							</div>
						</div>

						<motion.div
							className="flex h-[200px] items-end gap-4 px-2"
							onHoverStart={() => setChartHovered(true)}
							onHoverEnd={() => setChartHovered(false)}
						>
							{weeklyActivity.map((data, index) => (
								<div
									key={data.day}
									className="flex flex-1 flex-col items-center gap-2"
								>
									<motion.div
										className="relative w-full"
										initial={{ height: 0 }}
										animate={{
											height: `${((data.reviews + data.newCards) / maxValue) * 150}px`,
										}}
										transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
									>
										<motion.div
											className="w-full rounded-t-lg bg-primary"
											initial={{ height: 0 }}
											animate={{
												height: `${(data.reviews / maxValue) * 150}px`,
											}}
											transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
											whileHover={{ opacity: 0.8 }}
										/>
										<motion.div
											className="absolute bottom-0 left-0 w-full rounded-t-lg bg-accent"
											initial={{ height: 0 }}
											animate={{
												height: `${(data.newCards / maxValue) * 150}px`,
											}}
											transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
											whileHover={{ opacity: 0.8 }}
										/>
									</motion.div>
									<div className="font-medium text-foreground/60 text-xs">
										{data.day}
									</div>
								</div>
							))}
						</motion.div>
					</div>
				</motion.div>

				{/* Upcoming reviews */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.5 }}
				>
					<div className="h-[293px] rounded-2xl bg-white p-6 shadow-lg">
						<div className="flex items-center justify-between">
							<h2 className="font-bold text-xl">Upcoming Reviews</h2>
							<Button
								variant="ghost"
								size="sm"
								className="text-primary hover:text-primary-dark"
							>
								View all
							</Button>
						</div>

						<div className="bg-center">
							<motion.div
								className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-primary/5"
								whileHover={{ x: 5 }}
								transition={{ type: "spring", stiffness: 400, damping: 10 }}
							>
								<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
									<svg
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-primary"
									>
										<rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
										<line x1="16" x2="16" y1="2" y2="6" />
										<line x1="8" x2="8" y1="2" y2="6" />
										<line x1="3" x2="21" y1="10" y2="10" />
									</svg>
								</div>
								<div className="flex-1">
									<div className="font-medium">Tomorrow</div>
									<div className="text-foreground/60 text-sm">15 cards due</div>
								</div>
							</motion.div>

							<motion.div
								className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-primary/5"
								whileHover={{ x: 5 }}
								transition={{ type: "spring", stiffness: 400, damping: 10 }}
							>
								<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
									<svg
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-primary"
									>
										<rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
										<line x1="16" x2="16" y1="2" y2="6" />
										<line x1="8" x2="8" y1="2" y2="6" />
										<line x1="3" x2="21" y1="10" y2="10" />
									</svg>
								</div>
								<div className="flex-1">
									<div className="font-medium">In 2 days</div>
									<div className="text-foreground/60 text-sm">23 cards due</div>
								</div>
							</motion.div>

							<motion.div
								className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-primary/5"
								whileHover={{ x: 5 }}
								transition={{ type: "spring", stiffness: 400, damping: 10 }}
							>
								<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
									<svg
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-primary"
									>
										<circle cx="12" cy="12" r="10" />
										<polyline points="12 6 12 12 16 14" />
									</svg>
								</div>
								<div className="flex-1">
									<div className="font-medium">This week</div>
									<div className="text-foreground/60 text-sm">42 cards due</div>
								</div>
							</motion.div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
