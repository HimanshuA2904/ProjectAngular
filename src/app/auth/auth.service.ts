import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

//const apiUrl = 'http://localhost:3000/api/auth/';

const apiUrl = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output( ) isLoggedIn: EventEmitter<any> = new EventEmitter();
  
  loggedInStatus = false;
  redirectUrl: string;

  constructor(private http: HttpClient) { }

  login(data:any): Observable<any>  {
    return this.http.post(apiUrl+'admin_login', data )
    .pipe(
      tap(_ => {
        this.isLoggedIn.emit(true);
        this.loggedInStatus = true;
      }),
      catchError(this.handleError('login Sucess', []))
    ); 
  }
  logout(){
      return this.http.post(apiUrl+'logout',{})
      .pipe(
        tap(_ =>{
              this.isLoggedIn.emit(false);
              this.loggedInStatus=false;
        }),
        catchError(this.handleError('logout', []))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
  
}
