import { Component, OnInit, effect } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddNewQuestionComponent } from '@shared/components';
import { ENDROUTERNAME, QUESTION_KEY } from '@shared/constants';
import { IAnswer, IQuestion } from '@shared/models';
import { FormSignalService } from '@shared/store';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.scss',
})
export class BuilderComponent implements OnInit {
  form!: FormGroup;
  data: IQuestion[] = [];
  isShowButon: boolean = false;
  QUESTION_KEY = QUESTION_KEY;
  isShowInputOther: boolean = false;

  constructor(
    private readonly dialog: MatDialog,
    private readonly formBuilder: FormBuilder,
    private readonly formSignalService: FormSignalService,
    private readonly router: Router
  ) {
    effect(() => {
      if (this.formSignalService.dataSignal) {
        this.isShowButon = true;
        this.formArray.push(
          this.createQuestion(this.formSignalService.dataSignal)
        );
      } else if (
        this.formSignalService.viewSignal &&
        this.formSignalService.viewSignal.length
      ) {
        this.isShowButon = true;
        this.formSignalService.viewSignal.forEach((question) => {
          this.formArray.push(this.createQuestion(question));
        });
      }
    });
  }

  ngOnInit(): void {
    this.initFormArray();
  }

  initFormArray() {
    this.form = this.formBuilder.group({
      formArray: this.formBuilder.array([]),
    });
  }

  get formArray() {
    return this.form.controls['formArray'] as FormArray;
  }

  private createQuestion(data: IQuestion): FormGroup {
    switch (data.questionType) {
      case QUESTION_KEY.PARAGRAPH:
        return this.createTexareaQuestion(data);
      case QUESTION_KEY.CHECKBOX_LIST:
        return this.createCheckBoxQuestion(data);
      default:
        return new FormGroup({});
    }
  }

  private createTexareaQuestion(data: IQuestion): FormGroup {
    return this.formBuilder.group({
      questionType: [data.questionType],
      questionContent: [data.questionContent],
      answers: [data.answers, data.isRequired ? [Validators.required] : []],
      isRequired: [data.isRequired],
    });
  }

  private createCheckBoxQuestion(data: IQuestion): FormGroup {
    return this.formBuilder.group({
      questionType: [data.questionType],
      questionContent: [data.questionContent],
      answers: this.formBuilder.array(
        this.mapperDataToFormArray(data.answers as IAnswer[]),
        (control) => {
          const atLeastOneChecked = (control as FormArray).controls.find(
            (x) => x.value.checked === true
          );

          if (atLeastOneChecked || !data.isRequired) {
            return {};
          }
          return { required: true };
        }
      ),
      isRequired: [data.isRequired],
      other: [data.other],
      isShowOther: [!!data.other],
    });
  }

  changeCheckBox(
    event: any,
    answerOption: IAnswer,
    formArrayIndex: number,
    answerIndex: number
  ) {
    if (answerOption.answer === 'Other' && answerOption?.isOther) {
      this.formArray
        .at(formArrayIndex)
        .get('isShowOther')
        ?.setValue(event.checked);
      const isRequired = this.formArray
        .at(formArrayIndex)
        .get('isRequired')?.value;

      if (event.checked && isRequired) {
        this.formArray
          .at(formArrayIndex)
          .get('other')
          ?.setValidators([Validators.required]);
      } else {
        this.formArray.at(formArrayIndex).get('other')?.setErrors(null);
      }

      this.form.updateValueAndValidity();
    }
  }

  mapperDataToFormArray(answers: IAnswer[]) {
    return answers.map((answer: IAnswer) =>
      this.formBuilder.group({
        checked: [answer.checked ?? false],
        answer: [answer.answer],
        isOther: [answer.isOther],
        isShowOther: [answer.isOther],
      })
    );
  }

  questionArray(index: number): FormArray {
    return this.formArray.at(index).get('answers') as FormArray;
  }

  questionTexarea(index: number): FormGroup {
    return this.formArray.controls[index] as FormGroup;
  }

  addNewQuestion = () => {
    this.dialog.open(AddNewQuestionComponent, {
      width: '400px',
      panelClass: 'dialog-action-end',
    });
  };

  onSave() {
    this.formSignalService.setViewSignal(this.form.value.formArray);
    this.formSignalService.setDataSignal(null as any);
    this.router.navigate([
      `${ENDROUTERNAME.FORM.FORM}/${ENDROUTERNAME.FORM.ANSWERS}`,
    ]);
    console.log('value: ', this.form.value);
  }
}
