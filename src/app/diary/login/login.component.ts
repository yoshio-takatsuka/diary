import { Component, OnInit } from '@angular/core';
import {DiaryService } from '../shared/diary.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errors: any = []

  constructor(
    private diaryService: DiaryService,
    private router: Router
  ) { }

  ngOnInit() { }

  login(loginForm) {
    this.diaryService.login(loginForm.value).subscribe(
      (token) => {
        this.router.navigate(['/products'])
      },
      (err: HttpErrorResponse) => {
        console.error(err)
        this.errors = err.error.errors
      }
    )
  }
}
