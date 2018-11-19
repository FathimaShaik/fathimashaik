import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthserviceService} from './authservice.service'
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector ) { }
  intercept(req, next) {

let authserviceService = this.injector.get(AuthserviceService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization:`Bearer ${authserviceService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
