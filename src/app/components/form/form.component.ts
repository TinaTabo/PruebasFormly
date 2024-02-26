import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from '../../core/data.service';
import { startWith, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

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
    cityId: 1
  }; //-- Esto es lo que hice con los icrc. Los JSON, son los modelos del formulario.
  fields: FormlyFieldConfig[] = [
    {
      key: 'id' //-- Este campo no se ve en el template pero si forma parte del objeto.
    },
    {
      key: 'firstname',
      type: 'input',
      templateOptions: {
        label: 'Firstname',
        required: true //-- Validadores, este indica que este campo es obligatorio.
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
  ];

  constructor(private dataService: DataService) {}

  onSubmit({valid, value}){
    console.log(value);
  }
}
