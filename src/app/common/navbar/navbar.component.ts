// ナビゲーション
// bootstroap から作成　https://getbootstrap.com/docs/5.1/components/navbar/
import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthService } from 'src/app/auth/shared/auth.service';


@Component({
    // 構成するコンポーネントは以下
    // selector そのコンポーネントが他のHTMLから参照されるときのタグ名になる。
    //   上の例では、<app-xxx></app-xxx>と記述すれば、このコンポーネントが表示される。
    // templateUrl 	そのコンポーネントを構成するHTMLのパスを記述する。
    // styleUrls そのコンポーネントに適用するスタイルシートのパスを記述する。
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
//  export class以下でそのコンポーネントのクラスを定義
export class NavbarComponent implements OnInit {
  private toggleButton: any
  private sidebarVisible: boolean

  constructor(
      public location: Location, 
      private element : ElementRef,
      public auth: AuthService
      ) {
      this.sidebarVisible = false
  }
//   ngOnInit: ngOnInitはcomponent作成後に呼び出されます
//    参考：　　constructorは、component作成途中で実行
  ngOnInit() {
      const navbar: HTMLElement = this.element.nativeElement
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0]
  }
  sidebarOpen() {
      const toggleButton = this.toggleButton
      const html = document.getElementsByTagName('html')[0]
      // console.log(html);
      // console.log(toggleButton, 'toggle');

      setTimeout(function(){
          toggleButton.classList.add('toggled')
      }, 500)
      html.classList.add('nav-open')

      this.sidebarVisible = true
  }
  sidebarClose() {
      const html = document.getElementsByTagName('html')[0]
      // console.log(html);
      this.toggleButton.classList.remove('toggled')
      this.sidebarVisible = false
      html.classList.remove('nav-open')
  }
  sidebarToggle() {
      // const toggleButton = this.toggleButton;
      // const body = document.getElementsByTagName('body')[0];
      if (this.sidebarVisible === false) {
          this.sidebarOpen()
      } else {
          this.sidebarClose()
      }
  }
  isHome() {
    var titlee = this.location.prepareExternalUrl(this.location.path())
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 )
    }
      if( titlee === '/home' ) {
          return true
      }
      else {
          return false
      }
  }
  logout() {
      this.auth.logout()
  }
}
