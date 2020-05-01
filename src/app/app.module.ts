import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AppRoutes } from './app.routing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { SessionGuard } from './shared/guards/session.guard';
import { RoleGuard } from './shared/guards/role-guard';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { ChartModule } from 'primeng/chart';
import {MatCheckboxModule} from '@angular/material/checkbox';




// Components
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { SigninComponent } from './pages/signin/signin.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
import { UserDeleteDialogComponent } from './dialogs/user-delete-dialog/user-delete-dialog.component';
import { SecurityQuestionDeleteDialogComponent } from './dialogs/security-question-delete-dialog/security-question-delete-dialog.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { InternalServerComponent } from './pages/internal-server/internal-server.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AccountRegistrationComponent } from './pages/account-registration/account-registration.component';
import { PurchasesByServiceComponent } from './pages/purchases-by-service/purchases-by-service.component';
import { InvoiceSummaryDialogComponent } from './dialogs/invoice-summary-dialog/invoice-summary-dialog.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ServiceRepairComponent } from './pages/service-repair/service-repair.component';
import { RoleCreateComponent } from './pages/role-create/role-create.component';
import { SecurityQuestionAskComponent } from './pages/security-question-ask/security-question-ask.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';


@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    SecurityQuestionCreateComponent,
    SecurityQuestionListComponent,
    SigninComponent,
    UserDetailsComponent,
    UserListComponent,
    SecurityQuestionDetailsComponent,
    UserDeleteDialogComponent,
    SecurityQuestionDeleteDialogComponent,
    AboutComponent,
    ContactComponent,
    NotFoundComponent,
    InternalServerComponent,
    ForgotPasswordComponent,
    AccountRegistrationComponent,
    PurchasesByServiceComponent,
    InvoiceSummaryDialogComponent,
    AdminComponent,
    ServiceRepairComponent,
    RoleCreateComponent,
    SecurityQuestionAskComponent,
    PasswordResetComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'}),
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatMenuModule,
    MatListModule,
    MatStepperModule,
    MatGridListModule,
    ChartModule,
    MatCheckboxModule
  ],
  entryComponents: [
    SecurityQuestionDeleteDialogComponent,
    UserDeleteDialogComponent,
    InvoiceSummaryDialogComponent
  ],
  providers: [
    CookieService,
    SessionGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
