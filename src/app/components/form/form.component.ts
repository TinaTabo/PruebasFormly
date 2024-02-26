import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  form = new FormGroup({});
  model = {
    firstname: 'Juri',
    age: 34
  }; //-- Esto es lo que hice con los icrc. Los JSON, son los modelos del formulario.
  fields: FormlyFieldConfig[] = [
    {
      key: 'firstname',
      type: 'input',
      templateOptions: {
        label: 'Firstname'
      }
    }
  ];

  onSubmit({valid, value}){
    console.log(value);
  }
}
