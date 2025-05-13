"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import { Button } from "~/components/ui/button";

// Sample cards for study session
const studyCards = [
  { id: 1, front: "Hola", back: "Hello" },
  { id: 2, front: "Gracias", back: "Thank you" },
  { id: 3, front: "Por favor", back: "Please" },
  { id: 4, front: "Buenos días", back: "Good morning" },
  { id: 5, front: "Buenas noches", back: "Good night" },
];

export default function StudySessionPage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentCard = studyCards[currentCardIndex];
  const totalCards = studyCards.length;

  useEffect(() => {
    // Reset flip state when changing cards
    setIsFlipped(false);
    setShowAnswer(false);
    setDirection(null);
  });

  const handleShowAnswer = () => {
    setIsFlipped(true);
    setShowAnswer(true);
  };

  const handleRating = (rating: number) => {
    // Animate card exit
    setDirection(rating >= 3 ? "right" : "left");

    // Wait for animation to complete before changing card
    setTimeout(() => {
      const nextIndex = currentCardIndex + 1;

      if (nextIndex < totalCards) {
        setCurrentCardIndex(nextIndex);
        setProgress((nextIndex / totalCards) * 100);
      } else {
        // Study session complete
        setProgress(100);
        setSessionComplete(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }, 300);
  };

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      <AnimatePresence mode="wait">
        {sessionComplete ? (
          <motion.div
            key="complete"
            className="flex w-full max-w-md flex-col items-center justify-center rounded-2xl bg-white p-8 text-center shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="mb-4 rounded-full bg-success/20 p-4">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-success"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="mb-2 font-bold text-2xl">Session Complete!</h2>
            <p className="mb-6 text-foreground/60">
              You've reviewed all {totalCards} cards in this deck. Great job!
            </p>
            <div className="flex gap-4">
              <Button asChild variant="outline">
                <Link href="/decks">Back to Decks</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="study"
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-6 w-full max-w-3xl">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium text-foreground/70 text-sm">
                  Card {currentCardIndex + 1} of {totalCards}
                </span>
                <span className="font-medium text-foreground/70 text-sm">
                  {Math.round(progress)}% complete
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-foreground/10">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <motion.div
              ref={cardRef}
              className="relative w-full max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                transform:
                  direction === "left"
                    ? "translateX(-100vw)"
                    : direction === "right"
                      ? "translateX(100vw)"
                      : "translateX(0)",
                transition: direction ? "transform 0.3s ease-out" : "none",
              }}
            >
              <div className="card-container">
                <div className={`card ${isFlipped ? "flipped" : ""}`}>
                  {/* Front of card */}
                  <div className="card-front absolute inset-0 flex flex-col rounded-2xl bg-white p-8 shadow-xl">
                    <div className="mb-4 text-center font-medium text-primary text-sm uppercase tracking-wider">
                      Question
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                      <motion.div
                        className="text-center font-bold text-3xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {currentCard === undefined ? (
                          <div>No cards</div>
                        ) : (
                          currentCard.front
                        )}
                      </motion.div>
                    </div>
                    <motion.div
                      className="flex justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <Button
                        onClick={handleShowAnswer}
                        className="group"
                        size="lg"
                      >
                        Show Answer
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
                          className="ml-2 transition-transform group-hover:rotate-90"
                        >
                          <path d="m7 10 5 5 5-5" />
                        </svg>
                      </Button>
                    </motion.div>
                  </div>

                  {/* Back of card */}
                  <div className="card-back absolute inset-0 flex flex-col rounded-2xl bg-white p-8 shadow-xl">
                    <div className="mb-4 text-center font-medium text-secondary text-sm uppercase tracking-wider">
                      Answer
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                      <div className="text-center font-bold text-3xl">
                        {currentCard === undefined ? (
                          <div>No cards</div>
                        ) : (
                          currentCard.back
                        )}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="text-center font-medium text-foreground/70 text-sm">
                        How well did you know this?
                      </div>
                      <div className="flex justify-center gap-2">
                        <motion.button
                          onClick={() => handleRating(1)}
                          className="group flex h-12 w-12 items-center justify-center rounded-full border-2 border-danger/30 text-danger hover:bg-danger/10"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
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
                            className="transition-transform group-hover:scale-110"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </motion.button>

                        <motion.button
                          onClick={() => handleRating(3)}
                          className="group flex h-12 w-12 items-center justify-center rounded-full border-2 border-warning/30 text-warning hover:bg-warning/10"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
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
                            className="transition-transform group-hover:scale-110"
                          >
                            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                            <path d="M16 16h5v5" />
                          </svg>
                        </motion.button>

                        <motion.button
                          onClick={() => handleRating(5)}
                          className="group flex h-12 w-12 items-center justify-center rounded-full border-2 border-success/30 text-success hover:bg-success/10"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
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
                            className="transition-transform group-hover:scale-110"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="mt-8 flex w-full max-w-3xl items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-foreground/60 hover:text-primary"
                onClick={() =>
                  currentCardIndex > 0 &&
                  setCurrentCardIndex(currentCardIndex - 1)
                }
                disabled={currentCardIndex === 0}
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
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Previous Card
              </Button>

              <Button
                variant="ghost"
                className="flex items-center gap-2 text-foreground/60 hover:text-primary"
                onClick={() =>
                  currentCardIndex < totalCards - 1 &&
                  setCurrentCardIndex(currentCardIndex + 1)
                }
                disabled={currentCardIndex === totalCards - 1}
              >
                Next Card
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
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
