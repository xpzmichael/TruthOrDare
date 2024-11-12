import QuestionDatabase from "@/components/question-library/QuestionDatabase";
import { TruthQuestionType } from "@/constants/SettingsEnums";

class QuestionManager {
  private static instance: QuestionManager;
  private questions: string[] = [];
  private numOfQuestions: number;

  private constructor(numOfQuestions: number = 3) {
    this.numOfQuestions = numOfQuestions;
  }

  public static getInstance(): QuestionManager {
    if (!QuestionManager.instance) {
      QuestionManager.instance = new QuestionManager();
      QuestionManager.instance.initializeQuestions('./assets/questions/Truth.txt');
    }
    return QuestionManager.instance;
  }

  public async initializeQuestions(filePath: string): Promise<void> {
    const questionDatabase = QuestionDatabase.getInstance();
    await questionDatabase.initializeQuestions(filePath);
  }

  public updateQuestions(truthQuestionType: TruthQuestionType): void {
    console.log("updating questions");
    const questionDatabase = QuestionDatabase.getInstance();
    this.questions = questionDatabase.getRandomQuestions(truthQuestionType, this.numOfQuestions);
    
  }

  public getQuestions(): string[] {
    console.log(this.questions);
    return this.questions;
  }
}

export default QuestionManager;