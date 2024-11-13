import QuestionDatabase from "@/components/question-library/QuestionDatabase";
import { DareHardness, TruthQuestionType } from "@/constants/SettingsEnums";

type QuestionConsumer = (questions: string[]) => void;

class QuestionManager {
  private static instance: QuestionManager;
  private numOfQuestions: number;
  private questionConsumer?: QuestionConsumer;
  private questionDatabase: QuestionDatabase = QuestionDatabase.getInstance();

  private constructor(numOfQuestions: number = 3) {
    this.numOfQuestions = numOfQuestions;
  }

  public static getInstance(): QuestionManager {
    if (!QuestionManager.instance) {
      QuestionManager.instance = new QuestionManager();
      QuestionManager.instance.initializeQuestions('./assets/questions/Questions.txt');
    }
    return QuestionManager.instance;
  }

  public async initializeQuestions(filePath: string): Promise<void> {
    const questionDatabase = QuestionDatabase.getInstance();
    await questionDatabase.initializeQuestions(filePath);
  }

  
  public popTruthQuestions(truthQuestionType: TruthQuestionType): void {
    if (this.questionConsumer) {
      this.questionConsumer(this.questionDatabase.getTruthQuestions(truthQuestionType, this.numOfQuestions));
    } else {
      console.log('QuestionDisplayer not subscribed to QuestionManager');
    }
  }

  public popDareQuestions(dareHardness: DareHardness): void {
    if (this.questionConsumer) {
      this.questionConsumer(this.questionDatabase.getDareQuestions(dareHardness, this.numOfQuestions));
    } else {
      console.log('QuestionDisplayer not subscribed to QuestionManager');
    }
  }

  public subscribe(setQuestions: QuestionConsumer): void {
    this.questionConsumer = setQuestions;
  }
}

export default QuestionManager;