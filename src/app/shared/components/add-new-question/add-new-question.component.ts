import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IQuestionType } from '@shared/models';
import { FormSignalService } from '@shared/store';
import { QUESTION_KEY, questionTypes } from '@shared/constants';

@Component({
  selector: 'app-add-new-question',
  templateUrl: './add-new-question.component.html',
  styleUrl: './add-new-question.component.scss',
})
export class AddNewQuestionComponent implements OnInit {
  questionTypes: IQuestionType[] = questionTypes;

  form!: FormGroup;
  hiddenKey: string[] = [];

  QUESTION_KEY = QUESTION_KEY;

  constructor(
    public dialogRef: MatDialogRef<AddNewQuestionComponent>,
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly formSignalService: FormSignalService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.questionTypeChange();
  }

  onSubmit(): void {
    console.log('this.form.value: ', this.form.value);
    let data = this.form.value;
    if (data.isAllowSpecificOption) {
      data = {
        ...data,
        answers: [...data.answers, { answer: 'Other', isOther: true }],
      };
    }
    this.formSignalService.setDataSignal(data);
    this.dialogRef.close();
  }

  initForm() {
    this.form = this.formBuilder.group({
      questionType: ['', [Validators.required]],
      questionContent: ['', [Validators.required]],
      answers: this.formBuilder.array([]),
      isRequired: [true],
      isAllowSpecificOption: [false],
    });
  }

  hideControl(controlName: string[]) {
    controlName.forEach((control: string) => {
      this.hiddenKey.push(control);
    });
  }

  showControl(controlName: string) {
    const index = this.hiddenKey.findIndex(
      (key: string) => key === controlName
    );

    this.hiddenKey.splice(index, 1);
  }

  get questionType() {
    return this.form.controls['questionType'] as FormControl;
  }

  get questionContent() {
    return this.form.controls['questionContent'] as FormControl;
  }

  questionTypeChange() {
    this.form.get('questionType')?.valueChanges.subscribe((change: any) => {
      this.questionContent.setValue('');
      if (change === QUESTION_KEY.PARAGRAPH) {
        this.answers.clear();
      } else {
        this.addAnswer();
      }
    });
  }

  get answers() {
    return this.form.controls['answers'] as FormArray;
  }

  addAnswer() {
    const lessonForm = this.formBuilder.group({
      answer: ['', Validators.required],
    });

    this.answers.push(lessonForm);
  }

  deleteAnswer(answerIndex: number) {
    if (this.answers.length === 1) {
      return;
    }
    this.answers.removeAt(answerIndex);
  }
}
