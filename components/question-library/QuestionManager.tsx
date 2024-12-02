import QuestionDatabase from "@/components/question-library/QuestionDatabase";
import { DareHardness, TruthQuestionType } from "@/constants/SettingsEnums";
import { fileMap, getLanguageSetting } from "@/utils/LanguageUtils";

type QuestionConsumer = (questions: string[]) => void;

class QuestionManager {
  private static instance: QuestionManager;
  private questionConsumer?: QuestionConsumer;
  private questionDatabase: QuestionDatabase = QuestionDatabase.getInstance();

  private constructor() {
  }

  public static getInstance(): QuestionManager {
    if (!QuestionManager.instance) {
      QuestionManager.instance = new QuestionManager();
    }
    return QuestionManager.instance;
  }

  public async initializeQuestions(varLanguage: string): Promise<void> {
    if (!fileMap[varLanguage]) {
      throw new Error(`Unsupported language: ${varLanguage}`);
    }
    const questionDatabase = QuestionDatabase.getInstance();
    const filePath = fileMap[varLanguage];
    await questionDatabase.initializeQuestions(filePath);
  }

  
  public popTruthQuestions(truthQuestionType: TruthQuestionType, numOfTruth: number, includeEasierQuestions: boolean): void {
    if (!this.questionConsumer) {
      console.log('QuestionDisplayer not subscribed to QuestionManager');
      return;
    }
    if (includeEasierQuestions) {
      this.questionConsumer(this.questionDatabase.getTruthQuestions(truthQuestionType, numOfTruth));
    } else {
      this.questionConsumer(this.questionDatabase.getTruthQuestionsExactTier(truthQuestionType, numOfTruth));
    }
  }

  public popDareQuestions(dareHardness: DareHardness, numOfDare: number, includeEasierQuestions: boolean): void {
    if (!this.questionConsumer) {
      console.log('QuestionDisplayer not subscribed to QuestionManager');
      return;
    }
    if (includeEasierQuestions) {
      this.questionConsumer(this.questionDatabase.getDareQuestions(dareHardness, numOfDare));
    } else {
      this.questionConsumer(this.questionDatabase.getDareQuestionsExactTier(dareHardness, numOfDare));
    }
  }

  public subscribe(setQuestions: QuestionConsumer): void {
    this.questionConsumer = setQuestions;
  }
}

export default QuestionManager;