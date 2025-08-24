import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ENDROUTERNAME, QUESTION_KEY } from '@shared/constants';
import { IAnswer, IQuestion } from '@shared/models';
import { FormSignalService } from '@shared/store';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrl: './answers.component.scss',
})
export class AnswersComponent implements OnInit {
  data: IQuestion[] = [];
  QUESTION_KEY = QUESTION_KEY;

  constructor(
    private readonly formSignalService: FormSignalService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.data = this.formSignalService.viewSignal;
    if (!this.data || !this.data.length) {
      this.backToBuilder();
    }
  }

  backToBuilder() {
    this.router.navigate([
      `${ENDROUTERNAME.FORM.FORM}/${ENDROUTERNAME.FORM.BUILDER}`,
    ]);
  }

  answerData(answer: string | IAnswer, field: keyof IAnswer) {
    return (answer as IAnswer)[field];
  }
}
