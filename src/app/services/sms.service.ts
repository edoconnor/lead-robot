import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SmsService {
  private apiUrl = 'https://portfolio-backend-2jmg.onrender.com/sms/send';

  constructor(private http: HttpClient) {}

  sendSms(to: string, message: string): Observable<any> {
    return this.http.post(this.apiUrl, { to, body: message });
  }
}
