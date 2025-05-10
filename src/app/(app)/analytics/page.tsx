export default function AnalyticsPage() {
	// Sample data for charts
	const monthlyData = [
		{ month: "Jan", reviews: 120, newCards: 45 },
		{ month: "Feb", reviews: 150, newCards: 30 },
		{ month: "Mar", reviews: 200, newCards: 60 },
		{ month: "Apr", reviews: 180, newCards: 40 },
		{ month: "May", reviews: 250, newCards: 55 },
		{ month: "Jun", reviews: 300, newCards: 70 },
	];

	const difficultyData = [
		{ level: "Easy", percentage: 45 },
		{ level: "Medium", percentage: 35 },
		{ level: "Hard", percentage: 20 },
	];

	const timeData = [
		{ day: "Mon", minutes: 25 },
		{ day: "Tue", minutes: 30 },
		{ day: "Wed", minutes: 15 },
		{ day: "Thu", minutes: 40 },
		{ day: "Fri", minutes: 35 },
		{ day: "Sat", minutes: 20 },
		{ day: "Sun", minutes: 10 },
	];

	// Calculate max values for scaling
	const maxReviews = Math.max(...monthlyData.map((d) => d.reviews));
	const maxMinutes = Math.max(...timeData.map((d) => d.minutes));

	return (
		<div className="container mx-auto p-6">
			<div className="mb-8">
				<h1 className="font-bold text-3xl text-purple-900">Analytics</h1>
				<p className="text-purple-600">
					Track your learning progress and habits
				</p>
			</div>

			<div className="mb-8 grid gap-6 md:grid-cols-3">
				<div className="rounded-2xl bg-white p-6 shadow-lg">
					<div className="mb-2 font-bold text-lg text-purple-900">
						Total Reviews
					</div>
					<div className="font-bold text-4xl text-purple-900">1,248</div>
					<div className="mt-1 text-purple-600 text-sm">
						+12% from last month
					</div>
				</div>

				<div className="rounded-2xl bg-white p-6 shadow-lg">
					<div className="mb-2 font-bold text-lg text-purple-900">
						Study Streak
					</div>
					<div className="font-bold text-4xl text-purple-900">5 days</div>
					<div className="mt-1 text-purple-600 text-sm">
						Your longest streak: 14 days
					</div>
				</div>

				<div className="rounded-2xl bg-white p-6 shadow-lg">
					<div className="mb-2 font-bold text-lg text-purple-900">
						Retention Rate
					</div>
					<div className="font-bold text-4xl text-purple-900">87%</div>
					<div className="mt-1 text-purple-600 text-sm">
						+3% from last month
					</div>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<div className="rounded-2xl bg-white p-6 shadow-lg">
					<div className="mb-6 font-bold text-lg text-purple-900">
						Monthly Activity
					</div>
					<div className="h-[300px]">
						<div className="flex h-[250px] items-end gap-4">
							{monthlyData.map((data) => (
								<div
									key={data.month}
									className="flex flex-1 flex-col items-center"
								>
									<div className="relative w-full">
										<div
											className="w-full rounded-t-lg bg-purple-400"
											style={{
												height: `${(data.reviews / maxReviews) * 200}px`,
											}}
										/>
										<div
											className="absolute bottom-0 left-0 w-full rounded-t-lg bg-teal-400"
											style={{
												height: `${(data.newCards / maxReviews) * 200}px`,
											}}
										/>
									</div>
									<div className="mt-2 font-medium text-purple-600 text-xs">
										{data.month}
									</div>
								</div>
							))}
						</div>

						<div className="mt-4 flex items-center justify-center gap-6">
							<div className="flex items-center gap-2">
								<div className="h-3 w-3 rounded-full bg-purple-400" />
								<span className="text-purple-600 text-xs">Reviews</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="h-3 w-3 rounded-full bg-teal-400" />
								<span className="text-purple-600 text-xs">New Cards</span>
							</div>
						</div>
					</div>
				</div>

				<div className="rounded-2xl bg-white p-6 shadow-lg">
					<div className="mb-6 font-bold text-lg text-purple-900">
						Cards by Difficulty
					</div>
					<div className="flex h-[300px] items-center justify-center">
						<div className="relative h-64 w-64">
							<svg
								aria-hidden="true"
								viewBox="0 0 100 100"
								className="-rotate-90 h-full w-full transform"
							>
								{
									difficultyData.reduce(
										(acc, data, _idx) => {
											const prevOffset = acc.offset;
											const offset = prevOffset + data.percentage;

											// Calculate colors based on difficulty
											let color: string;
											if (data.level === "Easy") {
												color = "#10B981"; // green-500
											} else if (data.level === "Medium") {
												color = "#F59E0B"; // amber-500
											} else {
												color = "#EF4444"; // red-500
											}

											acc.elements.push(
												<circle
													key={Math.random()}
													cx="50"
													cy="50"
													r="25"
													fill="transparent"
													stroke={color}
													strokeWidth="50"
													strokeDasharray={`${data.percentage} 100`}
													strokeDashoffset={-prevOffset}
												/>,
											);

											return { elements: acc.elements, offset };
										},
										{ elements: [] as React.ReactElement[], offset: 0 },
									).elements
								}
							</svg>

							<div className="absolute inset-0 flex items-center justify-center">
								<div className="text-center">
									<div className="font-bold text-3xl text-purple-900">100%</div>
									<div className="text-purple-600 text-sm">Total Cards</div>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-4 flex items-center justify-center gap-4">
						{difficultyData.map((data) => (
							<div key={data.level} className="flex items-center gap-2">
								<div
									className={`h-3 w-3 rounded-full ${
										data.level === "Easy"
											? "bg-green-500"
											: data.level === "Medium"
												? "bg-amber-500"
												: "bg-red-500"
									}`}
								/>
								<span className="text-purple-600 text-xs">
									{data.level} ({data.percentage}%)
								</span>
							</div>
						))}
					</div>
				</div>

				<div className="rounded-2xl bg-white p-6 shadow-lg">
					<div className="mb-6 font-bold text-lg text-purple-900">
						Study Time
					</div>
					<div className="h-[300px]">
						<div className="flex h-[250px] items-end gap-4">
							{timeData.map((data) => (
								<div
									key={data.day}
									className="flex flex-1 flex-col items-center"
								>
									<div
										className="w-full rounded-t-lg bg-purple-400"
										style={{ height: `${(data.minutes / maxMinutes) * 200}px` }}
									/>
									<div className="mt-2 font-medium text-purple-600 text-xs">
										{data.day}
									</div>
									<div className="text-purple-500 text-xs">{data.minutes}m</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="rounded-2xl bg-white p-6 shadow-lg">
					<div className="mb-6 font-bold text-lg text-purple-900">
						Learning Insights
					</div>
					<div className="space-y-4">
						<div className="rounded-xl bg-purple-50 p-4">
							<div className="mb-2 font-medium text-purple-900">
								Most Difficult Cards
							</div>
							<p className="text-purple-700 text-sm">
								You're struggling with Spanish verb conjugations. Consider
								focusing on these cards more frequently.
							</p>
						</div>

						<div className="rounded-xl bg-teal-50 p-4">
							<div className="mb-2 font-medium text-teal-900">
								Best Study Time
							</div>
							<p className="text-sm text-teal-700">
								You have the highest retention rate when studying in the morning
								between 8-10 AM.
							</p>
						</div>

						<div className="rounded-xl bg-amber-50 p-4">
							<div className="mb-2 font-medium text-amber-900">Consistency</div>
							<p className="text-amber-700 text-sm">
								You've been studying consistently for 5 days. Keep it up to
								build a strong learning habit!
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
