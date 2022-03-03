import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent {
  errors: any = []

  data: Array<any>;
  checkValue1 = false // 検索

  // diary の初期値
  p_date = new FormControl('', [
    Validators.required,
    // Validators.pattern('^(?!([02468][1235679]|[13579][01345789])000229)(([0-9]{4}(01|03|05|07|08|10|12)(0[1-9]|[12][0-9]|3[01]))|([0-9]{4}(04|06|09|11)(0[1-9]|[12][0-9]|30))|([0-9]{4}02(0[1-9]|1[0-9]|2[0-8]))|([0-9]{2}([02468][048]|[13579][26])0229))$')
  ]);
  yoteiData = new FormControl('', [
  ]);
  wakeTime = new FormControl('', [
  ]);
  sleepTime = new FormControl('', [
  ]);
  bzStartTime = new FormControl('', [
  ]);
  bzEndTime = new FormControl('', [
  ]);
  diaryData = new FormControl('日記', [
  ]);
  chek1 = new FormControl(false, [
  ]);
  myDiary = this.builder.group({
    p_date: this.p_date,
    yoteiData: this.yoteiData,
    wakeTime: this.wakeTime,
    sleepTime: this.sleepTime,
    bzStartTime: this.bzStartTime,
    bzEndTime: this.bzEndTime,
    diaryData: this.diaryData

  });



  constructor(
    private productService: ProductService,
    private router: Router,
    private builder: FormBuilder

  ) {
  }


  ngOnInit() {

    // 最初に動く処理
    // 検索のみ可とする


  }

  // formの日記、家計簿、スキル情報を更新する 
  registerDiary(myDiary) {

    let res = confirm("登録してもいいですかー？");
    if (res == true) {
    }
    else {
      // キャンセルならアラートボックスを表示
      alert("登録をやめまーす。");
      return;
    }

    this.productService.diary(myDiary).subscribe(
      (result) => {
        console.log("Success!")
        // this.router.navigate(['/login'])
      },
      (err: HttpErrorResponse) => {
        console.log("error")
        console.error(err)
        this.errors = err.error.errors
      }
    )
  }
  // 該当日付の日記情報を取得してくる 
  serch(myDiary) {

    const productsObservable = this.productService.getDairy(this.p_date.value)
    productsObservable.subscribe(
      (result) => {
        this.checkValue1 = true
        if (result == "") {
          this.myDiary.get("yoteiData").patchValue("")
          this.myDiary.get("wakeTime").patchValue("")
          this.myDiary.get("sleepTime").patchValue("")
          this.myDiary.get("bzStartTime").patchValue("")
          this.myDiary.get("bzEndTime").patchValue("")
          this.myDiary.get("diaryData").patchValue("")
        } else {
          this.myDiary.get("yoteiData").patchValue(result.yoteiData)
          this.myDiary.get("wakeTime").patchValue(result.wakeTime)
          this.myDiary.get("sleepTime").patchValue(result.sleepTime)
          this.myDiary.get("bzStartTime").patchValue(result.bzStartTime)
          this.myDiary.get("bzEndTime").patchValue(result.bzEndTime)
          this.myDiary.get("diaryData").patchValue(result.diaryData)

        }


        console.log("Success!")

      },
      (err) => { console.error('次のエラーが発生しました: ' + err) }
    )

  }


}










