import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
 
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    users: any[];

    constructor() { 
        console.log("constructor interceptor");
        this.users = [];
        this.users.push({username:"vane", password: "pato"});
        this.users.push({username:"lean", password: "nopato"});
        console.log("users created by me " + this.users);
        localStorage.setItem('users', JSON.stringify(this.users));
    }
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        console.log("method intercep");
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        console.log("users from localStorage" + users);
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
 
            // authenticate
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    console.log(user);
                    return user.username === request.body.username && user.password === request.body.password;
                });
 
                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    let body = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    };
 
                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request

                    //users.push(request.body);
                    //localStorage.setItem('users', JSON.stringify(users));
                    console.log("credenciales incorrectas");
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }
 
            // pass through any requests not handled above
            return next.handle(request);
             
        }))
 
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}
 
export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};