import { Routes } from '@angular/router';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { SessionGuard } from './shared/guards/session.guard';
import { RoleGuard } from './shared/guards/role-guard';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SigninComponent } from './pages/signin/signin.component';
import { InternalServerComponent } from './pages/internal-server/internal-server.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AccountRegistrationComponent } from './pages/account-registration/account-registration.component';
import { PurchasesByServiceComponent } from './pages/purchases-by-service/purchases-by-service.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ServiceRepairComponent } from './pages/service-repair/service-repair.component';
import { RoleCreateComponent } from './pages/role-create/role-create.component';
import { InvoiceSummaryDialogComponent } from './dialogs/invoice-summary-dialog/invoice-summary-dialog.component';
import { SecurityQuestionAskComponent } from './pages/security-question-ask/security-question-ask.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [SessionGuard]
      },
      {
        path: 'users',
        component: UserListComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'users/:userId',
        component: UserDetailsComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'security-questions',
        component: SecurityQuestionListComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'security-questions/:questionId',
        component: SecurityQuestionDetailsComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'security-questions/create/new',
        component: SecurityQuestionCreateComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'security-questions/ask/:username',
        component: SecurityQuestionAskComponent
      },
      {
        path: 'password-reset',
        component: PasswordResetComponent
      },
      {
        path: 'purchases-by-service',
        component: PurchasesByServiceComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'internal-server',
        component: InternalServerComponent
      },
      {
        path: 'service-repair',
        component: ServiceRepairComponent,
        canActivate: [SessionGuard]
      },
      {
        path: 'invoice-summary-dialog',
        component: InvoiceSummaryDialogComponent,
        canActivate: [SessionGuard]
      },
      {
        path: 'role-create',
        component: RoleCreateComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [RoleGuard]
      }
    ]
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'account-registration',
        component: AccountRegistrationComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      }
    ]
  },
  {
    path: "**",
    pathMatch: 'full',
    component: NotFoundComponent
  }
];
