import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
import { VehicleCategory } from '../../../shared/types/tank-types';

@Component({
    selector: 'add-category-dialog',
    standalone: true,
    imports: [
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions
],
    templateUrl: './add-category-dialog.html',
    styleUrl: './add-category-dialog.scss'
})
export class AddCategoryDialog {
    readonly dialogRef = inject(MatDialogRef<AddCategoryDialog>)
    readonly data = inject<{ vehicleCategories: VehicleCategory[] }>(MAT_DIALOG_DATA)

    categoryForm: FormGroup = new FormGroup({
        name: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.maxLength(17)],
        }),
        priority: new FormControl(0, {
            validators: [
                Validators.required,
                this.uniquePriorityValidator(this.data.vehicleCategories)
            ]
        }),
    }, {
        updateOn: 'submit'
    });

    onSave() {
        if (this.categoryForm.invalid) {
            return
        }

        this.dialogRef.close(this.categoryForm.getRawValue());
    }

    uniquePriorityValidator(categories: VehicleCategory[]): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value

            if (value === null || value === undefined || value === '') {
                return null
            }

            const exists = categories.some(category => category.priority === value);
            return exists ? { duplicatePriority: true } : null;
        }

    }

    onCloseClick() {
        this.dialogRef.close()
    }
}