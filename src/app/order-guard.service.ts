import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
  } from '@angular/router';

  import { Injectable } from '@angular/core';
  
import { Observable } from 'rxjs';
import { OrderService } from './order.service';
  
  @Injectable()
  export class OrderGuard implements CanActivate {
    constructor(private orderService: OrderService, private router: Router) {}
  
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.orderService.isAuthenticated(route)
    }
}