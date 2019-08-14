import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  userId: any;
  returnUrl: string;
  data1: any;
  loginId: any;
  password: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: Router,
    private http: HttpClient) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      mobileNo: ['', Validators.required],
      password: ['', Validators.required]
  });

  }

//   goto() {
//     this.route.navigate(['/accsummary']);

// }
// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

onSubmit() {
    console.log("in submit")
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;

    console.log(this.loginForm);
    var obj = {
        "mobileNo": this.loginForm.value.mobileNo,
        "password": this.loginForm.value.password
    };
// var obj1=
//   {
//     "mobileNo": "9876653219",
//     "password": "ajith"
//   }

    this.http
        .post("http://13.235.0.159:9800/matrimony/api/login", obj)
        .subscribe((res: Response) => {
            console.log(res);
            alert(res['message'])
            sessionStorage.setItem("userId", res['userId']);
            this.route.navigate(['/dashboard']);

        }, (err) => {
            console.log(err)
            alert(err.message);
        });

}
}
