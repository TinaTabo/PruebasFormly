import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from '../../core/data.service';
import { startWith, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';


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
  fields: FormlyFieldConfig[] = [];

  constructor(private dataService: DataService, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<FormlyFieldConfig[]>('../../../assets/dynamic-form.json')
      .subscribe(fields => {
        this.fields = fields;
      })
  }

  onSubmit({valid, value}){
    console.log(value);
  }
}
