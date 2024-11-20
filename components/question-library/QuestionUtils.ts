import { DareHardness, DareHardnesses, TruthQuestionType, TruthQuestionTypes } from '@/constants/SettingsEnums';

const DEVIDER_LINE_MAX_LENGTH = 5;

export async function loadQuestins(
  filePath: string, tier1: string[], tier2: string[], tier3: string[]): Promise<void> {

  const response = await fetch(filePath);
  const fileContent = await response.text();
  const lines = fileContent.split('\n');
  let i = 1;
  while (lines[i].length > DEVIDER_LINE_MAX_LENGTH) {
    tier1.push(lines[i]);
    i++;
  }
  while (lines[i].length < DEVIDER_LINE_MAX_LENGTH) {
    i++;
  }
  while (lines[i].length > DEVIDER_LINE_MAX_LENGTH) {
    tier2.push(lines[i]);
    i++;
  }
  while (lines[i].length < DEVIDER_LINE_MAX_LENGTH) {
    i++;
  }
  while (lines[i].length > DEVIDER_LINE_MAX_LENGTH) {
    tier3.push(lines[i]);
    i++;
  }
}


export function getRandomQuestions(questionType: TruthQuestionType | DareHardness, questionsNeeded: number, 
  tier1: string[], tier2: string[], tier3: string[]): string[] {
  const tier1Count = tier1.length;
  const tier2Count = tier2.length;
  const tier3Count = tier3.length;

  const result = new Set<string>();

  let sum = 0;

  if (questionType === TruthQuestionTypes.Mild || questionType === DareHardnesses.Easy) {
    sum = tier1Count;
  } else if (questionType === TruthQuestionTypes.Sensitive || questionType === DareHardnesses.Hard) {
    sum = tier1Count + tier2Count + tier3Count;
  } else {
    sum = tier1Count + tier2Count;
  }

  while (result.size < questionsNeeded && result.size < sum) {
    let randomNum = Math.floor(Math.random() * sum);
    let question: string;

    if (randomNum < tier1Count) {
      question = tier1[randomNum];
    } else if (randomNum < tier1Count + tier2Count) {
      question = tier2[randomNum - tier1Count];
    } else {
      question = tier3[randomNum - tier1Count - tier2Count];
    }

    result.add(question);
  }
  return Array.from(result);
}