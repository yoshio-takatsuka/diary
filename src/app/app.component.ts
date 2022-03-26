
import { Component, OnInit, Inject, ElementRef, ViewChild, Renderer2 } from '@angular/core'; // https://angular.jp/api/core
import { Router, NavigationEnd } from '@angular/router';                                     // https://angular.jp/api/router
import { Subscription } from 'rxjs';    // 非同期の対応 https://angular.jp/guide/rx-library
import { filter } from 'rxjs/operators'
import { Location, DOCUMENT } from '@angular/common';
import { NavbarComponent } from './common/navbar/navbar.component';
import { DataService } from './app.data';
import { LoadingSpinnerComponent } from './common/spinner/loading-spinner.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private _router: Subscription;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;
    @ViewChild(LoadingSpinnerComponent) spinner: LoadingSpinnerComponent;
    // data: KamokuItem[];  // 科目一覧

    constructor(
        private renderer: Renderer2,
        private router: Router,
        @Inject(DOCUMENT,) private document: any,
        private element: ElementRef,
        public location: Location,
        @Inject(DataService) private dataService: DataService
    ) {
        // this.data = dataService.getKamokuData();
    }
    ngOnInit() {
        // 
        var navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
        this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
            if (window.outerWidth > 991) {
                window.document.children[0].scrollTop = 0;
            } else {
                window.document.activeElement.scrollTop = 0;
            }
            this.navbar.sidebarClose();
        });
        this.renderer.listen('window', 'scroll', (event) => {
            const number = window.scrollY;
            // スクロールを下げたらナブバーを消す。
            if (number > 150 || window.pageYOffset > 150) {
                // add logic
                navbar.classList.remove('navbar-transparent');
            }
            else {
                // remove logic
                navbar.classList.add('navbar-transparent');
            }
        });
        var ua = window.navigator.userAgent;
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            var version = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        if (version) {
            var body = document.getElementsByTagName('body')[0];
            body.classList.add('ie-background');

        }

    }
    removeFooter() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice(1);
        if (titlee === 'signup' || titlee === 'nucleoicons') {
            return false;
        }
        else {
            return true;
        }
    }
}
