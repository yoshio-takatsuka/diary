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
  myKakeiboForm: FormGroup;

  constructor(
    private productService: ProductService,
    private router: Router,
    private builder: FormBuilder

  ) {

    this.myKakeiboForm = this.builder.group({
        p_date: [''],
        kakeibos: this.builder.array([
          this.createmyKakeibo()
        ],Validators.required)

    });

  }


  ngOnInit() {

    // 最初に動く処理
    // debugger
    // this.myKakeibo = this.createmyKakeibo();
    // debugger
  }
  /**
  * formArrayName を取得するために必要な Getter
  * 
  * @return 家計簿情報 FormArray
  */
  createmyKakeibo(): FormGroup {
    return  this.builder.group({
      kakeiboTime: [''],
      kakeiboKamoku: [''],
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
    // console.log(JSON.stringify(this.myKakeiboForm, null, 2));

    return this.myKakeiboForm.get('kekeibos') as FormArray;
  }

  // get kakeibos(): FormArray {
  //   return <FormArray> this.myKakeiboForm.get('kakeibos');
 
  // }

  /**
   * 家計簿情報 入力フォームを1行追加する
   */
  addKakeibo() {
    // Getter を用意したいので「this.kekeibos」でアクセス可能
    debugger
    this.kekeibos.push(this.createmyKakeibo());
  }
  /**
   * 家計簿情報 入力フォームを1行削除する
   */
   removeKakeibo(index: number) {
    // Getter を用意したいので「this.kekeibos」でアクセス可能
    debugger
    this.kekeibos.removeAt(index);
  }

  // formの日記、家計簿、スキル情報を更新する 
  registerKakeibo(myKakeiboForm) {

    let res = confirm("登録してもいいですかー？");
    if (res == true) {
    }
    else {
      // キャンセルならアラートボックスを表示
      alert("登録をやめまーす。");
      return;
    }

    this.productService.kekeibo(myKakeiboForm).subscribe(
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
  serch(myKakeiboForm) {

    const productsObservable = this.productService.getDairy(myKakeiboForm.p_date.value)
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





