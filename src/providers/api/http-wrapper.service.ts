import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpClientWrapperService {

    constructor(private http: HttpClient) {
    }

    baseUrl: string = "http://localhost:50023/"

    blob<T>(body: T, url: string): Observable<Blob> {
        return this.http.post(url, body, { responseType: 'blob' });
    }

    get<T>(url: string): Observable<T> {
        return this.http.get<T>(this.baseUrl + url);
    }

    post<T, R>(body: T, url: string): Observable<R> {
        return this.http.post<R>(this.baseUrl + url, body);
    }

    delete<R>(url: string): Observable<R> {
        return this.http.delete<R>(this.baseUrl + url);
    }

    put<T, R>(body: T, url: string): Observable<R> {
        return this.http.put<R>(this.baseUrl + url, body);
    }

}