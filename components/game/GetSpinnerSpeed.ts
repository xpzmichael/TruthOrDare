import { SpinSpeed } from "@/constants/SettingsEnums";

export function getSpinnerDelay(spinSpeed: SpinSpeed) {
  switch (spinSpeed) {
    case SpinSpeed.Slow:
      return 100;
    case SpinSpeed.Normal:
      return 80;
    case SpinSpeed.Fast:
      return 60;
    case SpinSpeed.VeryFast:
      return 40;
  }
}