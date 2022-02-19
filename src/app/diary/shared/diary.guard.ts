import { Injectable } from '@angular/core';
import { DiaryService } from './diary.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';





@Injectable()
export class DiaryGuard {

  constructor( private DiaryService : DiaryService, private router : Router ) {
  }

  canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ) {
    debugger
    if(this.DiaryService.isDiaryenticated()) return true

    this.router.navigate(['/login'])
    return false
  }
}