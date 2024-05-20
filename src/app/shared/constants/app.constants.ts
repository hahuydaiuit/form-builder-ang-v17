import { IQuestionType } from '..';

export const ENDROUTERNAME = {
  FORM: {
    FORM: 'form',
    BUILDER: 'builder',
    ANSWERS: 'answers',
  },
};

export enum QUESTION_KEY {
  PARAGRAPH = 'paragraph',
  CHECKBOX_LIST = 'checkbox_list',
}

export const questionTypes: IQuestionType[] = [
  { value: QUESTION_KEY.PARAGRAPH, viewValue: 'Paragraph' },
  { value: QUESTION_KEY.CHECKBOX_LIST, viewValue: 'Checkbox List' },
];
