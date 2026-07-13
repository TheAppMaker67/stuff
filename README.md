# Questly — starter project for Codex

Anti-boredom app: the app assigns a real-world quest, a countdown starts, the
user must submit a photo before it expires or they lose XP. Completing it
earns XP; every 1000 XP is a level. $10/year subscription gates unlimited
quests after a free trial.

## Stack
- Expo (React Native) — one codebase for iOS + Android
- `expo-camera` / `expo-image-picker` for photo capture
- `AsyncStorage` for local state (swap for a backend later)
- `react-native-purchases` (RevenueCat) recommended for the $10/year IAP —
  stubbed here with a mock `PaywallScreen`

## What's included
```
questly/
  App.js
  package.json
  src/
    context/UserContext.js      // xp, level, streak, subscription state
    utils/xpEngine.js           // XP math, level-up, penalty logic
    data/quests.js              // quest pool
    screens/HomeScreen.js       // active quest + XP bar
    screens/CameraConfirmScreen.js
    screens/PaywallScreen.js
```

## Prompt to give Codex
Paste this after opening the folder in Codex:

> This is an Expo React Native starter for "Questly", a quest-based
> anti-boredom app. `src/utils/xpEngine.js` has the XP/level/penalty logic
> and `src/context/UserContext.js` holds state — both are done and should
> not be redesigned. Please:
> 1. Wire real camera capture in `CameraConfirmScreen.js` using
>    `expo-image-picker` (`launchCameraAsync`), replacing the mock verify
>    delay with an actual upload step (leave a `// TODO backend` marker for
>    where a real photo-verification API call would go).
> 2. Persist `UserContext` state to `AsyncStorage` so XP/level survive app
>    restarts.
> 3. Integrate RevenueCat (`react-native-purchases`) in `PaywallScreen.js`
>    for the real $10/year subscription product, gated behind
>    `isSubscribed` in context.
> 4. Add push notifications (`expo-notifications`) that fire when a quest's
>    countdown is about to expire.
> Keep the visual style: dark theme, single accent color, no gradients.

## Run it
```
npm install
npx expo start
```

## Notes / open decisions
- Photo verification is currently a 1.2s mock delay that always succeeds.
  A real version needs either manual moderation, a vision-model check
  (e.g. sending the photo + quest text to an LLM), or trusting an EXIF/GPS
  match — pick one before shipping.
- Losing XP on a missed quest can go negative in the current logic only
  down to 0; decide if repeated misses should also break streaks or lock
  quests.
