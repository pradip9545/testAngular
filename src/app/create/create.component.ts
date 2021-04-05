import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {FileuploadService} from '../services/fileupload.service'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers:[FileuploadService]
})
export class CreateComponent implements OnInit {
 form : FormGroup;
 emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
 phonePattern = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  constructor(public fb: FormBuilder,public router: Router, private fileupload:FileuploadService) { 
    
    this.form = this.fb.group({
      firstName: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required, Validators.pattern(this.emailPattern)]),
      phone: new FormControl('',[Validators.required, Validators.pattern(this.phonePattern)]),
      profile: [null]
    })
  }

  ngOnInit() {
  }
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file)
    this.form.patchValue({
      profile: file
    });
    this.form.get('profile').updateValueAndValidity()

    
  }
  submitForm() {
    // console.log(this.form.value);
    this.fileupload.addUser(this.form.value).subscribe(res =>{
      this.router.navigate(['users-list'])
       },err =>{
         console.log(err)
       })
  }
}
