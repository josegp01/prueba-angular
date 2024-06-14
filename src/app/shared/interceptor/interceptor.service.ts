import { HttpInterceptorFn } from '@angular/common/http';

export const Interceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('authtoken');

  // Clone the request and add the authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `${authToken}`
    }
  });

  // Pass the cloned request with the updated header to the next handler
  return next(authReq);
};