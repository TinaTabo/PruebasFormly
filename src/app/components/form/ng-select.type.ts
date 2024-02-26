// ng-select-type.component.ts

import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
    selector: 'formly-ng-select',
    template: `
        <div class="form-group">
            <label>{{ to.label }}</label>
            <div class="input-group">
                <ng-select
                    [items]="to.options | async"
                    [bindValue]="to.bindValue || 'value'"
                    [formControl]="formControl"
                    [class.is-invalid]="showError"
                    [ngClass]="{'form-control': true, 'is-invalid': showError}"
                >
                </ng-select>
            </div>
        </div>
    `
})
export class NgSelectFormlyComponent extends FieldType {}
