import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DiaryGuard } from './shared/diary.guard';
import { DiaryService } from './shared/diary.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/token.interceptor';

// diary


const routes: Routes = [
  { 
    path: 'diary', component: RegisterComponent,
    children: [
      { path: '', component: RegisterComponent },
    ]
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule
  ],
  providers: [
    DiaryGuard,
    DiaryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: []
})
export class DiaryModule { }
