import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import {  Subject } from 'rxjs';
import { Message } from './interface/message.interface';
import { Product } from './interface/product.interface';
import { User } from './interface/user.interface';

// da splittare su più service sta crescendo troppo

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url: string = 'https://60e7113c15387c00173e4a54.mockapi.io/';

  userRole: 'user'|'admin' | null = null;

  userRoleChange: Subject<'user'|'admin' | null> = new Subject<'user'|'admin'|null>()

  cart: Product[] = []

  canRoute: boolean;

  cartLengthChange: Subject<Number>= new Subject<Number>();

  cartLength: Number;

  //auth

  constructor(private http: HttpClient, private router: Router) { 
    this.userRoleChange.subscribe((value)=>{
      this.userRole = value;
    }) 
    this.cartLengthChange.subscribe((value)=>{
      this.cartLength = value;
    })
  }

  
  changeCartLength() {
    this.cartLengthChange.next(this.cart.length)
  }

  changeUserRole(user: 'user' | 'admin' | null) {
    this.userRoleChange.next(user)
  }

  isAuthenticated(route: ActivatedRouteSnapshot) {
    this.canRoute = false;
    switch (route.routeConfig.path) {
      case 'lista-messaggi':
        if (this.userRole === 'admin') {
          this.canRoute = true;
        }
        break; 
        case 'lista-ordini':
        if (this.userRole === 'admin') {
          this.canRoute = true;
        }
        break;    
      case 'lista-prodotti':
        if (this.userRole === 'admin') {
          this.canRoute = true;
        }
        break;
      case 'edit-prodotto/:id':
        if (this.userRole === 'admin') {
          this.canRoute = true;
        }
        break;
      case 'nuovo-prodotto':
        if (this.userRole === 'admin') {
          this.canRoute = true;
        }
        break;
      case 'sign-up':
        if (this.userRole === null) {
          this.canRoute = true;
        }
        break;
      case 'login':
        if (this.userRole === null) {
          this.canRoute = true;
        }
        break;
      case 'complete':
        if (this.userRole !== null) {
          this.canRoute = true;
        }
        break;
      case 'checkout':
        if (this.userRole !== null) {
          this.canRoute = true;
        }
        break;   
      case 'ordine/carrello':
        if (this.userRole !== null) {
          this.canRoute = true;
        }
        break;   
      case 'ordine/checkout':
        if (this.userRole !== null) {
          this.canRoute = true;
        }
        break;   
      case 'ordine/complete':
        if (this.userRole !== null) {
          this.canRoute = true;
        }
        break;  
      case 'ordine':
        if (this.userRole !== null) {
          this.canRoute = true;
        }
        break;
    }
    if(!this.canRoute){
      if(route.routeConfig.path ==='ordine'){
        this.router.navigate(['/user','login']);
      } else {
        this.router.navigate(['/']);
      }
    }
    return this.canRoute;
  }

  getUser(id: number) {
    return this.http.get<User>(this.url + 'users');
  }

  getUsers() {
    return this.http.get<User[]>(this.url + 'users');
  }

  postUser(user: User) {
    return this.http.post<User[]>(this.url + 'users', user);
  }

// end auth

// products

  getProducts() {
    return this.http.get<Product[]>(this.url + 'products');
  }

  getProduct(id: number) {
    return this.http.get<Product>(this.url + 'products/' + id);
  }

  postProduct(product: Product) {
    return this.http.post<Product>(this.url + 'products/', product);
  }

  putProduct(product: Product) {
    return this.http.put<Product>(this.url + 'products/' + product.id, product);
  }

  deleteProduct(id: number) {
    return this.http.delete<Product>(this.url + 'products/' + id);
  }

  addProduct(product: Product) {
    return this.http.post<Product>(this.url + 'products/', product);
  }

  //end products

  getMessages() {
    return this.http.get<Message[]>(this.url+'messages');
  }

  postMessage(message: Message){
    return this.http.post<Message>(this.url+ 'messages/', message);
  }
}
