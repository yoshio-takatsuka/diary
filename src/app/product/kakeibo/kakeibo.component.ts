import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../shared/product.service';
import { FormsModule, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/app.data';





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
  kamokus = [];
  kouzas = [];

  constructor(
    private productService: ProductService,  // サーバー側に連絡
    private dataKamoku: DataService,
    private dataKouza: DataService,
    private builder: FormBuilder             // formを設定
  ) {


    this.myKakeiboForm = this.builder.group({
      p_date: [''],
      kakeibos: this.builder.array([
        this.createmyKakeibo()
      ], Validators.required)

    });
    this.kamokus = this.dataKamoku.getKamokuData()
    this.kouzas = this.dataKouza.getKouzaData()

  }


  ngOnInit() {


  }
  /**
  * formArrayName を取得するために必要な Getter
  * 
  * @return 家計簿情報 FormArray
  */
  createmyKakeibo(): FormGroup {
    return this.builder.group({
      kakeiboTime: [''],
      kakeiboKamoku: [''],
      kakeiboDetail: [''],
      kakeiboEtc: [''],
      kakeiboPayKbn: [''],
      kakeiboKingaku: [0],
    });
  }

  /**
  * formArrayName を取得するために必要な Getter
  * 
  * @return 家計簿情報 FormArray
  */
  get kakeibos(): FormArray {
    // debugger
    // console.log(JSON.stringify(this.myKakeiboForm, null, 2));

    return this.myKakeiboForm.get('kakeibos') as FormArray;
  }

  /**
   * 家計簿情報 入力フォームを1行追加する
   */
  addKakeibo() {
    // Getter を用意したいので「this.kakeibos」でアクセス可能
    // debugger
    this.kakeibos.push(this.createmyKakeibo());
  }
  /**
   * 家計簿情報 入力フォームを1行削除する
   */
  removeKakeibo(index: number) {
    // Getter を用意したいので「this.kakeibos」でアクセス可能

    this.kakeibos.removeAt(index);
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

    this.productService.regKakeibo(myKakeiboForm).subscribe(
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
  // 該当日付の家計簿情報を取得してくる 
  serch(myKakeiboForm) {
    // debugger
    const productsObservable = this.productService.getKakeibo(myKakeiboForm.value.p_date)
    productsObservable.subscribe(
      (result) => {
        this.checkValue1 = true
        if (result === "") {                   // 検索なしの場合は」クリア
          for ( let i = 0; i < this.kakeibos.length; i++ ) {
            this.removeKakeibo(i)            
          }
          this.addKakeibo()                
        } else {
          this.myKakeiboForm.get("kakeibos").patchValue(result.kakeibos)
        }
        console.log("Success!")

      },
      (err) => { console.error('次のエラーが発生しました: ' + err) }
    )
  }
}





