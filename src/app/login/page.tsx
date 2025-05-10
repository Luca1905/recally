"use client";

import type React from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<{ email?: string; password?: string }>(
		{},
	);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Reset errors
		setErrors({});

		// Validate form
		let hasErrors = false;
		const newErrors: { email?: string; password?: string } = {};

		if (!email) {
			newErrors.email = "Email is required";
			hasErrors = true;
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = "Email is invalid";
			hasErrors = true;
		}

		if (!password) {
			newErrors.password = "Password is required";
			hasErrors = true;
		}

		if (hasErrors) {
			setErrors(newErrors);
			return;
		}

		// Simulate login
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			router.push("/dashboard");
		}, 1500);
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
			</div>

			<div className="container relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-4">
				<motion.div
					className="w-full max-w-md"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Link
						href="/"
						className="group mb-8 inline-flex items-center font-medium text-foreground/70 text-sm transition-colors hover:text-primary"
					>
						<svg
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="group-hover:-translate-x-1 mr-2 transition-transform"
						>
							<path d="m15 18-6-6 6-6" />
						</svg>
						Back to home
					</Link>

					<div className="relative overflow-hidden rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
						<motion.div
							className="-right-16 -top-16 absolute h-32 w-32 rounded-full bg-primary/10"
							animate={{
								scale: [1, 1.1, 1],
							}}
							transition={{
								duration: 5,
								repeat: Number.POSITIVE_INFINITY,
							}}
						/>

						<motion.div
							className="-bottom-16 -left-16 absolute h-32 w-32 rounded-full bg-secondary/10"
							animate={{
								scale: [1, 1.2, 1],
							}}
							transition={{
								duration: 7,
								repeat: Number.POSITIVE_INFINITY,
							}}
						/>

						<div className="relative">
							<motion.div
								className="mb-6 text-center"
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.1 }}
							>
								<h1 className="font-bold text-3xl">Welcome back</h1>
								<p className="mt-2 text-foreground/60">
									Sign in to continue your learning journey
								</p>
							</motion.div>

							<motion.form
								onSubmit={handleSubmit}
								className="space-y-6"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5, delay: 0.2 }}
							>
								<motion.div
									className="space-y-2"
									initial={{ x: -20, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{ duration: 0.5, delay: 0.3 }}
								>
									<label htmlFor="email" className="block font-medium text-sm">
										Email
									</label>
									<Input
										id="email"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="name@example.com"
										className="w-full"
									/>
								</motion.div>

								<motion.div
									className="space-y-2"
									initial={{ x: -20, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{ duration: 0.5, delay: 0.4 }}
								>
									<div className="flex items-center justify-between">
										<label
											htmlFor="password"
											className="block font-medium text-sm"
										>
											Password
										</label>
										<Link
											href="/forgot-password"
											className="text-primary text-xs hover:underline"
										>
											Forgot password?
										</Link>
									</div>
									<Input
										id="password"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full"
									/>
								</motion.div>

								<motion.div
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.5, delay: 0.5 }}
								>
									<Button
										type="submit"
										className="w-full"
										variant="default"
										size="lg"
									>
										{isLoading ? "Signing in..." : "Sign in"}
									</Button>
								</motion.div>

								<motion.div
									className="relative flex items-center py-2"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.5, delay: 0.6 }}
								>
									<div className="flex-grow border-foreground/10 border-t" />
									<span className="mx-4 flex-shrink text-foreground/40 text-xs">
										OR
									</span>
									<div className="flex-grow border-foreground/10 border-t" />
								</motion.div>

								<motion.div
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.5, delay: 0.7 }}
								>
									<Button
										type="button"
										variant="outline"
										className="w-full"
										size="lg"
									>
										<svg
											className="mr-2 h-5 w-5"
											viewBox="0 0 24 24"
											aria-hidden="true"
										>
											<path
												d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
												fill="#4285F4"
											/>
											<path
												d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
												fill="#34A853"
											/>
											<path
												d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
												fill="#FBBC05"
											/>
											<path
												d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
												fill="#EA4335"
											/>
										</svg>
										Continue with Google
									</Button>
								</motion.div>
							</motion.form>

							<motion.div
								className="mt-8 text-center text-foreground/60 text-sm"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5, delay: 0.8 }}
							>
								Don&apos;t have an account?{" "}
								<Link
									href="/signup"
									className="font-medium text-primary hover:underline"
								>
									Sign up for free
								</Link>
							</motion.div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
