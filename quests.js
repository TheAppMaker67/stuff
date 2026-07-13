export const QUESTS = [
  { id: "walk", title: "Take a walk outside", desc: "Go outdoors for at least 5 minutes.", reward: 80, seconds: 900 },
  { id: "call", title: "Call an old friend", desc: "Have a real conversation, not a text.", reward: 60, seconds: 1800 },
  { id: "cook", title: "Cook something new", desc: "Try a recipe you've never made.", reward: 100, seconds: 3600 },
  { id: "sketch", title: "Sketch for 10 minutes", desc: "Draw anything, no talent required.", reward: 70, seconds: 900 },
  { id: "declutter", title: "Clear one surface", desc: "Tidy a desk, table, or shelf.", reward: 50, seconds: 1200 },
  { id: "stretch", title: "Stretch for 5 minutes", desc: "Loosen up, no equipment needed.", reward: 40, seconds: 600 },
];

export function randomQuest(excludeId) {
  const pool = excludeId ? QUESTS.filter((q) => q.id !== excludeId) : QUESTS;
  return pool[Math.floor(Math.random() * pool.length)];
}
