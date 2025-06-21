import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _message = signal<string | null>(null);
  message = this._message.asReadonly();

  show(message: string, duration: number = 3000) {
    this._message.set(message);
    setTimeout(() => this._message.set(null), duration);
  }
}
