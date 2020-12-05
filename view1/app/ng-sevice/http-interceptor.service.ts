import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {NzMessageService} from 'ng-zorro-antd';
import {LocalService} from './local.service';
import {Router} from '@angular/router';
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(
        private message: NzMessageService,
        private local: LocalService,
        private router: Router,
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    if (event.body && ([20003, 20002, 20001, 20000, 20004, 20005, 20006, 10004, 10007, 10008, 10009].some(item => item === event.body.code))) { // 登录
                        this.message.create('error', event.body.message);
                        this.local.clearLoacl('token');
                        return this.router.navigate(['/login'], {
                            queryParams: { url: encodeURIComponent(window.location.href)}
                        });
                    }
                } else if (event instanceof HttpErrorResponse) {
                    this.message.create('error', event.status + event.statusText);
                }
            })
        );
    }
}
