import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import {caretBack} from "ionicons/icons";
import {CarService, ICar} from "../../core/services/car/car.service";
import {Router} from "@angular/router";
import {Camera, CameraResultType, CameraSource, Photo} from "@capacitor/camera";

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
    model: new FormControl('', [Validators.required, Validators.minLength(2)]),
    licensePlateNumber: new FormControl('', [
      Validators.required,
      Validators.pattern("^\\d{1,4} ?[A-Z]{1,3} ?\\d{2}$|^[A-Z]{2}?\\d{3}?[A-Z]{2}$")
    ]),
    frontPicturePath: new FormControl('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngplay.com%2Fwp-content%2Fuploads%2F8%2FUpload-Icon-Logo-PNG-Clipart-Background.png&f=1&nofb=1&ipt=9757b0520f844d91c08fb32b3b5c1ab3b6aad9a1e796c14cd9391212f71d214e&ipo=images', Validators.required),
    backPicturePath: new FormControl('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngplay.com%2Fwp-content%2Fuploads%2F8%2FUpload-Icon-Logo-PNG-Clipart-Background.png&f=1&nofb=1&ipt=9757b0520f844d91c08fb32b3b5c1ab3b6aad9a1e796c14cd9391212f71d214e&ipo=images', Validators.required)
  })

  // private storage = getStorage()
  private frontImage: Photo | null = null
  private backImage: Photo | null = null

  constructor(private carService: CarService, private router: Router) {
    addIcons({caretBack})
  }

  ngOnInit() {
  }


  public onSave(): void {
    console.log("saving")
    let car = this.carForm.value as unknown as ICar;

    car.frontCarViewPictureBase64 = <string>this.frontImage?.base64String
    car.backCarViewPictureBase64 = <string>this.backImage?.base64String

    console.log("car that is being saved " + car)

    this.carService.saveCar(car)
      .then(() => {
        console.log("navigating to /cars")
      this.router.navigate(['/cars']);
    }).catch((error) => {
      console.log(error);
    })
  }

  // async uploadImage(cameraFile: Photo) {
  //   const storageRef = ref(this.storage, 'images');
  //
  //   try {
  //     if (cameraFile.base64String != null) {
  //       await uploadString(storageRef, cameraFile.base64String, 'base64');
  //     }
  //     return await getDownloadURL(storageRef);
  //   } catch (e) {
  //     console.error("could not upload the image",  e)
  //     return null;
  //   }
  // }

  async updateFrontImage() {
    this.fetchImage().then(photo => {
      if (photo) {
        this.frontImage = photo
        this.carForm.patchValue({
          frontPicturePath: "data:image/jpeg;base64," + photo.base64String
        })
      }
    })
  }

  async updateBackImage() {
    this.fetchImage().then(photo => {
      if (photo) {
        this.backImage = photo
        this.carForm.patchValue({
          backPicturePath: "data:image/jpeg;base64," + photo.base64String
        })
      }
    })
  }

  async fetchImage() {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    });
  }
}
