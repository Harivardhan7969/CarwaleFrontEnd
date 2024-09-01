import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { UserAuthDto } from '../../../../shared/models/user.auth.dto';
import { UserRoles } from '../../../../core/constants/user.roles';
import { StorageService } from '../../../../core/services/storage.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { AddCarDetailsComponent } from '../add-car-details/add-car-details.component';

@Component({
  selector: 'app-seller-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, FormsModule, NgClass, RouterLink, AddCarDetailsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  signInForm!: FormGroup;
  submitted = false;
  showShakeAnimation: any;

  snackbarService: SnackbarService = inject(SnackbarService);
  authService: AuthService = inject(AuthService);
  storageService: StorageService = inject(StorageService);
  router: Router = inject(Router);
  errorLogingIn: boolean = false;
  errorMessage: string = '';
  sellerId!: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.signInForm.controls; }

  onSubmit() {
    this.submitted = true;




    if (this.signInForm.invalid) {
      this.snackbarService.show('Please fill out all required fields.', 3000);
      return;
    }
    console.log('Form submitted successfully', this.signInForm.value);




    if (this.signInForm.invalid) {
      return;
    }
    console.log('Form submitted successfully', this.signInForm.value);

    let userAuthDto: UserAuthDto = {

      email: this.signInForm.value.email,
      password: this.signInForm.value.password,
      userRole: UserRoles.SELLER

    }

    this.authService.login(userAuthDto).subscribe(
      {
        next: (response) => {
          this.authService.user = response.data;
          this.sellerId = response.data?.id;
          this.authService.isLoggedIn = true;
          this.authService.userRole = UserRoles.SELLER
          this.storageService.setUserToken(response?.data?.token ?? "");
          this.errorLogingIn = false;
          this.errorMessage = "";
          console.log(response);
          this.snackbarService.show('Login successful!', 3000);
          this.router.navigate(['/seller/dashboard']);

        },
        error: (error) => {
          this.authService.isLoggedIn = false;
          this.authService.userRole = "";
          this.authService.user = null;

          this.errorLogingIn = true;
          this.errorMessage = "error in regestering";
          this.snackbarService.show(' credentials invalid', 3000);
          console.log(error);
        }
      }

    )


  }

  onForgetPassword(event: Event): void {
    console.log(event.preventDefault());
    console.log('Forget password clicked');
  }



}
