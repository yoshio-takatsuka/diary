import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }


  getProducts(): Observable<any> {
    return this.http.get('/api/v1/products')
  }
  // 日記情報更新
  diary(userData: any): Observable<any> {
    return this.http.post('/api/v1/diaries/register' , userData.value)
  }
 

  getDairy(p_date: string): Observable<any> {
     return this.http.get('/api/v1/diaries/' + p_date)
  }

  // 家計簿情報更新
  regKakeibo(userData: any): Observable<any> {
    debugger
    return this.http.post('/api/v1/kakeibos/register' , userData.value)
  }
 
  // 家計簿情報検索
  getKakeibo(p_date: string): Observable<any> {
     return this.http.get('/api/v1/kakeibos/' + p_date)
  }
}