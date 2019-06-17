import { NavService } from '../../core/services/nav.service';
import { ServiceBase } from 'src/app/shared/bases/service-base';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, ValidatorFn, FormControl } from '@angular/forms';
import { CommomBase } from './commom-base';
import { Router } from '@angular/router';

export abstract class FormBase<T, S extends ServiceBase<T>> extends CommomBase{

    form: FormGroup;

    constructor(snackBar: MatSnackBar,
                private formBuilder: FormBuilder,
                private service: S,
                private router: Router){
        super(snackBar);
        this.initFormGroup();
        this.initFormData();
    }

    public submit(){        
        var body = this.form.value;        
        if(this.getFormGroupPost() != null ){
            body = this.form.get(this.getFormGroupPost()).value;
        }        
        body = JSON.stringify(body);        
        this.service.post(body).then(response => {
            this.afterSubmitSuccess();
        }).catch((e) => this.handleError(e));
    }

    public isFormValid(): boolean{
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

    public getFormGroupPost() {
        return null;
      }
    
    public initFormGroup(){
        this.form = this.formBuilder.group({}) 
    }
    
    public abstract initFormData();

    public getFormGroup(){
        return this.form;
    }

    public getFormBuilder(){
        return this.formBuilder;
    }

    public addFormControl(controlName: string, value: string, validators: ValidatorFn[]){
        this.getFormGroup().addControl(controlName, new FormControl(value, validators));
    }

    public addFormGroup(controlName: string, group: any){
        this.getFormGroup().addControl(controlName, this.getFormBuilder().group(group));
    }
    
    public addFormControlValidator(groupName: string, controlName: string, validators: Array<ValidatorFn>){    
        if(groupName){
            const group = <FormGroup>this.form.controls[groupName];
            group.controls[controlName].setValidators(validators);    
        }else{  
            this.form.controls[controlName].setValidators(validators);   
        }
    }

    public afterSubmitSuccess(){
        var splitUrl = NavService.getSplitPath(this.router.url);
        this.router.navigate([splitUrl[0],'consultar']);
    }

}