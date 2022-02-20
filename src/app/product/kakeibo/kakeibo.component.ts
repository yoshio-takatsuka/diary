import { Component, OnInit,  } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
// import { kakeibos } from '../../kakeibo/kakibos';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-kakeibo',
  templateUrl: './kakeibo.component.html',
  styleUrls: ['./kakeibo.component.scss']
})
export class KakeiboComponent implements OnInit {
  errors: any = []
  diaries: any = []    // 日記情報
  // kakeibos = kakeibos   // 家計簿情報
  skills: any = []     // スキル情報
  data: Array<any>;

  constructor(
    private productService: ProductService,
    private router: Router,

  ) {
  }


  ngOnInit() {
  
  }

  // formの日記、家計簿、スキル情報を更新する 
  registerKakeibo(kakeiboForm) {
    debugger
    let res = confirm("登録してもいいですかー？");
    if (res == true) {
    }
    else {
      // キャンセルならアラートボックスを表示
      alert("登録をやめまーす。");
      return;
    }

    // this.productService.kakeibo(kakeiboForm.value).subscribe(
    //   (result) => {
    //     console.log("Success!")
    //     // this.router.navigate(['/login'])
    //   },
    //   (err: HttpErrorResponse) => {
    //     console.error(err)
    //     this.errors = err.error.errors
    //   }
    // )
  }
  // 該当日付の日記、家計簿、スキル情報を取得してくる 
  Serch(kakeiboForm) {

    this.productService.getDairy(kakeiboForm.value.p_date).subscribe(
      (result) => {
        this.diaries = result.daiaies
        // this.kakeibos = result.kakeibos

        // this.skills = result.skills

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










