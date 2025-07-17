"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { ArrowLeft, ArrowRight, MoreHorizontal, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { Textarea } from "~/components/ui/textarea";
import { dxdb } from "~/localdb/dexie";

export default function StudyPage({ deckId }: { deckId: string }) {
  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showActualAnswer, setShowActualAnswer] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const questions = useLiveQuery(
    () => dxdb.card_table.where({ deckId: deckId }).toArray(),
    [deckId],
  );

  const cardStats = useMemo(() => {
    if (!questions) {
      return { newCount: 0, reviewCount: 0, totalQuestions: 0 };
    }
    if (questions.length === 0) {
      return { newCount: 0, reviewCount: 0, totalQuestions: 0 };
    }
    return {
      newCount: questions.filter((q) => q.type === "new").length,
      reviewCount: questions.filter((q) => q.type === "learn").length,
      totalQuestions: questions.length,
    };
  }, [questions]);

  useEffect(() => {
    if (questions) {
      if (cardStats.totalQuestions === 0) {
        setCurrentQuestionIndex(0);
        setIsFinished(false);
      } else if (currentQuestionIndex >= cardStats.totalQuestions) {
        setCurrentQuestionIndex(cardStats.totalQuestions - 1);
        setIsFinished(false);
      }
      setUserAnswer("");
      setShowActualAnswer(false);
    }
  }, [questions, cardStats.totalQuestions]);

  if (questions === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-white">
        Loading questions...
      </div>
    );
  }

  if (cardStats.totalQuestions === 0 && !isFinished) {
    return (
      <div className="min-h-screen bg-background text-white">
        <div className="sticky top-0 z-10 flex w-full items-center justify-start border-background border-b bg-background p-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => {
              router.push("/deck");
            }}
            title="Exit Study Session"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center p-8 pt-16 text-center">
          <h2 className="mb-4 font-bold text-2xl">This deck is empty</h2>
          <p className="mb-6 text-gray-400 text-lg">
            Add some cards to start studying
          </p>
          <div className="flex gap-3">
            <Button
              onClick={() => {
                router.push(`/deck/${deckId}/add`);
              }}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Add Cards
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                router.push("/deck");
              }}
              className="border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
            >
              Back to Decks
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const totalQuestions = cardStats.totalQuestions;

  const progressValue = isFinished
    ? 100
    : totalQuestions > 0
      ? (currentQuestionIndex / totalQuestions) * 100
      : 0;

  const remaining = isFinished ? 0 : totalQuestions - currentQuestionIndex;

  const handleExitSession = () => {
    router.push("/decks");
    if (typeof window !== "undefined") window.history.back();
    console.log("Exit study session");
  };

  const handleAnswerOrNextClick = () => {
    if (!showActualAnswer) {
      setShowActualAnswer(true);
    } else {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setUserAnswer("");
        setShowActualAnswer(false);
      } else {
        setIsFinished(true);
      }
    }
  };

  const handleDontKnowClick = () => {
    setShowActualAnswer(true);
  };

  const handleBack = () => {
    setIsFinished(false);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setUserAnswer("");
      setShowActualAnswer(false);
    } else if (isFinished && totalQuestions > 0) {
      setCurrentQuestionIndex(totalQuestions - 1);
      setUserAnswer("");
      setShowActualAnswer(false);
    }
  };

  const currentCard = questions[currentQuestionIndex];
  const cardTypeDisplay =
    currentCard?.type === "new"
      ? "New"
      : currentCard?.type === "learn"
        ? "Review"
        : "Card";
  const cardTypeColor =
    currentCard?.type === "new"
      ? "bg-blue-600"
      : currentCard?.type === "learn"
        ? "bg-orange-600"
        : "bg-gray-500";

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="sticky top-0 z-10 flex items-center justify-between border-background border-b bg-background p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            onClick={handleExitSession}
            title="Exit Study Session"
          >
            <X className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            onClick={handleBack}
            disabled={currentQuestionIndex === 0 && !isFinished}
            title="Previous Card"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="mx-4 flex-1">
          <Progress value={progressValue} className="h-2" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">
            {totalQuestions > 0
              ? `${
                  isFinished ? totalQuestions : currentQuestionIndex + 1
                }/${totalQuestions}`
              : "0/0"}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
            title="Options"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isFinished && totalQuestions > 0 && (
        <div className="flex justify-center gap-4 border-gray-700 border-b bg-gray-800 py-3">
          <Badge variant="secondary" className="bg-blue-600 text-white">
            {cardStats.newCount} new
          </Badge>
          <Badge variant="secondary" className="bg-orange-600 text-white">
            {cardStats.reviewCount} review
          </Badge>
          <Badge variant="secondary" className="bg-purple-600 text-white">
            {remaining} remaining
          </Badge>
        </div>
      )}

      {isFinished ? (
        <div className="flex flex-1 flex-col items-center justify-center p-8 pt-16 text-center">
          <h2 className="mb-4 font-bold text-3xl">Session Complete!</h2>
          <p className="mb-6 text-xl">
            You've gone through all {totalQuestions} cards.
          </p>
          <Button
            onClick={() => {
              router.push("/deck");
            }}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            View decks
          </Button>
        </div>
      ) : totalQuestions > 0 && currentCard ? (
        <div className="flex flex-1 items-center justify-center p-8 pt-10">
          <div className="w-full max-w-2xl">
            <div className="flex min-h-[250px] flex-col justify-center rounded-lg border border-gray-700 bg-gray-800 p-8">
              <div className="mb-6">
                <Badge className={`mb-4 text-white ${cardTypeColor}`}>
                  {cardTypeDisplay} #{currentQuestionIndex + 1}
                </Badge>
              </div>
              <div className="text-center">
                <h2 className="font-medium text-gray-200 text-xl leading-relaxed">
                  {currentCard.front}
                </h2>
              </div>
            </div>

            {showActualAnswer && (
              <div className="mt-6 rounded-lg border border-gray-600 bg-slate-700 p-6">
                <h3 className="mb-2 font-semibold text-gray-300 text-sm">
                  Answer:
                </h3>
                <p className="text-gray-100 text-lg">{currentCard.back}</p>
              </div>
            )}

            {!showActualAnswer && (
              <div className="mt-6">
                <Textarea
                  placeholder="Write your answer here"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="min-h-[100px] resize-none border-gray-700 bg-gray-800 text-white placeholder-gray-400"
                />
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              {!showActualAnswer && (
                <Button
                  variant="outline"
                  onClick={handleDontKnowClick}
                  className="border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
                >
                  {"Don't know"}
                </Button>
              )}
              <Button
                onClick={handleAnswerOrNextClick}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                {showActualAnswer ? "Next Question" : "Show Answer"}
                {showActualAnswer &&
                  currentQuestionIndex < totalQuestions - 1 && (
                    <ArrowRight className="ml-2 h-4 w-4" />
                  )}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
