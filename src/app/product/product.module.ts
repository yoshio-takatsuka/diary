import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-listings/product-listings.component';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductService } from './shared/product.service';
import { AuthGuard } from '../auth/shared/auth.guard';
import { DiaryComponent } from './diary/diary.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';
import { KakeiboComponent } from './kakeibo/kakeibo.component';

const routes: Routes = [
  { 
    path: 'products', component: ProductComponent,
    children: [
      { path: '', component: ProductListComponent },                            // 初期画面
      { path: 'diary', component: DiaryComponent, canActivate: [AuthGuard] },   // 日記
      { path: 'kakeibo', component: KakeiboComponent, canActivate: [AuthGuard] }, // 家計簿
      { path: 'skill', component: DiaryComponent, canActivate: [AuthGuard] },   // スキル
    ]
  }
];


@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    DiaryComponent,
    KakeiboComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: []
})
export class ProductModule { }
