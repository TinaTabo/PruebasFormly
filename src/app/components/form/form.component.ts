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
    },
    {
      key: 'age',
      type: 'input',
      templateOptions: {
        type: 'number', //-- Aqui podemos modificar el tipo de input, por defecto es text (cuando no ponemos nada)
        label: 'Age'
      }
    }
  ];

  onSubmit({valid, value}){
    console.log(value);
  }
}
