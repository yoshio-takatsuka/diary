import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../shared/product.service';
import { FormsModule, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/app.data';
@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent {
  data = [ '子', '丑', '寅', '卯', '辰', '巳',
      '午', '未', '申', '酉', '戌', '亥' ];
  constructor(
  ) {
  }
  ngOnInit() {
  }
}




