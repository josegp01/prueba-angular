import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const dashboardGuard: CanActivateFn = (): boolean => {
  const router = inject(Router);
  const session = localStorage.getItem('access_token');

  if (!session) {
    router.navigateByUrl('/auth');
    return false;
  }

  // if (!session.user()?.isEmailConfirmed) {
  //   navigation.forward('/validate-code');
  //   return false;
  // }

  return true;
};

export const authGuard: CanActivateFn = (): boolean => {
  const session = localStorage.getItem('access_token');
  const router = inject(Router);

  if (session) {
    router.navigateByUrl('/dashboard');
    return false;
  }

  return true;
};
