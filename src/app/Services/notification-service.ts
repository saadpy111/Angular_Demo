import { Service } from '@angular/core';
import { Observable } from 'rxjs';

@Service()
export class NotificationService {
      notifications: string[] = [
        'Welcome to our store!',
        'Check out our latest products!',
        'Don\'t miss our special offers!',
        'Discover the best deals today!',
        '',
        'Thank you for shopping with us!'
    ];
    constructor() {}
    
    getnoteifications(): Observable<string> {
        var observable = new Observable<string>((observer) => {
            let index = 0;

         let intervale = setInterval(() => {
                console.log('test');
                observer.next(this.notifications[index]);
                index = (index + 1);
                if (index >= this.notifications.length) {
                   observer.complete();
                }
                if(this.notifications[index] === ''){
                    observer.error("Empty notification encountered");
                }

            }, 2000);


            return {
                unsubscribe:() => {
                    console.log('Unsubscribed from notifications.');
                    clearInterval(intervale);
                }
            };

        });
        return observable;
    }
}

