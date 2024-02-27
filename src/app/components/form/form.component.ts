import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from '../../core/data.service';
import { startWith, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';


const formlyRow = (fieldConfig: FormlyFieldConfig[]) => {
  return{
    fieldGroupClassName: 'display-flex',
    fieldGroup: fieldConfig
  }
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  form = new FormGroup({});
  model = {
    id: uuidv4(),
    firstname: 'Juri',
    age: 34,
    nationId: 2,
    cityId: 1,
    ip: null
  }; //-- Esto es lo que hice con los icrc. Los JSON, son los modelos del formulario.
  fields: FormlyFieldConfig[] = [
    {
      key: 'id' //-- Este campo no se ve en el template pero si forma parte del objeto.
    },
    formlyRow([
      {
        key: 'firstname',
        type: 'input',
        className: 'flex-3',
        templateOptions: {
          label: 'Firstname',
          required: true //-- Validadores, este indica que este campo es obligatorio.
        }
      },
      {
        key: 'age',
        type: 'input',
        className: 'flex-1',
        templateOptions: {
          type: 'number', //-- Aqui podemos modificar el tipo de input, por defecto es text (cuando no ponemos nada)
          label: 'Age',
          min: 18
        },
        validation: { //-- Aunque tengamos validadores generales desde app.module.ts, en ocasiones para el mismo tipo de validación podemos querer un mensaje deferente. De esta manera sobrescribimos el mensaje general por une personalizado a este input.
          messages: {
            min: 'Sorry, you have to be older than 18'
          }
        }
      }
    ]),
    formlyRow([
      {
        key: 'nationId',
        //type: 'my-autocomplete', //-- Tipo creado con ng-select.
        type: 'select',
        className: 'flex-3',
        templateOptions: {
          label: 'Nation',
          options: this.dataService.getNations()
        }
      },
      {
        key: 'cityId',
        type: 'select',
        className: 'flex-3',
        templateOptions: {
          label: 'Cities',
          options: []
        },
        expressionProperties: { //-- Este campo se utiliza para crear condiciones. En este caso se crea la condición de que debe haber seleccionado un pais para poder utilizar el input de ciudades, sino este se queda deshabilitado.
          'templateOptions.disabled': (model) => !model.nationId,
          'model.cityId': '!model.nationId ? null : model.cityId' //-- Con esto tb queda actualizado el modelo, si no hay una ciudad seleccionada, no se asigna cityId al modelo.
        },
        hideExpression: '!model.nationId', //-- Esconde el input cities si no se ha seleccionado un pais.
        hooks: { //-- Esta función sirve para constrolar los ciclos de ejecución, y en este caso sirve para mostrar las ciudades de la lista dependiendo del pais seleccionado.
          onInit: (field: FormlyFieldConfig) => {
            field.templateOptions.options = field.form.get('nationId').valueChanges.pipe(
              startWith(this.model.nationId),
              switchMap(nationId => this.dataService.getCities(nationId))
            )
          }
        }
      }
    ]),
    formlyRow([
      {
        key: 'ip',
        type: 'input',
        className: 'flex-6',
        templateOptions: {
          label: 'IP Address',
          required: true
        },
        validators: {
          validation: ['ip']
        }
      }
    ])
  ];

  constructor(private dataService: DataService) {}

  onSubmit({valid, value}){
    console.log(value);
  }
}
