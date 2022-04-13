import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './core/interceptors/httpconfig.interceptor';
import { Angular4PaystackModule } from 'angular4-paystack';
import { PageRefreshService } from './core/services/page-refresh.service'

// import { HttpErrorInterceptor } from './interceptors/httperror.interceptor';
import { RouterModule } from '@angular/router';

import { ModulesModule } from './shared/modules/modules.module';
import { AccountServiceProxy,
        ServiceRequestServiceProxy,
        DashboardServiceProxy,
        CompanyServiceProxy,
        GeographyServiceProxy,
        DropdownServiceProxy,
        SubscriptionServiceProxy,
        ReportServiceProxy,
      } from './core/http/services2'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { CardComponent } from './shared/components/card/card.component';
import { TileComponent } from './shared/components/tile/tile.component';
import { HeaderComponent } from './core/header/header.component';
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ConfirmEmailComponent } from './modules/confirm-email/confirm-email.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { ErrorPopupComponent } from './shared/components/error-popup/error-popup.component';

import { ToastrModule } from 'ngx-toastr';
import { ChangePasswordComponent } from './modules/change-password/change-password.component';
import { ChangeAddressComponent } from './modules/change-address/change-address.component';
import { SignatureComponent } from './shared/components/signature/signature.component';
import { IdCardComponent } from './shared/components/id-card/id-card.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { AuthGuard } from './core/guard/guard.guard';
import { ServiceAddressComponent } from './modules/service-address/service-address.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { SubscribeComponent } from './shared/components/subscribe/subscribe.component';
import { MegaModalComponent } from './shared/components/mega-modal/mega-modal.component';
import { ViewAllGraphComponent } from './shared/components/view-all-graph/view-all-graph.component';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    CardComponent,
    TileComponent,
    HeaderComponent,
    SidenavComponent,
    SidebarComponent,
    ConfirmEmailComponent,
    ModalComponent,
    ErrorPopupComponent,
    ChangePasswordComponent,
    ChangeAddressComponent,
    SignatureComponent,
    IdCardComponent,
    ServiceAddressComponent,
    LoaderComponent,
    SubscribeComponent,
    MegaModalComponent,
    ViewAllGraphComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModulesModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SignaturePadModule,
    Angular4PaystackModule.forRoot('pk_test_8b4f5f4c86233ec5ab09207fe044969824ad211a'),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    AccountServiceProxy,
    DropdownServiceProxy,
    GeographyServiceProxy,
    CompanyServiceProxy,
    ServiceRequestServiceProxy,
    DashboardServiceProxy,
    AuthGuard,
    SubscriptionServiceProxy,
    PageRefreshService,
    ReportServiceProxy,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
