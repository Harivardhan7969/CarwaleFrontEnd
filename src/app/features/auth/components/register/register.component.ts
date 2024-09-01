import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { UserAuthDto } from '../../../../shared/models/user.auth.dto';
import { UserRoles } from '../../../../core/constants/user.roles';
import { StorageService } from '../../../../core/services/storage.service';
import { Router } from '@angular/router';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf, FooterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  signUpForm!: FormGroup;
  submitted = true;
  passwordMatching: boolean = false;

  errorRegistering: boolean = false;
  errorMessage: string = '';

  authService: AuthService = inject(AuthService);
  storageService: StorageService = inject(StorageService);

  router: Router = inject(Router);

  formbuilder: FormBuilder = inject(FormBuilder);
  constructor() {
    this.signUpForm = this.formbuilder.group({

      fullName: ["", [Validators.required, Validators.pattern("^[A-Za-z][A-Za-z0-9_]{3,29}$")]],
      email: ["", [Validators.required, Validators.email], []],
      password: ["", [
        Validators.required,
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{8,}')
      ]],
      confirmPassword: ["", [
        Validators.required,

      ]]

    })

    this.signUpForm.controls["password"].valueChanges.subscribe(
      data => {
        if (data === this.signUpForm.value.confirmPassword) {
          this.passwordMatching = true;
        } else {
          this.passwordMatching = false;
        }
      }
    );

    this.signUpForm.controls["confirmPassword"].valueChanges.subscribe(data => {

      console.log(this.signUpForm.value.password);

      if (this.signUpForm.value.password === data) {

        this.passwordMatching = true;
      } else {
        this.passwordMatching = false;
      }
    }
    );
  }



  onSubmit() {
    console.log(this.signUpForm);

  }

  signUp() {
    let userAuthDto: UserAuthDto = {

      fullName: this.signUpForm.value.fullName,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      userRole: UserRoles.BUYER
    }
    this.authService.register(userAuthDto).subscribe(
      {
        next: (response) => {

          this.authService.user = response.data;
          this.authService.userRole = UserRoles.BUYER;
          this.storageService.setUserToken(response?.data?.token ?? "");
          this.errorRegistering = false;
          this.errorMessage = "";
          console.log(response);
          this.router.navigate(['/buyer']);
        },
        error: (error) => {
          this.authService.isLoggedIn = false;
          this.authService.userRole = "";
          this.authService.user = null;
          this.errorRegistering = true;
          this.errorMessage = "error in regestering";
          alert("error registration");
          console.log(error);
        }
      }
    )

  }

}
