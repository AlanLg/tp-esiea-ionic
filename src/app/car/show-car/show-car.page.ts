import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {ActivatedRoute, Router} from "@angular/router";
import {CarService, ICar} from "../../core/services/car/car.service";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-show-car',
  templateUrl: './show-car.page.html',
  styleUrls: ['./show-car.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ShowCarPage implements OnInit {

  public car: ICar | undefined;

  constructor(private route: ActivatedRoute, private carService: CarService) {
    let id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.carService.getCar(id).then(value => {
        this.car = value;
      });
    }
  }

  ngOnInit() {
  }

  public getFrontPicture() {
    return "data:image/jpeg;base64," + this.car?.frontCarViewPictureBase64
  }

  public getBackPicture() {
    return "data:image/jpeg;base64," + this.car?.backCarViewPictureBase64
  }

}
