import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserRoles } from '../../../core/constants/user.roles';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

 

  authService: AuthService = inject(AuthService);
 
  isSeller() {
    return this.authService.userRole == UserRoles.SELLER;
  }
 
  logout() {
    this.authService.logout();
  }


}

