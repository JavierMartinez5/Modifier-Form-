import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export interface Options {
  name: string
  price: number
  sort: number

}

export interface ModifireData {
  name: string
  isSize: boolean
  options: Options[]
}

@Component({
  selector: 'app-edit-modifier-page',
  templateUrl: './edit-modifier-page.component.html',
  styleUrls: ['./edit-modifier-page.component.scss']
})
export class EditModifierPageComponent implements OnInit {
  public form!: FormGroup
  displayedColumns: string[] = ['OptionName', 'AdditionalCost'];
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('Pizza size', [Validators.required]),
      isSize: new FormControl(''),
      modifierName: new FormControl(''),
      modifierPrice: new FormControl(''),
      options: new FormArray([], [Validators.required])
    })
  }

  get formOptions(): FormArray {
    return this.form.get('options') as FormArray;
  }

  public addMoficatorGroup() {
    const modificatorGroup = new FormGroup({
      name: new FormControl(this.form.get('modifierName')?.value, [Validators.required]),
      price: new FormControl(this.form.get('modifierPrice')?.value, [Validators.required]),
      sort: new FormControl(this.formOptions.controls.length + 1),
    });
    const modificatorGroups = this.form.get('options') as FormArray
    modificatorGroups.push(modificatorGroup)

    this.form.get('modifierName')?.setValue('')
    this.form.get('modifierPrice')?.setValue('')
  }

  public submit(): void {
    const submitedData: ModifireData = {
      name: this.form.get('modifierName')?.value,
      isSize: this.form.get('modifierPrice')?.value,
      options: this.form.get('options')?.value
    }
    console.log('submitedData :', submitedData)
  }

  public deleteMoficatorGroup(sortModificatorGroup: number) {
    const filteredModificatorGroups = this.formOptions.controls.filter((control) => {
      return control.get('sort')?.value !== sortModificatorGroup
    })
    const newFormGroup = new FormGroup({
      name: new FormControl(this.form.get('name')?.value, [Validators.required]),
      isSize: new FormControl(this.form.get('isSize')?.value, [Validators.required]),
      modifierName: new FormControl(this.form.get('modifierName')?.value, [Validators.required]),
      modifierPrice: new FormControl(this.form.get('modifierPrice')?.value, [Validators.required]),
      options: new FormArray(filteredModificatorGroups, [Validators.required])
    })
    this.form = newFormGroup
  }


}
