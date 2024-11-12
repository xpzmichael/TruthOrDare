import { TruthQuestionType } from '@/constants/SettingsEnums';

const DEVIDER_LINE_MAX_LENGTH = 5;
class QuestionDatabase {
  private static instance: QuestionDatabase;
  private mild: string[] = [];
  private average: string[] = [];
  private sensitive: string[] = [];

  private constructor() {}

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
    while (lines[i].length > DEVIDER_LINE_MAX_LENGTH) {
      this.mild.push(lines[i]);
      i++;
    }
    while (lines[i].length < DEVIDER_LINE_MAX_LENGTH) {
      i++;
    }
    while (lines[i].length > DEVIDER_LINE_MAX_LENGTH) {
      this.average.push(lines[i]);
      i++;
    }
    while (lines[i].length < DEVIDER_LINE_MAX_LENGTH) {
      i++;
    }
    while (lines[i].length > DEVIDER_LINE_MAX_LENGTH) {
      this.sensitive.push(lines[i]);
      i++;
    }
  }

  public getRandomQuestions(questionType: TruthQuestionType, questionsNeeded: number): string[] {
    const mildCount = this.mild.length;
    const averageCount = this.average.length;
    const sensitiveCount = this.sensitive.length;

    const result = new Set<string>();

    let sum = 0;

    if (questionType === TruthQuestionType.Mild) {
      sum = mildCount;
    } else if (questionType === TruthQuestionType.Average) {
      sum = mildCount + averageCount;
    } else {
      sum = mildCount + averageCount + sensitiveCount;
    }

    while (result.size < questionsNeeded && result.size < sum) {
      let randomNum = Math.floor(Math.random() * sum);
      let question: string;

      if (randomNum < mildCount) {
        question = this.mild[randomNum];
      } else if (randomNum < mildCount + averageCount) {
        question = this.average[randomNum - mildCount];
      } else {
        question = this.sensitive[randomNum - mildCount - averageCount];
      }

      result.add(question);
    }
    return Array.from(result);
  }
}

export default QuestionDatabase;