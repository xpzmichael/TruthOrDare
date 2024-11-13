import { TruthQuestionType } from '@/constants/SettingsEnums';
import { DareHardness } from '@/constants/SettingsEnums';
import { getRandomQuestions } from './QuestionUtils';

const DEVIDER_LINE_MAX_LENGTH = 5;

class QuestionDatabase {
  private static instance: QuestionDatabase;

  private truthQuestionsMap: Map<TruthQuestionType, string[]> = new Map();
  private dareQuestionsMap: Map<DareHardness, string[]> = new Map();

  private constructor() {
    this.initializeQuestionsMap(this.truthQuestionsMap, TruthQuestionType);
    this.initializeQuestionsMap(this.dareQuestionsMap, DareHardness);
  }

  private initializeQuestionsMap<T>(map: Map<T, string[]>, enumType: Record<string, T> ): void {
    Object.values(enumType).forEach((category: T) => {
      map.set(category, []);
    });
  }

  public static getInstance(): QuestionDatabase {
    if (!QuestionDatabase.instance) {
      QuestionDatabase.instance = new QuestionDatabase();
    }
    return QuestionDatabase.instance;
  }

  public async initializeQuestions(filePath: string): Promise<void> {
    const response = await fetch(filePath);
    const fileContent = await response.text();
    const lines = fileContent.split('\n');
    let i = 1;

    for (let category of Object.values(TruthQuestionType)) {
      while (lines[i].length > DEVIDER_LINE_MAX_LENGTH) {
        const questions = this.truthQuestionsMap.get(category);
        if (questions) {
          questions.push(lines[i]);
        }
        i++;
      }
      while (lines[i].length < DEVIDER_LINE_MAX_LENGTH) {
        i++;
      }
    }

    for (let category of Object.values(DareHardness)) {
      while (i < lines.length && lines[i].length > DEVIDER_LINE_MAX_LENGTH) {
        const questions = this.dareQuestionsMap.get(category);
        if (questions) {
          questions.push(lines[i]);
        }
        i++;
      }
      while (i < lines.length && lines[i].length < DEVIDER_LINE_MAX_LENGTH) {
        i++;
      }
    }
  }

  public getTruthQuestions(questionType: TruthQuestionType, questionsNeeded: number): string[] {
    return getRandomQuestions(questionType, questionsNeeded, 
      this.truthQuestionsMap.get(TruthQuestionType.Mild) || [], 
      this.truthQuestionsMap.get(TruthQuestionType.Medium) || [], 
      this.truthQuestionsMap.get(TruthQuestionType.Sensitive) || []);
  }

  public getDareQuestions(dareType: DareHardness, questionsNeeded: number): string[] {
    return getRandomQuestions(dareType, questionsNeeded, 
      this.dareQuestionsMap.get(DareHardness.Easy) || [], 
      this.dareQuestionsMap.get(DareHardness.Medium) || [], 
      this.dareQuestionsMap.get(DareHardness.Hard) || []);
  }
}

export default QuestionDatabase;