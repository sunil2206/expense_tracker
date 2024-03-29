import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouteGuard } from './services/route-guard.service';
import { FireAuthService } from './services/fire-auth.service';
import { MainComponent } from './components/main/main.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';
import { ListComponent } from './components/list/list.component';
import { AddIncomeComponent } from './components/add-income/add-income.component';
import { InListComponent } from './components/in-list/in-list.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([{
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RouteGuard],
    children: [{
            path: 'main',
            component: MainComponent
        },
        {
          path: 'list',
          component: ListComponent
        },
        {
          path: 'incomeList',
          component: InListComponent
        },
        {
            path: 'expenses',
            component: ExpensesComponent
        },
        {
          path: 'user-profile',
          component: ProfileComponent
        },
        {
            path: 'income',
            component: AddIncomeComponent
        },
        {
            path: 'viewCategory/:category',
            component: ViewCategoryComponent
        },
        {
            path: '',
            component: MainComponent
        }]
  }
  ], { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
