"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { useMousePosition, useWindowSize } from "~/lib/hooks";

export default function LandingPage() {
	const windowSize = useWindowSize();
	const mousePosition = useMousePosition();

	const calculateTransform = (x: number, y: number, strength = 20) => {
		if (windowSize.width === undefined || windowSize.height === undefined) {
			return { x: 1920 / 2, y: 1080 / 2 };
		}

		const centerX = windowSize.width / 2;
		const centerY = windowSize.height / 2;

		const deltaX = (x - centerX) / strength;
		const deltaY = (y - centerY) / strength;

		return { x: deltaX, y: deltaY };
	};

	return (
		<div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary-light via-background to-accent-light">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<motion.div
					className="absolute top-20 left-[10%] h-64 w-64 rounded-full bg-primary/20 blur-3xl"
					animate={{
						x: [0, 30, 0],
						y: [0, 20, 0],
					}}
					transition={{
						duration: 8,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "reverse",
					}}
				/>
				<motion.div
					className="absolute right-[10%] bottom-20 h-80 w-80 rounded-full bg-secondary/20 blur-3xl"
					animate={{
						x: [0, -40, 0],
						y: [0, 30, 0],
					}}
					transition={{
						duration: 10,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "reverse",
					}}
				/>
				<motion.div
					className="absolute top-[40%] left-[40%] h-72 w-72 rounded-full bg-accent/20 blur-3xl"
					animate={{
						x: [0, 20, 0],
						y: [0, -30, 0],
					}}
					transition={{
						duration: 12,
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "reverse",
					}}
				/>
			</div>

			{/* Decorative elements */}
			<div className="absolute inset-0 z-0">
				<motion.div
					className="absolute top-20 right-20 h-16 w-16 rounded-full border-2 border-primary/30"
					style={{
						transform: `translate(${calculateTransform(mousePosition.x, mousePosition.y, 40).x}px, ${calculateTransform(mousePosition.x, mousePosition.y, 40).y}px)`,
					}}
				/>
				<motion.div
					className="absolute bottom-40 left-20 h-24 w-24 rounded-full border-2 border-secondary/30"
					style={{
						transform: `translate(${calculateTransform(mousePosition.x, mousePosition.y, 60).x}px, ${calculateTransform(mousePosition.x, mousePosition.y, 60).y}px)`,
					}}
				/>
				<motion.div
					className="absolute top-1/2 left-1/3 h-12 w-12 rotate-45 border-2 border-accent/30"
					style={{
						transform: `translate(${calculateTransform(mousePosition.x, mousePosition.y, 30).x}px, ${calculateTransform(mousePosition.x, mousePosition.y, 30).y}px) rotate(45deg)`,
					}}
				/>
			</div>

			{/* Content */}
			<div className="relative z-10 flex min-h-screen flex-col">
				<header className="container mx-auto flex items-center justify-between p-6">
					<motion.div
						className="font-bold text-2xl text-primary"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						Recally
					</motion.div>
					<motion.div
						className="flex items-center gap-4"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						<Link
							href="/login"
							className="text-foreground/80 transition-colors hover:text-primary"
						>
							Log In
						</Link>
						<Link
							href="/signup"
							className="rounded-full bg-primary px-4 py-2 text-white shadow-lg transition-colors hover:bg-primary-dark"
						>
							Sign Up
						</Link>
					</motion.div>
				</header>

				<main className="container mx-auto flex flex-1 flex-col items-center justify-center px-6 py-12">
					<div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-16">
						<div className="flex flex-col justify-center">
							<motion.h1
								className="mb-6 font-bold text-5xl leading-tight md:text-6xl lg:text-7xl"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.7 }}
							>
								<span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
									Remember more
								</span>
								<br />
								by spacing out your reviews
							</motion.h1>

							<motion.p
								className="mb-8 max-w-md text-foreground/80 text-lg"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.7, delay: 0.2 }}
							>
								Recally uses science-backed spaced repetition to help you
								remember what you learn, forever.
							</motion.p>

							<motion.div
								className="flex flex-wrap gap-4"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.7, delay: 0.4 }}
							>
								<Link
									href="/dashboard"
									className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-3 text-white shadow-lg transition-all hover:shadow-xl"
								>
									<span className="relative z-10">Get Started</span>
									<span className="absolute inset-0 z-0 bg-gradient-to-r from-primary-dark to-secondary opacity-0 transition-opacity group-hover:opacity-100" />
								</Link>

								<Link
									href="#how-it-works"
									className="group rounded-full border-2 border-primary/30 bg-transparent px-8 py-3 text-primary transition-all hover:border-primary hover:bg-primary/5"
								>
									Learn More
									<span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
										→
									</span>
								</Link>
							</motion.div>
						</div>

						<motion.div
							className="relative flex items-center justify-center"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.7, delay: 0.3 }}
						>
							<div className="relative w-full max-w-md">
								<div className="-left-6 -top-6 absolute h-24 w-24 rounded-xl bg-primary/20" />
								<div className="-bottom-8 -right-8 absolute h-32 w-32 rounded-full bg-secondary/20" />

								<motion.div
									className="card-container relative w-full"
									whileHover={{ scale: 1.03 }}
									transition={{ type: "spring", stiffness: 300 }}
								>
									<div className="card relative rounded-2xl bg-white p-6 shadow-xl">
										<div className="mb-6 flex items-center justify-between">
											<div className="flex items-center gap-3">
												<div className="h-10 w-10 rounded-full bg-primary/20 p-2">
													<div className="h-full w-full rounded-full bg-primary" />
												</div>
												<div>
													<div className="font-medium">Spanish Vocabulary</div>
													<div className="text-foreground/60 text-xs">
														120 cards
													</div>
												</div>
											</div>
											<div className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary text-xs">
												12 due today
											</div>
										</div>

										<div className="mb-6 rounded-xl bg-primary/5 p-6">
											<div className="mb-2 font-medium text-primary text-sm">
												Front
											</div>
											<div className="font-bold text-2xl">¿Cómo estás?</div>
										</div>

										<div className="mb-6 rounded-xl bg-secondary/5 p-6">
											<div className="mb-2 font-medium text-secondary text-sm">
												Back
											</div>
											<div className="font-bold text-2xl">How are you?</div>
										</div>

										<div className="flex justify-between gap-2">
											{[1, 2, 3, 4, 5].map((rating) => (
												<Button
													key={rating}
													className={`flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform hover:scale-110 ${
														rating <= 2
															? "bg-danger hover:bg-danger/90"
															: rating === 3
																? "bg-warning hover:bg-warning/90"
																: "bg-success hover:bg-success/90"
													}`}
												>
													{rating}
												</Button>
											))}
										</div>
									</div>
								</motion.div>
							</div>
						</motion.div>
					</div>
				</main>
			</div>
		</div>
	);
}
