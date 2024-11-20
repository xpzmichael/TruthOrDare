import { DARK, EASY, FAST, HARD, LIGHT, MEDIUM, MILD, NORMAL, SENSITIVE, SLOW, VERY_FAST } from "./TranslationKeys";

// Settings for Spin Speed
export const SpinSpeeds = {
  Slow: SLOW,
  Normal: NORMAL,
  Fast: FAST,
  VeryFast: VERY_FAST,
} as const;
export type SpinSpeed = typeof SpinSpeeds[keyof typeof SpinSpeeds];

// Settings for Truth Questions
export const TruthQuestionTypes = {
  Mild: MILD,
  Medium: MEDIUM,
  Sensitive: SENSITIVE,
} as const;
export type TruthQuestionType = typeof TruthQuestionTypes[keyof typeof TruthQuestionTypes];

// Settings for Dare Hardness
export const DareHardnesses = {
  Easy: EASY,
  Medium: MEDIUM,
  Hard: HARD,
} as const;
export type DareHardness = typeof DareHardnesses[keyof typeof DareHardnesses];

// Settings for Themes
export const Themes = {
  Light: LIGHT,
  Dark: DARK,
} as const;
export type Theme = typeof Themes[keyof typeof Themes];
