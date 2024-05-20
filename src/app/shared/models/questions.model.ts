export interface IQuestionType {
  value: string;
  viewValue: string;
}

export interface IQuestion {
  questionType: string;
  questionContent: string;
  answers: string | IAnswer[];
  other?: string;
  isRequired: boolean;
  isAllowSpecificOption?: boolean;
}

export interface IAnswer {
  answer: string;
  checked?: boolean;
  isOther?: boolean;
}
