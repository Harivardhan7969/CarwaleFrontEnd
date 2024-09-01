import { Injectable } from '@angular/core';
import { SnackbarComponent } from '../../shared/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor() { }

  public snackbarComponent!: SnackbarComponent;

  register(snackbarComponent: SnackbarComponent) {
    this.snackbarComponent = snackbarComponent;
  }

  show(message: string, duration?: number) {
    this.snackbarComponent.show(message, duration || 3000);
  }


}
