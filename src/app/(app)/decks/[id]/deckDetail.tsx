"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { db } from "~/server/localdb/dexie";

export default function DeckDetail({ deckId }: { deckId: string }) {
	const [showAddCardModal, setShowAddCardModal] = useState(false);
	const [selectedCard, setSelectedCard] = useState<string | undefined>(
		undefined,
	);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	const deck = useLiveQuery(
		() => db.decks.where({ id: deckId }).first(),
		[deckId],
	);
	const cards = useLiveQuery(
		() => db.cards.where({ deckId }).toArray(),
		[deckId],
	);

  console.log(deck);
  console.log(cards);

	if (deck === undefined || cards === undefined) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container mx-auto p-6">
			<motion.div
				className="mb-6"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<Link
					href="/decks"
					className="group mb-4 inline-flex items-center font-medium text-foreground/70 text-sm transition-colors hover:text-primary"
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
					Back to decks
				</Link>

				<motion.div
					className="relative mb-6 overflow-hidden rounded-2xl"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
				>
					<div
						className={`absolute inset-0 bg-gradient-to-r ${deck.color} opacity-90`}
					/>
					<div className="relative p-8 text-white">
						<motion.h1
							className="mb-2 font-bold text-3xl"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							{deck.name}
						</motion.h1>
						<motion.p
							className="mb-6 max-w-2xl text-white/80"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
						>
							{deck.description}
						</motion.p>

						<motion.div
							className="flex flex-wrap gap-4"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<div className="flex items-center gap-2 rounded-lg bg-white/20 px-3 py-1.5 backdrop-blur-sm">
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
								>
									<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
									<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
								</svg>
								<span className="font-medium text-sm">
									{deck.cardCount} cards
								</span>
							</div>

							<div className="flex items-center gap-2 rounded-lg bg-white/20 px-3 py-1.5 backdrop-blur-sm">
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
								>
									<circle cx="12" cy="12" r="10" />
									<polyline points="12 6 12 12 16 14" />
								</svg>
								<span className="font-medium text-sm">
									Last studied {deck.lastStudied}
								</span>
							</div>

							<div className="flex items-center gap-2 rounded-lg bg-white/20 px-3 py-1.5 backdrop-blur-sm">
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
								>
									<path d="M22 12h-4l-3 9L9 3l-3 9H2" />
								</svg>
								<span className="font-medium text-sm">
									{deck.progress}% mastered
								</span>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</motion.div>

			<motion.div
				className="mb-8 flex flex-wrap gap-4"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.5 }}
			>
				<Button asChild className="group" variant="ghost">
					<Link href={`/study/${deck.id}`}>
						Study Now
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

				<Button
					variant="outline"
					className="group"
					onClick={() => setShowAddCardModal(true)}
				>
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
						className="mr-2 transition-transform group-hover:rotate-90"
					>
						<path d="M5 12h14" />
						<path d="M12 5v14" />
					</svg>
					Add Card
				</Button>

				<Button variant="outline">Edit Deck</Button>
			</motion.div>

			<motion.div
				className="rounded-2xl bg-white p-6 shadow-lg"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.6 }}
			>
				<div className="mb-6 flex items-center justify-between">
					<h2 className="font-bold text-xl">Cards ({cards.length})</h2>

					<div className="flex items-center gap-3">
						<select className="rounded-lg border-foreground/10 bg-white text-sm focus:border-primary focus:ring-primary">
							<option>All cards</option>
							<option>Due cards</option>
							<option>New cards</option>
							<option>Difficult cards</option>
						</select>

						<input
							type="text"
							placeholder="Search cards..."
							className="rounded-lg border-foreground/10 bg-white text-sm focus:border-primary focus:ring-primary"
						/>
					</div>
				</div>

				<div className="overflow-hidden rounded-xl border border-foreground/10">
					{cards.map((card, index) => (
						<motion.div
							key={card.id}
							className={`group flex flex-wrap items-center gap-4 border-foreground/10 border-b p-4 transition-colors hover:bg-primary/5 md:flex-nowrap ${
								index === cards.length - 1 ? "border-b-0" : ""
							}`}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
							whileHover={{ x: 5 }}
						>
							<div className="w-full md:w-2/5">
								<div className="font-medium">{card.front}</div>
							</div>

							<div className="w-full md:w-2/5">
								<div className="font-medium text-foreground/70">
									{card.back}
								</div>
							</div>

							<div className="hidden w-full items-center justify-between md:flex md:w-1/5">
								<div
									className={`rounded-full px-2 py-0.5 font-medium text-xs ${
										card.difficulty === "Easy"
											? "bg-success/20 text-success"
											: card.difficulty === "Medium"
												? "bg-warning/20 text-warning"
												: "bg-danger/20 text-danger"
									}`}
								>
									{card.difficulty}
								</div>

								<div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
									<Button
										className="h-8 w-8 rounded-lg text-foreground/60 hover:bg-primary/10 hover:text-primary"
										onClick={() => setSelectedCard(card.id)}
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
											className="mx-auto"
										>
											<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
											<path d="m15 5 4 4" />
										</svg>
									</Button>
									<Button
										className="h-8 w-8 rounded-lg text-danger/60 hover:bg-danger/10 hover:text-danger"
										onClick={() => setShowDeleteConfirm(true)}
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
											className="mx-auto"
										>
											<path d="M3 6h18" />
											<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
											<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
											<line x1="10" x2="10" y1="11" y2="17" />
											<line x1="14" x2="14" y1="11" y2="17" />
										</svg>
									</Button>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>

			{/* Add Card Modal */}
			<AnimatePresence>
				{showAddCardModal && (
					<motion.div
						className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.div
							className="w-full max-w-md rounded-2xl bg-background p-6 shadow-xl"
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							transition={{ type: "spring", damping: 25, stiffness: 300 }}
						>
							<h2 className="mb-2 font-bold text-xl">Add New Card</h2>
							<p className="mb-6 text-foreground/60">
								Create a new flashcard for this deck
							</p>

							<div className="mb-4">
								<label
									htmlFor="card-front"
									className="mb-2 block font-medium text-sm"
								>
									Front (Question)
								</label>
								<textarea
									id="card-front"
									className="w-full rounded-lg border-foreground/10 bg-white focus:border-primary focus:ring-primary"
									placeholder="e.g., What is the capital of France?"
									rows={2}
								/>
							</div>

							<div className="mb-6">
								<label
									htmlFor="card-back"
									className="mb-2 block font-medium text-sm"
								>
									Back (Answer)
								</label>
								<textarea
									id="card-back"
									className="w-full rounded-lg border-foreground/10 bg-white focus:border-primary focus:ring-primary"
									placeholder="e.g., Paris"
									rows={2}
								/>
							</div>

							<div className="flex gap-3">
								<Button
									variant="outline"
									className="flex-1"
									onClick={() => setShowAddCardModal(false)}
								>
									Cancel
								</Button>
								<Button
									className="flex-1"
									onClick={() => setShowAddCardModal(false)}
								>
									Add Card
								</Button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Delete Confirmation Modal */}
			<AnimatePresence>
				{showDeleteConfirm && (
					<motion.div
						className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.div
							className="w-full max-w-md rounded-2xl bg-background p-6 shadow-xl"
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							transition={{ type: "spring", damping: 25, stiffness: 300 }}
						>
							<h2 className="mb-2 font-bold text-xl">Delete Card</h2>
							<p className="mb-6 text-foreground/60">
								Are you sure you want to delete this card? This action cannot be
								undone.
							</p>

							<div className="flex gap-3">
								<Button
									variant="outline"
									className="flex-1"
									onClick={() => setShowDeleteConfirm(false)}
								>
									Cancel
								</Button>
								<Button
									variant="destructive"
									className="flex-1"
									onClick={() => setShowDeleteConfirm(false)}
								>
									Delete
								</Button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
