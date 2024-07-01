import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).getIsAuth()? true: inject(Router).navigate(['/login']);
};
