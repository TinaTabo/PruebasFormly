import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormComponent } from './components/form/form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgSelectFormlyComponent } from './components/form/ng-select.type';

//-- Funciones de validación. Estas funciones las creamos personalizadas nosotros.
export function minValidationMessage(err, field: FormlyFieldConfig) {
  return `Please provide a value bigger than ${err.min}. You provided ${err.actual}`;
}

export function ipValidationMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" is not a valid IP address`
}

export function IpValidator(control: FormControl): ValidationErrors {  //-- Función para validar una dirección IP.
  return !control.value || /(\d{1,3}\.){3}\d{1,3}/.test(control.value) ? null : {'ip': true};
}

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    NgSelectFormlyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormlyModule.forRoot({
      validators: [
        {
          name: 'ip',
          validation: IpValidator
        }
      ],
      validationMessages: [ //-- Aquí creamos las distintas validaciones con sus respectivos mensajes.
        {
          name: 'required',
          message: 'This field is required'
        },
        {
          name: 'min',
          message: minValidationMessage //-- Llamada a la función personalizada.
        },
        {
          name: 'ip',
          message: ipValidationMessage
        }
      ],
      types: [
        {
          name: 'my-autocomplete',
          component: NgSelectFormlyComponent
        }
      ]
    }),
    FormlyBootstrapModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
