import { Injectable } from '@angular/core';
import { getDatabase, ref, set, onValue } from 'firebase/database';

export interface ICar {
  brand: string;
  model: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() {
  }

  public saveCar(car: ICar): Promise<void> {
    return set(ref(getDatabase(), 'cars/' + car.model), {
      brand: car.brand,
      model: car.model,
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
