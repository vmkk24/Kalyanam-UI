import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  data: any;
  firstName: String;
  email: any;
  mobileNo: number;
  password: String;
  confirmPassword: String;
age: number;
lastName: String;
address: any;
dateOfBirth: Date;
gender: String;
motherTongue: String;


  
  membershipType = ['Premium', 'Classic']
  maritalStatus = ['Single', 'Married', 'Divorced']
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private route:Router,
      private http:HttpClient,
      private fb: FormBuilder
  ) { 

  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstName: [''],
          lastName: [''],
          mobileNo: ['', [Validators.required, Validators.minLength(10)]],
          age: [''],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
          address: [''],
          dateOfBirth: ['', Validators.required],
          gender: ['', Validators.required],
          motherTongue: ['', Validators.required],
          membershipType: ['Classic'],
          maritalStatus: ['Single']
      });
    

  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      console.log(this.registerForm);
      var reqObj = {
         "firstName": this.registerForm.value.firstName,
         "email": this.registerForm.value.email,
         "mobileNo" :this.registerForm.value.mobileNo,
         "password" : this.registerForm.value.password,
         "confirmPassword" : this.registerForm.value.confirmPassword,
         "age" : parseInt(this.registerForm.value.age),
         "lastName" : this.registerForm.value.lastName,
         "address" : this.registerForm.value.address,
         "dateOfBirth" : this.registerForm.value.dateOfBirth,
         "gender" : this.registerForm.value.gender,
         "maritalStatus": this.registerForm.value.maritalStatus,
         "membershipType": this.registerForm.value.membershipType,
         "motherTongue": this.registerForm.value.motherTongue,
      };
    
    this.http.post('http://10.117.189.99:9800/matrimony/api/register', reqObj).subscribe((response) => {
        if (response) {
            this.data = response;
            alert(response['message'])
              this.firstName = this.data.firstName;
              this.email = this.data.email;
              this.mobileNo = this.data.mobileNo;
              this.password = this.data.password;
              this.confirmPassword = this.data.confirmPassword;
              this.age = this.data.age;
              this.lastName = this.data.lastName;
              this.address = this.data.address;
              this.dateOfBirth = this.data.dateOfBirth;
              this.gender = this.data.gender;
              this.maritalStatus = this.data.maritalStatus;
              this.membershipType = this.data.membershipType;
              this.motherTongue = this.data.motherTongue;
              this.route.navigate(['/login']);
        }
      
        console.log(this.registerForm);
        
        
    }, err=> {
      console.log(err);
      alert(err)
    });

  }
  
}
