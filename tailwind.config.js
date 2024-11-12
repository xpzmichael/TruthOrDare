/** @type {import('tailwindcss').Config} */

const { SettingsColors, IndexColors, TabsLayoutColors, StartButtonColors, SpinnerColors, ResultDisplayerColors, OptionPickerColors } = require('./constants/Colors.ts');

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  
  theme: {
    extend: {
      colors: {
        // SettingsScreen colors
        'settings-container-bg': SettingsColors.CONTAINER_BACKGROUND,
        'settings-container-bg-dark': SettingsColors.CONTAINER_BACKGROUND_DARK,
        'settings-title': SettingsColors.TITLE_COLOR,
        'settings-label': SettingsColors.LABEL_COLOR,
        'reset-settings': SettingsColors.RESET_SETTINGS_COLOR,
        'reset-players': SettingsColors.RESET_PLAYERS_COLOR,

        // Index colors
        'index-bg': IndexColors.BACKGROUND,
        'index-bg-dark': IndexColors.BACKGROUND_DARK,

        // TabsLayout colors
        'tab-bar-active-tint': TabsLayoutColors.TAB_BAR_ACTIVE_TINT,
        'header-bg': TabsLayoutColors.HEADER_BACKGROUND,
        'header-tint': TabsLayoutColors.HEADER_TINT,
        'tab-bar-bg': TabsLayoutColors.TAB_BAR_BACKGROUND,

        // StartButton colors
        'start-button-bg': StartButtonColors.BUTTON_BACKGROUND,
        'start-button-text': StartButtonColors.BUTTON_TEXT,

        // Spinner colors
        'spinner-ball-bg': SpinnerColors.BALL_BACKGROUND,
        'spinner-highlight': SpinnerColors.HIGHLIGHT,

        // ResultDisplayer colors
        'result-square-bg': ResultDisplayerColors.SQUARE_BACKGROUND,
        'result-text': ResultDisplayerColors.TEXT_COLOR,
        'result-arrow': ResultDisplayerColors.ARROW_COLOR,

        // OptionPicker colors
        'option-bg': OptionPickerColors.OPTION_COLOR,
        'active-option-bg': OptionPickerColors.ACTIVE_OPTION_COLOR,
        'option-text': OptionPickerColors.OPTION_TEXT_COLOR,
        'active-option-text': OptionPickerColors.ACTIVE_OPTION_TEXT_COLOR,
      },
    },
  },
  plugins: [],
};

