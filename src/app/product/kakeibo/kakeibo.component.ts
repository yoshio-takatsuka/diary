import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';





@Component({
  selector: 'app-kakeibo',
  templateUrl: './kakeibo.component.html',
  styleUrls: ['./kakeibo.component.scss']
})
export class KakeiboComponent {
  errors: any = []

  data: Array<any>;
  checkValue1 = false // 検索

  // kakeibo の初期値
  /** ユーザ情報登録フォーム */
  myKakeibo: FormGroup;

  // p_date = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern('^(?!([02468][1235679]|[13579][01345789])000229)(([0-9]{4}(01|03|05|07|08|10|12)(0[1-9]|[12][0-9]|3[01]))|([0-9]{4}(04|06|09|11)(0[1-9]|[12][0-9]|30))|([0-9]{4}02(0[1-9]|1[0-9]|2[0-8]))|([0-9]{2}([02468][048]|[13579][26])0229))$')
  // ]);

  // kakebos = new FormArray([

  // ])
  // kakeboTime = new FormControl('', [
  // ]);
  // kakeboKamoku = new FormControl('', [
  // ]);
  // kakeboDetail = new FormControl('', [
  // ]);
  // kakeboEtc = new FormControl('', [
  // ]);
  // kakeboPayKbn = new FormControl('', [
  // ]);
  // kakeboKingaku = new FormControl(0, [
  // ]);
  // chek1 = new FormControl(false, [
  // ]);
  // myKakeibox = this.builder.group({
  //   p_date: this.p_date,
  //   kakeibos: this.kekeibos,
  //   kakeboTime: this.kakeboTime,
  //   kakeboKamoku: this.kakeboKamoku,
  //   kakeboEtc: this.kakeboEtc,
  //   kakeboPayKbn: this.kakeboPayKbn,
  //   kakeboKingaku: this.kakeboKingaku,


  // });



  constructor(
    private productService: ProductService,
    private router: Router,
    private builder: FormBuilder

  ) {
  }


  ngOnInit() {

    // 最初に動く処理
    debugger
    this.myKakeibo = this.createmyKakeibo();
    debugger



  }
  /**
  * formArrayName を取得するために必要な Getter
  * 
  * @return 家計簿情報 FormArray
  */
  createmyKakeibo(): FormGroup {
    return this.builder.group({
      p_date: [''],
      kakeibos: this.builder.array([])
    });
  }

  get userSkillForm(): FormGroup {
    return this.builder.group({
      kakeiboTime: [''],
      kakeibokamoku: [''],
      kakeboDetail: [''],
      kakeboEtc: [''],
      kakeboPayKbn: [''],
      kakeboKingaku: [''],
    });
  }



  /**
  * formArrayName を取得するために必要な Getter
  * 
  * @return 家計簿情報 FormArray
  */
  get kekeibos(): FormArray {
    debugger
    return this.myKakeibo.get('kekeibos') as FormArray;
  }

  /**
   * 家計簿情報 入力フォームを1行追加する
   */
  addKakeibo() {
    // Getter を用意したいので「this.kekeibos」でアクセス可能
    this.kekeibos.push(this.builder.group({
      kakeboTime: '',     //時刻
      kakeboKamoku: '',   //科目
      kakeboDetail: '',   //詳細
      kakeboEtc: '',      //その他
      kakeboPayKbn: '',   //支払方法
      kakeboKingaku: '',  //金額
    }));
  }

  // formの日記、家計簿、スキル情報を更新する 
  registerKakeibo(myKakeibo) {

    let res = confirm("登録してもいいですかー？");
    if (res == true) {
    }
    else {
      // キャンセルならアラートボックスを表示
      alert("登録をやめまーす。");
      return;
    }

    this.productService.kekeibo(myKakeibo).subscribe(
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
  serch(myKakeibo) {

    const productsObservable = this.productService.getDairy(myKakeibo.p_date.value)
    productsObservable.subscribe(
      (result) => {
        this.checkValue1 = true
        if (result == "") {
          // this.myKakeibo.get("yoteiData").patchValue("")
          // this.myKakeibo.get("wakeTime").patchValue("")
          // this.myKakeibo.get("sleepTime").patchValue("")
          // this.myKakeibo.get("bzStartTime").patchValue("")
          // this.myKakeibo.get("bzEndTime").patchValue("")
          // this.myKakeibo.get("kakeiboData").patchValue("")
        } else {
          // this.myKakeibo.get("yoteiData").patchValue(result.yoteiData)
          // this.myKakeibo.get("wakeTime").patchValue(result.wakeTime)
          // this.myKakeibo.get("sleepTime").patchValue(result.sleepTime)
          // this.myKakeibo.get("bzStartTime").patchValue(result.bzStartTime)
          // this.myKakeibo.get("bzEndTime").patchValue(result.bzEndTime)
          // this.myKakeibo.get("kakeiboData").patchValue(result.kakeiboData)

        }


        console.log("Success!")

      },
      (err) => { console.error('次のエラーが発生しました: ' + err) }
    )

  }


}





