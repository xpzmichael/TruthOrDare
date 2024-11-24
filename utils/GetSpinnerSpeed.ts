import { SpinSpeed, SpinSpeeds } from "@/constants/SettingsEnums";

export function getSpinnerDelay(spinSpeed: SpinSpeed) {
  switch (spinSpeed) {
    case SpinSpeeds.Slow:
      return 120;
    case SpinSpeeds.Normal:
      return 90;
    case SpinSpeeds.Fast:
      return 70;
    case SpinSpeeds.VeryFast:
      return 50;
  }
}