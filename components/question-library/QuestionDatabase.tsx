import { TruthQuestionType, TruthQuestionTypes } from '@/constants/SettingsEnums';
import { DareHardness, DareHardnesses } from '@/constants/SettingsEnums';
import { getRandomQuestions, loadTextFile } from '../../utils/QuestionUtils';

const DEVIDER_LINE_MAX_LENGTH = 5;

class QuestionDatabase {
  private static instance: QuestionDatabase;

  private truthQuestionsMap: Map<TruthQuestionType, string[]> = new Map();
  private dareQuestionsMap: Map<DareHardness, string[]> = new Map();

  private constructor() {
    this.initializeQuestionsMap(this.truthQuestionsMap, TruthQuestionTypes);
    this.initializeQuestionsMap(this.dareQuestionsMap, DareHardnesses);
  }

  private initializeQuestionsMap<T>(map: Map<T, string[]>, questionType: Record<string, T> ): void {
    Object.values(questionType).forEach((category: T) => {
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
    try {
      const fileContent = await loadTextFile(filePath);
      const lines = fileContent.split('\n');
      let i = 1;

      // Clear the questions for each category for Truth and Dare
      this.truthQuestionsMap.forEach((_, key) => {
        this.truthQuestionsMap.set(key, []);
      });

      this.dareQuestionsMap.forEach((_, key) => {
        this.dareQuestionsMap.set(key, []);
      });

      for (let category of Object.values(TruthQuestionTypes)) {
        while (i < lines.length && lines[i].length > DEVIDER_LINE_MAX_LENGTH) {
          const questions = this.truthQuestionsMap.get(category);
          if (questions) {
            questions.push(lines[i]);
          }
          i++;
        }
        while (i < lines.length && lines[i].length < DEVIDER_LINE_MAX_LENGTH) {
          i++;
        }
      }

      for (let category of Object.values(DareHardnesses)) {
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
    } catch (error) {
      console.error('Error reading questions file:', error);
    }
    
  }

  public getTruthQuestions(questionType: TruthQuestionType, questionsNeeded: number): string[] {
    return getRandomQuestions(questionType, questionsNeeded, 
      this.truthQuestionsMap.get(TruthQuestionTypes.Mild) || [], 
      this.truthQuestionsMap.get(TruthQuestionTypes.Medium) || [], 
      this.truthQuestionsMap.get(TruthQuestionTypes.Sensitive) || []);
  }

  public getDareQuestions(dareType: DareHardness, questionsNeeded: number): string[] {
    return getRandomQuestions(dareType, questionsNeeded, 
      this.dareQuestionsMap.get(DareHardnesses.Easy) || [], 
      this.dareQuestionsMap.get(DareHardnesses.Medium) || [], 
      this.dareQuestionsMap.get(DareHardnesses.Hard) || []);
  }
}

export default QuestionDatabase;