import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { emailValidator } from "../custom-validators/email-validator";
import { EmailBlacklistService } from "../custom-validators/services/email-blacklist.service";
import { asyncEmailValidatorDep } from "../custom-validators/async-email-validator-dep";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;

  constructor(private emailBlackListService: EmailBlacklistService) {}

  ngOnInit() {
    this.CreateFormControls();
    this.CreateForm();
  }

  CreateFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);

    this.email = new FormControl('', [Validators.required, emailValidator], asyncEmailValidatorDep(this.emailBlackListService));

    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  }

  CreateForm() {
    this.loginForm = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName
      }),
      email: this.email,
      password: this.password
    });
  }

  onSubmit() {
    if(this.loginForm.valid){
      console.log('Submit');
      console.log(this.loginForm.value);
    }
  }
}
