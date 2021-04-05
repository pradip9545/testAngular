import { Component, OnInit } from '@angular/core';
import {FileuploadService} from '../services/fileupload.service';
import { DomSanitizer} from '@angular/platform-browser';
import {FormBuilder, FormGroup,Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  usersArray = [];
  bln_hide_detail =false;
  form : FormGroup;
  constructor(private fileService?:FileuploadService,private sanitizer?:DomSanitizer, public router?:Router,
    public fb?: FormBuilder,) {
      this.form = this.fb.group({
        id:new FormControl(''),
        firstName: new FormControl('',Validators.required),
        lastName: new FormControl('',Validators.required),
        email: new FormControl('',Validators.required),
        phone: new FormControl('',Validators.required),
        profile: [null]
      })
   }

  ngOnInit() {
   this.getUser();
  }
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file)
    this.form.patchValue({
      profile: file
    });
    this.form.get('profile').updateValueAndValidity()

    
  }
  getUser () {
    this.fileService.getUsers().subscribe((res:any) =>{
      if(res.message == 'success') {
        this.usersArray = res.users;
        console.log(this.usersArray);
      }
     
    }, err =>{
      console.log(err)
    })
  }
  deleteUser(user) {
    this.fileService.deleteUser(user._id).subscribe(res => {
      console.log('delete',res);
      this.getUser()
    })
  }
  editUser(user) {
    this.bln_hide_detail = true;
    this.form.patchValue({'firstName':user.firstName})
    this.form.patchValue({'lastName':user.lastName})
    this.form.patchValue({'email':user.email})
    this.form.patchValue({'phone':user.phone})
    this.form.patchValue({'id':user._id})

  
  }
  submitForm() {
    this.fileService.updateUser(this.form.value).subscribe(res =>{
      this.bln_hide_detail =false;
     this.getUser();
       },err =>{
         console.log(err)
       })
  }
}

