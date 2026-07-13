export const XP_PER_LEVEL = 1000;

export function levelFromXp(totalXp) {
  return Math.floor(totalXp / XP_PER_LEVEL) + 1;
}

export function progressInLevel(totalXp) {
  return totalXp % XP_PER_LEVEL;
}

/**
 * Apply an XP delta (positive for completing a quest, negative for a
 * missed one) and report whether this pushed the user to a new level.
 */
export function applyXpChange(currentTotalXp, delta) {
  const before = levelFromXp(currentTotalXp);
  const nextTotal = Math.max(0, currentTotalXp + delta);
  const after = levelFromXp(nextTotal);
  return {
    totalXp: nextTotal,
    level: after,
    leveledUp: after > before,
  };
}

export function missedQuestPenalty(quest) {
  // Losing a fixed fraction of the reward keeps penalties proportional
  // to quest difficulty instead of a flat number.
  return Math.round(quest.reward * 0.4);
}
