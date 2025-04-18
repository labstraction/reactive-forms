import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { allUpperValidator, startsByA } from '../../validators/alluppervalidator';


@Component({
  selector: 'app-big-form',
  imports: [ReactiveFormsModule],
  templateUrl: './big-form.component.html',
  styleUrl: './big-form.component.scss'
})
export class BigFormComponent {


  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    dateOfBirth: new FormControl(),
    placeOfBirth: new FormControl(''),
    taxCode: new FormControl('',[Validators.required, allUpperValidator(), startsByA]),
    addresses: new FormArray([])

  })

  get addresses(){
    return this.myForm.get('addresses') as FormArray
  }

  addAddress() {
    
    const addressGroup = new FormGroup({
      street: new FormControl('', [Validators.required]),
      city: new FormControl(''),
      code: new FormControl('')
    })
    this.addresses.push(addressGroup)
  }

  removeAddress(i: number) {
    //const addressesArray = this.myForm.get('addresses') as FormArray;
    this.addresses.removeAt(i);
  }
    

  submitForm() {
    if (this.myForm.valid) {
      console.log(this.myForm)
    } else {
      for (const key in this.myForm.controls) {
        if (Object.prototype.hasOwnProperty.call(this.myForm.controls, key)) {
          const element = this.myForm.get(key);
          console.log(key ,element?.errors)
        }
      }
    }
  }

}
