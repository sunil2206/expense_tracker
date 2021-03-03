import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// component imports
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MatcomponentsModule } from './matcomponents.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryComponent } from './components/category/category.component';
import { MainComponent } from './components/main/main.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';
import { ListComponent } from './components/list/list.component';
import { IncomeComponent } from './components/income/income.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';

import { FirebaseImportsModule } from './firebase-imports.module';
import { NotificationService } from './services/notification.service';
import { AddIncomeComponent } from './components/add-income/add-income.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    CategoryComponent,
    MainComponent,
    ExpensesComponent,
    ViewCategoryComponent,
    ListComponent,
    IncomeComponent,
    DeleteDialogComponent,
    SuccessDialogComponent,
    AddIncomeComponent
  ],
  imports: [
    MatcomponentsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FirebaseImportsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  entryComponents: [
    ListComponent,
    ExpensesComponent
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
