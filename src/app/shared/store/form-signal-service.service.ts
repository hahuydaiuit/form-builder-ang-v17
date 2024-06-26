import { Injectable, signal } from '@angular/core';
import { IQuestion } from '..';

@Injectable({
  providedIn: 'root',
})
export class FormSignalService {
  private data = signal(null as IQuestion | null);
  private view = signal([] as IQuestion[]);

  setDataSignal(val: IQuestion) {
    this.data.set(val);
  }

  get DataSignal() {
    return this.data();
  }

  setViewSignal(val: IQuestion[]) {
    this.view.set(val);
  }

  get wiewSignal() {
    return this.view();
  }
}
