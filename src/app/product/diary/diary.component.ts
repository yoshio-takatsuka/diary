import { Component, OnInit,  } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { kakeibos } from '../../diary/kakibos';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {
  errors: any = []
  diaries: any = []    // 日記情報
  data: Array<any>;
  checkValue = true

  constructor(
    private productService: ProductService,
    private router: Router,

  ) {
  }


  ngOnInit() {

    // 最初に動く処理
    // 検索のみ可とする
    debugger
    this.checkValue=true
    let a ="aaa"


  
  }

  // formの日記、家計簿、スキル情報を更新する 
  registerDiary(diaryForm) {
    debugger
    let res = confirm("登録してもいいですかー？");
    if (res == true) {
    }
    else {
      // キャンセルならアラートボックスを表示
      alert("登録をやめまーす。");
      return;
    }

    this.productService.diary(diaryForm.value).subscribe(
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
  serch(diaryForm) {

    this.productService.getDairy(diaryForm.value.p_date).subscribe(
      (result) => {
        this.diaries = result.daiaies

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










