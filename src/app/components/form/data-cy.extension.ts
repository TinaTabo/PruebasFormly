import { FormlyExtension, FormlyFieldConfig } from "@ngx-formly/core";


export const dataCyExtension: FormlyExtension = {
    prePopulate(field: FormlyFieldConfig) {
        if (typeof field.key === 'string' || typeof field.key === 'number') {
            field.templateOptions = {
                ...(field.templateOptions || {}),
                attributes: {
                    'data-cy': field.key
                }
            }
        }
    }
}