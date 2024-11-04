import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { addIcons } from "ionicons";
import { addCircle } from "ionicons/icons";
import { Router } from "@angular/router";
import { CarService, ICar } from "../core/services/car/car.service";

@Component({
  selector: 'app-car',
  templateUrl: './car.page.html',
  styleUrls: ['./car.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class CarPage implements OnInit {
  public cars: ICar[] = [];

  constructor(private router: Router, private carService: CarService) {
    addIcons({addCircle})
  }

  ngOnInit() {
    this.carService.getAllCars()
      .then((cars: ICar[]) => {
        console.log('On Init')
        this.cars = cars;
      });
  }

  ionViewWillEnter() {
    this.carService.getAllCars()
      .then((cars: ICar[]) => {
        console.log('On View Will Enter')
        this.cars = cars;
      });
  }

  public goToNewCarPage(): void {
    this.router.navigate(['/cars/new']);
  }
}
