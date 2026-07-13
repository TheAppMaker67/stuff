import React, { createContext, useContext, useState, useCallback } from "react";
import { applyXpChange, missedQuestPenalty } from "../utils/xpEngine";
import { randomQuest } from "../data/quests";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [totalXp, setTotalXp] = useState(3400);
  const [level, setLevel] = useState(4);
  const [streak, setStreak] = useState(4);
  const [activeQuest, setActiveQuest] = useState(randomQuest());
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [trialDaysLeft, setTrialDaysLeft] = useState(2);
  const [lastLevelUp, setLastLevelUp] = useState(null);

  const nextQuest = useCallback(() => {
    setActiveQuest((prev) => randomQuest(prev?.id));
  }, []);

  const completeQuest = useCallback(() => {
    const result = applyXpChange(totalXp, activeQuest.reward);
    setTotalXp(result.totalXp);
    setLevel(result.level);
    setStreak((s) => s + 1);
    if (result.leveledUp) setLastLevelUp(result.level);
    nextQuest();
    return result;
  }, [totalXp, activeQuest, nextQuest]);

  const missQuest = useCallback(() => {
    const penalty = missedQuestPenalty(activeQuest);
    const result = applyXpChange(totalXp, -penalty);
    setTotalXp(result.totalXp);
    setLevel(result.level);
    setStreak(0);
    nextQuest();
    return { ...result, penalty };
  }, [totalXp, activeQuest, nextQuest]);

  const value = {
    totalXp,
    level,
    streak,
    activeQuest,
    isSubscribed,
    trialDaysLeft,
    lastLevelUp,
    setIsSubscribed,
    setLastLevelUp,
    completeQuest,
    missQuest,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
}
