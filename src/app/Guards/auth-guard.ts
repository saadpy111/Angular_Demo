import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    const _authService  = inject(AuthService);
    const _router = inject(Router)
    if(_authService.isUserLoggedin())
      return true
    else 
      _router.navigate(['auth']);
     return false;
};
