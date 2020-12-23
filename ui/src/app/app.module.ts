import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {Routes, RouterModule} from '@angular/router';
import {DialogContentComponent, SignInComponent} from './pages/auth/sign-in/sign-in.component';
import {SignUpComponent} from './pages/auth/sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {StoreService} from '../services/store.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {CdkTableModule} from '@angular/cdk/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {StartPageComponent} from './pages/user/startPage/start.page.component';
import {UserService} from '../services/user.service';
import { ComplaintComponent } from './pages/client/complaint/complaint.component';
import { RequestComponent } from './pages/user/request/request.component';
import { NotificationsComponent } from './pages/user/notifications/notifications.component';
import { ScheduleComponent } from './pages/user/schedule/schedule.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { UserTableComponent } from './pages/admin/user-table/user-table.component';
import { CreateNotificationComponent } from './pages/admin/create-notification/create-notification.component';
import { CreateLessonComponent } from './pages/admin/create-lesson/create-lesson.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_CHIPS_DEFAULT_OPTIONS, MatChipsModule} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';


const appRoutes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'startPage', component: StartPageComponent},
  {path: 'complaint', component: ComplaintComponent},
  {path: 'request', component: RequestComponent},
  {path: 'notifications', component: NotificationsComponent},
  {path: 'schedule', component: ScheduleComponent},
  {path: 'createNotification', component: CreateNotificationComponent},
  {path: 'createLesson', component: CreateLessonComponent},
  {path: 'userTable', component: UserTableComponent}
  ];

@NgModule({
  entryComponents: [SignUpComponent],
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DialogContentComponent,
    StartPageComponent,
    ComplaintComponent,
    RequestComponent,
    NotificationsComponent,
    ScheduleComponent,
    DialogComponent,
    LessonComponent,
    TopBarComponent,
    UserTableComponent,
    CreateNotificationComponent,
    CreateLessonComponent
    ],
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSortModule,
    MatTableModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    CdkTableModule,
    MatMenuModule,
    MatListModule,
    MatStepperModule,
    MatSelectModule,
    MatChipsModule
  ],
  providers: [
    AuthService,
    StoreService,
    UserService,
    { provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA]
      }}
   ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
