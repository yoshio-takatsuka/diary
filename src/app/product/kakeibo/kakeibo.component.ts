import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../shared/product.service';
import { FormsModule, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/app.data';
import { LoadingSpinnerService } from '../../common/loading-spinner.service';
import { DatePipe } from '@angular/common';

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
    private builder: FormBuilder,             // formを設定
    private LoadingSpinnerService: LoadingSpinnerService,
    public datePipe: DatePipe  
  ) {
    this.myKakeiboForm = this.builder.group({
      p_date: [''],
      zanList: [''],
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
    // スピナー表示
    this.LoadingSpinnerService.show();

    this.productService.regKakeibo(myKakeiboForm).subscribe(
      (result) => {
        console.log("Success!")
        // this.router.navigate(['/login'])
        // スピナー非表示
        this.LoadingSpinnerService.hide();
        alert("登録");
      },
      (err: HttpErrorResponse) => {
        console.log("error")
        // スピナー非表示
        this.LoadingSpinnerService.hide();
        console.error(err)
        this.errors = err.error.errors
      }

    )
  }

  beforeDay(myKakeiboForm){
    // 前日計算
    let dt = new Date(myKakeiboForm.value.p_date);
    dt.setDate(dt.getDate() - 1);
    this.myKakeiboForm.get("p_date").patchValue(this.datePipe.transform(dt, "yyyy-MM-dd"))
    // 検索処理
    this.search(myKakeiboForm.value.p_date)

  }
  nowDay(myKakeiboForm){
    // 検索処理
    this.search(myKakeiboForm.value.p_date)
  }
  afterDay(myKakeiboForm){
    // 翌日計算
    let dt = new Date(myKakeiboForm.value.p_date);
    dt.setDate(dt.getDate() + 1);
    this.myKakeiboForm.get("p_date").patchValue(this.datePipe.transform(dt, "yyyy-MM-dd"))
    // 検索処理
    this.search(myKakeiboForm.value.p_date)
  }  

  // 該当日付の家計簿情報を取得してくる 
  search(paraDate) {
    debugger
            // スピナー非表示
            this.LoadingSpinnerService.show();
    const productsObservable = this.productService.getKakeibo(paraDate)
    productsObservable.subscribe(
      (result) => {
        this.checkValue1 = true
        let wk_cnt = this.kakeibos.length
        for (let i = 0; i < wk_cnt; i++) {
          this.removeKakeibo(0)
        }
        if (result === "") {                   // 検索なしの場合は」クリア
          this.addKakeibo()
        } else {
          let wk_cnt = result.kakeibos.length
          for (let i = 0; i < wk_cnt; i++) {
            this.addKakeibo()
          }

          this.myKakeiboForm.get("kakeibos").patchValue(result.kakeibos)
        }
        console.log("Success!")
        // スピナー非表示
        this.LoadingSpinnerService.hide();
      },
      (err) => { 
        console.error('次のエラーが発生しました: ' + err) 
        // スピナー非表示
        this.LoadingSpinnerService.hide();
      }

    )
  }
}





