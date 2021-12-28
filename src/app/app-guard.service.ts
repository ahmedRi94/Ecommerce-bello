import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    CanActivateChild
  } from '@angular/router';

  import { Injectable } from '@angular/core';
  
import { Observable } from 'rxjs';
import { AppService } from './app.service';
  
  @Injectable()
  export class AppGuard implements CanActivate {
    constructor(private appService: AppService, private router: Router) {}
  
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.appService.isAuthenticated(route)
    }
}