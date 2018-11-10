import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded'
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  host = 'http://localhost:8080';

  
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    console.log("auth service");
    const formData = 
      "username="+username+"&password="+password
      ;
    return this.http.post<any>(this.host + '/login', formData, httpOptions)
        .pipe(map(user => {
          console.log("auth service");
            // login successful if there's a jwt token in the response
            if (user) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }

            return user;
        }));
}

logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
}
}
