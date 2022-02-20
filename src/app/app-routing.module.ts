import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';



// メインrouting
//  ProductModule と　AuthModuleを参照
//  ProductModuleはproduct.module.tsに記載
//  AuthModuleはauth.module.tsに記載
const routes: Routes = [   
  // 未入力の場合は productsとしてルーティング
  { path: '', redirectTo: 'products', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    ProductModule,
    AuthModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
