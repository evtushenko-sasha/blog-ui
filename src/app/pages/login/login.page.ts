import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginCredentials} from '../../model/LoginCredentials';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginFormGroup: FormGroup;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder) {
    this.loginFormGroup = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  logForm() {
    console.log(this.loginFormGroup.value);

  }

  login() {

    const loginCredentials: LoginCredentials = this.loginFormGroup.value;
    this.authService.login(loginCredentials);
  }
}
