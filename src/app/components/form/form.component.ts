import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from '../../core/data.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  form = new FormGroup({});
  model = {
    firstname: 'Juri',
    age: 34,
    nationId: 2,
    cityId: 1
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
    },
    {
      key: 'nationId',
      type: 'select',
      templateOptions: {
        label: 'Nation',
        options: this.dataService.getNations()
      }
    },
    {
      key: 'cityId',
      type: 'select',
      templateOptions: {
        label: 'Cities',
        options: []
      },
      expressionProperties: { //-- Este campo se utiliza para crear condiciones. En este caso se crea la condición de que debe haber seleccionado un pais para poder utilizar el input de ciudades, sino este se queda deshabilitado.
        'templateOptions.disabled': (model) => !model.nationId
      },
      hooks: { //-- Esta función sirve para constrolar los ciclos de ejecución, y en este caso sirve para mostrar las ciudades de la lista dependiendo del pais seleccionado.
        onInit: (field: FormlyFieldConfig) => {
          field.templateOptions.options = field.form.get('nationId').valueChanges.pipe(
            switchMap(nationId => this.dataService.getCities(nationId))
          )
        }
      }
    }
  ];

  constructor(private dataService: DataService) {}

  onSubmit({valid, value}){
    console.log(value);
  }
}
