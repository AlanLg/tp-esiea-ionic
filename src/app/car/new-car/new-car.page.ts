import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { addIcons } from "ionicons";
import { caretBack } from "ionicons/icons";
import { CarService, ICar } from "../../core/services/car/car.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.page.html',
  styleUrls: ['./new-car.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class NewCarPage implements OnInit {
  public carForm = new FormGroup({
    brand: new FormControl('', [Validators.required, Validators.minLength(2)]),
    model: new FormControl('', [Validators.required, Validators.min(2)]),
  })

  constructor(private carService: CarService, private router: Router) {
    addIcons({caretBack})
  }

  ngOnInit() {
  }

  public onSave(): void {
    this.carService.saveCar(this.carForm.value as unknown as ICar)
      .then(() => {
      this.router.navigate(['/cars']);
    }).catch((error) => {
      console.log(error);
    })
  }
}
