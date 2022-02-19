import { Component, OnInit } from '@angular/core';
import { DiaryService } from '../shared/diary.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { kakeibos } from '../kakibos';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errors: any = []
  diaries: any = []    // 日記情報
  kakeibos = kakeibos   // 家計簿情報
  skills: any = []     // スキル情報
  data: Array<any>;

  constructor(
    private diaryService: DiaryService,
    private router: Router,

  ) {


    this.kakeibos = [
      {
      time: '2022/2/14 10:00',
      kamoku: '科目１',
      detail: '詳細１',
      etc: 'A large phone with one of the best screens',
      payKbn: '現金',
      kingaku: 500,
    },
    {
      time: '2022/2/14 11:05',
      kamoku: '科目２',
      detail: '詳細２',
      etc: 'A large phone with one of the best screens',
      payKbn: 'カード',
      kingaku: 500,
    },
    {
      time: '2022/2/14 12:12',
      kamoku: '科目3',
      detail: '詳細3',
      etc: 'A large phone with one of the best screens',
      payKbn: '現金',
      kingaku: 500,
    },
  ];




  }


  ngOnInit() {




    // 家計簿情報　空行作成　10行
    // const Kakeibo [] = new  Object({
    //   p_date: String,          //
    //   time: String,      // 実績時刻
    //   kamoku: String,   // 科目
    //   detail: String,      // 詳細
    //   etc: String,    // その他
    //   payKbn: String,      // 支払方法
    //   kingaku: Number     // 金額
    // })


    // スキル情報　空行作成　10行  
  }

  // formの日記、家計簿、スキル情報を更新する 
  register(registerForm) {
    debugger
    let res = confirm("登録してもいいですかー？");
    if (res == true) {
    }
    else {
      // キャンセルならアラートボックスを表示
      alert("登録をやめまーす。");
      return;
    }

    this.diaryService.register(registerForm.value).subscribe(
      (result) => {
        console.log("Success!")
        // this.router.navigate(['/login'])
      },
      (err: HttpErrorResponse) => {
        console.error(err)
        this.errors = err.error.errors
      }
    )
  }
  // 該当日付の日記、家計簿、スキル情報を取得してくる 
  Serch(registerForm) {




    this.diaryService.getDairy(registerForm.value.p_date).subscribe(
      (result) => {
        this.diaries = result.daiaies
        this.kakeibos = result.kakeibos

        this.skills = result.skills

        console.log("Success!")
        // this.router.navigate(['/login'])
      },
      (err: HttpErrorResponse) => {
        console.error(err)
        this.errors = err.error.errors
      }
    )
  }


}










