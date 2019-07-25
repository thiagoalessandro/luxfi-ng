import {ServiceApiBase} from './service-api-base';
import {FormBase} from './form-base';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

export abstract class FormApiBase<T extends Object, S extends ServiceApiBase<T>> extends FormBase<T, S> {

  constructor(formBuilder: FormBuilder,
              service: S,
              router: Router,
              location: Location,
              route: ActivatedRoute) {
    super(formBuilder,
      service,
      router,
      location,
      route);
  }

  public loadValidateAttributes() {
    if (this.getGenerateValidatorAttributes()) {
      this.getService().getValidateAttributes().subscribe(listValidateAttribute => {
        this.initForm();
        listValidateAttribute.forEach(validateAttribute => {
          if (validateAttribute.validateType === 'REQUIRED') {
            this.addFormControlValidator(validateAttribute.group, validateAttribute.field, [Validators.required]);
          }
        });
      });
    }
  }

  public loadFormData(id: string) {
    this.getService().getById(id).subscribe(value => {
      this.getForm().get(this.getFormGroupPost()).setValue(value);
    });
  }

}
