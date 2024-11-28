import { Injectable } from '@angular/core';
import { getDatabase, ref, set, onValue } from 'firebase/database';

export interface ICar {
  brand: string;
  model: string;
  licensePlateNumber: string;
  frontCarViewPictureBase64: string;
  backCarViewPictureBase64: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() {
  }

  public saveCar(car: ICar): Promise<void> {
    return set(ref(getDatabase(), 'cars/' + car.brand + car.model + car.licensePlateNumber), {
      brand: car.brand,
      model: car.model,
      licensePlateNumber: car.licensePlateNumber,
      frontCarViewPictureBase64: car.frontCarViewPictureBase64,
      backCarViewPictureBase64: car.backCarViewPictureBase64,
    });
  }

  public getCar(id: string): Promise<ICar> {
    return new Promise((resolve, reject) => {
      const carRef = ref(getDatabase(), 'cars/' + id);
      onValue(carRef, (snapshot) => {
        const data = snapshot.val();
        const car: ICar = data as ICar;
        resolve(car);
      });
    });
  }

  public getAllCars(): Promise<ICar[]> {
    return new Promise((resolve, reject) => {
      const carRef = ref(getDatabase(), 'cars/');
      onValue(carRef, (snapshot) => {
        const data = snapshot.val();
        const cars: ICar[] = [];
        Object.entries(data).forEach(value => {
          cars.push(value[1] as ICar);
        });
        resolve(cars);
      });
    });
  }
}
