import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SnackbarComponent } from './shared/components/snackbar/snackbar.component';
import { SnackbarService } from './core/services/snackbar.service';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SnackbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'carwaleclient';
  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;

  constructor(private snackbarService: SnackbarService) { }

  ngAfterViewInit() {
    this.snackbarService.register(this.snackbar);
  }

}
