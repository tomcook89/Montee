import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:7204/api/'

  login(model: any){
    return this.http.post(this.baseUrl + 'account/login', model)
  }
}
