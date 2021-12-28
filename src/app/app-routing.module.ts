import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './orders/cart/cart.component';
import { ChisiamoComponent } from './info/chisiamo/chisiamo.component';
import { FaqComponent } from './info/faq/faq.component';
import { HomeComponent } from './home/home.component';
import { ItemComponent } from './products/item/item.component';
import { SalesComponent } from './vetrine/sales/sales.component';
import { ShopComponent } from './vetrine/shop/shop.component';
import { OrdersComponent } from './orders/orders.component';
import { CompleteComponent } from './orders/complete/complete.component'
import { CheckoutComponent } from './orders/checkout/checkout.component';
import { LoginComponent } from './users/login/login.component';
import { SignUpComponent } from './users/sign-up/sign-up.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ListProductsComponent } from './liste/list-products/list-products.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppGuard } from './app-guard.service';
import { UserComponent } from './users/users.component';
import { MessageListComponent } from './liste/message-list/message-list.component';
import { OrderGuard } from './order-guard.service';
import { OrderListComponent } from './liste/order-list/order-list.component';

const routes: Routes = [
  { path: 'offerte', component: SalesComponent },
  { path: 'negozio', component: ShopComponent },
  { path: 'chi-siamo', component: ChisiamoComponent },
  { path: 'ordine', component: OrdersComponent, canActivate: [AppGuard], children: [
    { path: 'carrello', component: CartComponent},
    { path: 'checkout', component: CheckoutComponent, canActivate: [OrderGuard] },
    { path: 'complete', component: CompleteComponent, canActivate: [OrderGuard] },
  ]},
  { path: 'faq', component: FaqComponent },
  { path: 'prodotto/:id', component: ItemComponent },
  {
    path: 'user', component: UserComponent, children: [
      { path: 'login', component: LoginComponent, canActivate: [AppGuard] },
      { path: 'sign-up', component: SignUpComponent, canActivate: [AppGuard] },
    ]
  },
  { path: 'lista-messaggi', component: MessageListComponent, canActivate: [AppGuard]},
  { path: 'lista-ordini', component: OrderListComponent, canActivate: [AppGuard]},
  { path: 'nuovo-prodotto', component: AddProductComponent, canActivate: [AppGuard]},
  { path: 'edit-prodotto/:id', component: AddProductComponent, canActivate: [AppGuard]},
  { path: 'lista-prodotti', component: ListProductsComponent, canActivate: [AppGuard]},
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
