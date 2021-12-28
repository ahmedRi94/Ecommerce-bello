import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChisiamoComponent } from './info/chisiamo/chisiamo.component';
import { ShopComponent } from './vetrine/shop/shop.component';
import { CartComponent } from './orders/cart/cart.component';
import { AppRoutingModule } from './app-routing.module';
import { CardComponent } from './generics/components/card/card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { SalesComponent } from './vetrine/sales/sales.component';
import { ItemComponent } from './products/item/item.component';
import { FaqComponent } from './info/faq/faq.component';
import { OrdersComponent } from './orders/orders.component';
import { CheckoutComponent } from './orders/checkout/checkout.component';
import { CompleteComponent } from './orders/complete/complete.component';
import { SlideComponent } from './generics/components/carouselSlide/slide.component';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './generics/components/alert/alert.component';
import { LoginComponent } from './users/login/login.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ListProductsComponent } from './liste/list-products/list-products.component';
import { SignUpComponent } from './users/sign-up/sign-up.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppGuard } from './app-guard.service';
import { FilterShopDirective } from './generics/directives/filter.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './generics/components/dialog/dialog.component'
import { UserComponent } from './users/users.component';
import { MessageListComponent } from './liste/message-list/message-list.component';
import { OrderGuard } from './order-guard.service';
import { ScrollToTopComponent } from './generics/components/scroll-to-top/scroll-to-top.component';
import { OrderListComponent } from './liste/order-list/order-list.component';
import { FilterSearchPipe } from './generics/pipes/filter-search.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChisiamoComponent,
    ShopComponent,
    CartComponent,
    CardComponent,
    NavbarComponent,
    FooterComponent,
    SalesComponent,
    ItemComponent,
    FaqComponent,
    OrdersComponent,
    CheckoutComponent,
    CompleteComponent,
    SlideComponent,
    AlertComponent,
    LoginComponent,
    AddProductComponent,
    ListProductsComponent,
    SignUpComponent,
    PageNotFoundComponent,
    FilterShopDirective,
    DialogComponent,
    UserComponent,
    MessageListComponent,
    OrderListComponent,
    FilterSearchPipe,
    ScrollToTopComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [AppGuard, OrderGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
