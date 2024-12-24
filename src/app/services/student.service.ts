import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = environment.apiUrl;
  requestOption: any = null;

  constructor(private http: HttpClient) {
    this.requestOption = {
      responseType: 'json',
      observe: 'response'
    }
  }


  getAllStudents(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'student/getAllStudents');
  }
}
