
// THIRD_PARTY
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap, catchError, finalize } from 'rxjs/operators';
// OUT_MODULE
import { environment } from 'src/environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  route: any;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    route: ActivatedRoute
  ) {
    this.route = route;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newReq;
    let isResponseOk = false;
    const token = localStorage.getItem('token');
    const methodMap = {
      POST: 'افزودن',
      PUT: 'ویرایش',
      DELETE: 'حذف'
    };
    let apiReq: any;
    apiReq = req.clone({
        url: `${environment.apiBaseUrl}${req.url}`
      });

    // Set header authorization except login api
    if (req.url !== 'Account/sign-in') {
      apiReq = apiReq.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    // Check url for use base url or not
    if (req.url.endsWith('.svg')) {
      newReq = req;
    } else {
      newReq = apiReq;
    }
    return next.handle(newReq).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          isResponseOk = true;
        }
      }),
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          try {
            if (err.error && err.error.Message) {
              this.toastr.error(err.error.Message, '');
            }
            if (err.status === 401) {
              // if (req.url == 'BrokerSurvey') {
              //   this.toastr.info('به منظور ثبت نظر ابتدا باید ثبت نام کنید', '');
              // } else {
              // this.router.navigate(['login'], { queryParams: { returnUrl: this.route.snapshot._routerState.url } });
              this.router.navigate(['login']);
              // }
              // this.router.navigate(['management/login'], { queryParams: { returnUrl: this.route.snapshot._routerState.url } });
              // this.router.navigate(['management/login']);
            }
            if (err.status === 403) {
              this.toastr.error('شما دسترسی مورد نظر را ندارید.', '');
            }
            if (err.status === 500) {
              if (err.error.Code === 400){
              }
              if (err.error.Code === 500){
                this.toastr.error('مشکلی در سامانه رخ داده است.', '');
              }
            }
          } catch (e) {

          }
        }
        return throwError(err);
      }),
      finalize(() => {
        const msg = `<span>
                        <span>عملیات</span>

                        <span>با موفقیت انجام شد.</span>
                    </span>`;
        if (isResponseOk &&
          req.url != 'Account/sign-in' &&
          req.url != 'Customer/activate-terminals' &&
          req.url != 'Customer/deactivate-terminals' &&
          (req.method == 'POST' || req.method == 'PUT' || req.method == 'DELETE')) {
          this.toastr.success(msg, '', { enableHtml: true });
        }
        if (req.url == 'BrokerSurvey/update') {
          this.toastr.success('به روز رسانی با موفقیت انجام شد.', '', { enableHtml: true });
        }
        if (req.url == 'Upload') {
          this.toastr.success('عملیات بارگزاری با موفقیت انجام شد.', '', { enableHtml: true });
        }
      })
    );
  }

}

