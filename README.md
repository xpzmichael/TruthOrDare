# Truth or Dare

Welcome to the Truth or Dare app! This app is designed to provide a fun and interactive experience for users to play the classic game of Truth or Dare. The app supports multiple languages and offers various customization options to enhance your gameplay.

## Features

- **Language Selection**: Choose between English and Simplified Chinese.
- **Customizable Settings**: Adjust spin speed, question levels, light and dark themes, and other settings.
- **Question Library**: Access a wide range of truth and dare questions.
- **Interactive Gameplay**: Spin the wheel to choose players dynamically.

## Usage
### Main Screens
- **Index Screen**: The main screen where you can select the language and start the game.
- **Settings Screen**: Customize your game settings, including spin speed, question levels, and themes.
- **Library Screen**: View and interact with the question library, and choose between truth and dare questions.


## File Structure
```
.
├── app/
│   ├── _layout.tsx
│   ├── (tabs)/
│   │   ├── index.tsx
│   │   ├── _layout.tsx
│   │   ├── library.tsx
│   │   └── settings.tsx
├── assets/
│   ├── images/
│   ├── questions/
│   │   ├── Questions-en.txt
│   │   └── Questions-zh.txt
├── components/
│   ├── game/
│   │   ├── SpinnerGame.tsx
│   │   ├── Spinner.tsx
│   │   ├── StartButton.tsx
│   │   └── ResultDisplayer.tsx
│   ├── modal/
│   │   ├── LanguageSelector.tsx
│   │   └── GameInitializer.tsx
│   ├── question-library/
│   │   ├── QuestionDisplayer.tsx
│   │   ├── ChatBubble.tsx
│   │   ├── TruthButton.tsx
│   │   ├── DareButton.tsx
│   │   ├── QuestionButton.tsx
│   │   ├── QuestionManager.tsx
│   │   ├── QuestionDatabase.tsx
│   │   └── OptionPicker.tsx
├── constants/
│   ├── Colors.ts
│   ├── SettingsEnums.ts
│   └── TranslationKeys.ts
├── hooks/
│   ├── SettingsContext.tsx
│   └── UseSizeRatio.tsx
├── locales/
│   ├── en.json
│   ├── zh.json
│   └── i18n.ts
├── utils/
│   ├── QuestionUtils.ts
│   ├── LanguageUtils.ts
│   ├── GetSpinnerSpeed.ts
│   └── TextUtils.ts
└── [config files & README]
```

Enjoy playing! 