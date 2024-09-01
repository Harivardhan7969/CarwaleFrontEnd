import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { UserAuthDto } from '../../../../shared/models/user.auth.dto';
import { UserRoles } from '../../../../core/constants/user.roles';
import { StorageService } from '../../../../core/services/storage.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, FormsModule, NgClass, RouterLink, FooterComponent],
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


  constructor(private formBuilder: FormBuilder) {



  }
  // openSnackBar(massage: string, action: string) {
  //   this.snack.open(massage, action, {
  //     duration: 3000,
  //     panelClass: ['success'],
  //     verticalPosition: 'top',
  //     horizontalPosition: 'left',
  //   })
  // };

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.signInForm.controls; }

  onSubmit() {
    // this.openSnackBar("successFul", "close");
    this.submitted = true;

    // if (this.signInForm.invalid) {
    //   this.snackbarService.show('Please fill out all required fields.', 3000);
    //   return;
    // }
    // console.log('Form submitted successfully', this.signInForm.value);

    // if (this.signInForm.invalid) {
    //   return;
    // }
    // console.log('Form submitted successfully', this.signInForm.value);




    let userAuthDto: UserAuthDto = {

      email: this.signInForm.value.email,
      password: this.signInForm.value.password,
      userRole: UserRoles.BUYER

    }

    this.authService.login(userAuthDto).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.authService.user = response.data;
          this.authService.isLoggedIn = true;
          this.authService.userRole = UserRoles.BUYER;
          this.storageService.setUserToken(response?.data?.token ?? "");
          this.errorLogingIn = false;
          this.errorMessage = "";
          console.log(response);
          this.snackbarService.show('Login successful!', 3000);
          this.router.navigate(['/buyer']);
        },
        error: (error) => {
          console.log(error);
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
