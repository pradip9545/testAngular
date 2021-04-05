import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders,  HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
   HttpApi = "http://localhost:4000/api";
   headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  // Get Users
  getUsers() {
    return this.http.get(`${this.HttpApi}/getUsers`)
  }
   // Create User
   addUser(formValue): Observable<any> {
     console.log(formValue)
     var formData: any = new FormData();
     formData.append("firstName", formValue.firstName);
    formData.append("lastName", formValue.lastName);
    formData.append("email", formValue.email);
    formData.append("phone", formValue.phone);
    formData.append("profile", formValue.profile);
    console.log(JSON.stringify(formData));
     formData.forEach((value,key) => {
      // console.log(key+" "+value)
    });
    return this.http.post(`${this.HttpApi}/create`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }
  // delete User
  deleteUser(id): Observable<any> {
  return this.http.delete(`${this.HttpApi}/deleteUser/${id}`, );
  }
  updateUser(formValue) {
    var formData: any = new FormData();
    formData.append("firstName", formValue.firstName);
   formData.append("lastName", formValue.lastName);
   formData.append("email", formValue.email);
   formData.append("id", formValue.id);
   formData.append("phone", formValue.phone);
   formData.append("profile", formValue.profile);
   return this.http.post(`${this.HttpApi}/update`, formData, {
    reportProgress: true,
    observe: 'events'
  })
  }
}
