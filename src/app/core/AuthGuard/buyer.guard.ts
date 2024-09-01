import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { UserRoles } from "../constants/user.roles";

export function buyerGuard() {

    let authService: AuthService = inject(AuthService);

    return authService.userRole === UserRoles.BUYER;
}