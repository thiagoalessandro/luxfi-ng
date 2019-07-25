import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginDto} from '../dto/login.dto';
import {AuthenticationService} from '../services/authentication.service';
import {Location} from '@angular/common';
import {FormApiBase} from '../../shared/bases/form-api-base';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormApiBase<LoginDto, AuthenticationService> {

  returnUrl: string;
  hide: boolean = true;

  constructor(formBuilder: FormBuilder,
              authenticationService: AuthenticationService,
              route: ActivatedRoute,
              router: Router,
              location: Location) {
    super(formBuilder,
      authenticationService,
      router,
      location,
      route);
  }

  onInit(): void {
    this.setValueFormControl(this.getFormGroupPost(), 'grant_type', this.getService().getGrantType());
    this.returnUrl = this.getRoute().snapshot.queryParams['returnUrl'] || '/';
  }

  public newFormData() {
    const loginDto = new LoginDto();
    this.addFormGroup(this.getFormGroupPost(), loginDto);
    this.addFormControlValidator(this.getFormGroupPost(), 'username', [Validators.required]);
    this.addFormControlValidator(this.getFormGroupPost(), 'password', [Validators.required]);
    this.addFormControlValidator(this.getFormGroupPost(), 'grant_type', null);
  }

  public submit() {
    this.getService().login(this.getFormData(), this.getRouter(), this.returnUrl);
  }

  public getGenerateValidatorAttributes(): boolean {
    return false;
  }

  public getFormGroupPost() {
    return 'login';
  }

}
