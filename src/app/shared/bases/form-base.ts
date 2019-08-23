import {NavService} from '../../core/services/nav.service';
import {FormBuilder, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {CommomBase} from './commom-base';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ServiceApiBase} from './service-api-base';
import {AfterViewInit, OnInit} from '@angular/core';
import {MessagesProduce} from '../../core/produces/messagesProduce';

export abstract class FormBase<T, S extends ServiceApiBase<T>> extends CommomBase implements OnInit, AfterViewInit {

  private form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private service: S,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute) {
    super();
    this.initForm();
    this.loadValidateAttributes();
  }

  ngOnInit(): void {
    this.beforeOnInit();
    this.onInit();
    this.afterOnInit();
  }

  public onInit(): void {
  }

  public afterOnInit(): void {
  }

  public beforeOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.afterViewInit();
  }

  afterViewInit(): void {
  }

  public initForm(): void {
    this.initFormGroup();
    this.initFormData();
  }

  public submit() {
    this.service.postJson(this.getFormDataJson())
      .subscribe(
        response => this.afterSubmitSuccess()
      );
  }

  public isFormValid(): boolean {
    return this.form.valid;
  }

  public onSubmit() {
    if (this.form.valid) {
      this.submit();
    } else {
      console.log('formulário invalido');
    }
  }

  public onReset() {
    this.form.reset();
    return false;
  }

  public goBack() {
    this.location.back();
  }

  public getFormGroupPost() {
    return NavService.getSplitPath(this.router.url)[0];
  }

  public initFormGroup() {
    this.form = this.formBuilder.group({});
  }

  public initFormData() {
    this.newFormData();
    const id = this.getRoute().snapshot.queryParams['id'];
    if (id !== undefined) {
      this.loadFormData(id);
    }
  }

  public abstract newFormData();

  public abstract loadFormData(id: string);

  public getForm() {
    return this.form;
  }

  public getFormBuilder() {
    return this.formBuilder;
  }

  public addFormControl(controlName: string, value: string, validators: ValidatorFn[]) {
    this.getForm().addControl(controlName, new FormControl(value, validators));
  }

  public addFormGroup(controlName: string, group: any) {
    this.getForm().addControl(controlName, this.getFormBuilder().group(group));
  }

  public addFormControlValidator(groupName: string, controlName: string, validators: Array<ValidatorFn>) {
    if (groupName) {
      const group = <FormGroup>this.form.controls[groupName];
      group.controls[controlName].setValidators(validators);
    } else {
      this.form.controls[controlName].setValidators(validators);
    }
  }

  public setValueFormControl(groupName: string, controlName: string, value: any) {
    const group = <FormGroup>this.form.controls[groupName];
    group.controls[controlName].setValue(value);
  }

  public afterSubmitSuccess() {
    MessagesProduce.publish('Operação realizada com sucesso!');
    const splitUrl = NavService.getSplitPath(this.router.url);
    this.router.navigate([splitUrl[0], 'cons']);
  }

  public getFormDataJson(): string {
    let body = this.form.value;
    if (this.getFormGroupPost() != null) {
      body = this.form.get(this.getFormGroupPost()).value;
    }
    body = JSON.stringify(body);
    return body;
  }

  public getFormData() {
    let body = this.form.value;
    if (this.getFormGroupPost() != null) {
      body = this.form.get(this.getFormGroupPost()).value;
    }
    return body;
  }

  public getService(): S {
    return this.service;
  }

  public getRouter(): Router {
    return this.router;
  }

  public getRoute(): ActivatedRoute {
    return this.route;
  }

  public getGenerateValidatorAttributes(): boolean {
    return true;
  }

  public abstract loadValidateAttributes();

  public createInstance<T>(c: new () => T): T {
    return new c();
  }

  public disableForm() {
    const operation = NavService.getSplitPath(this.router.url)[1];
    if (operation.search('visu') !== -1) {
      return true;
    }
    return false;
  }

}
