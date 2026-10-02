import { HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export function authInterceptor(req:HttpRequest<any> , next:HttpHandlerFn)
{
     const token = localStorage.getItem('token');
     if(token)
     {
        const clonedReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next(clonedReq).pipe(
            tap({
                next: (event) => {
                    if(event.type === HttpEventType.Response) {
                        console.log('Request successful:', event);
                    }
                }
            })
        );
     }
        else
        {
            return next(req);
        }

}