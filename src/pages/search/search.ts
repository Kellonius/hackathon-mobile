import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { HttpClientWrapperService } from '../../providers/api/http-wrapper.service';

import { Item } from '../../models/item';
import { Items, User } from '../../providers';
import { MedicationDataRequest } from '../../models/MedicationDataRequest';
import { MedicationDataResponse } from '../../models/MedicationDataResponse';
import { MedicationAddRequest } from '../../models/MedicationAddRequest';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentItems: MedicationDataResponse[] = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public items: Items, 
    private httpWrapper: HttpClientWrapperService, 
    private user: User,
    private alertController: AlertController,
    private toastController: ToastController) {

    this.updateAndRefreshMeds()

   }

   updateAndRefreshMeds() {
    let id = new MedicationDataRequest({
      patientId: this.user._user.id
    })

    this.httpWrapper.post<MedicationDataRequest, Array<MedicationDataResponse>>(id, 'Medication/GetMedications').subscribe(x => {
      this.currentItems = x;
    })
   }

   async addMedication() {
    const alert = await this.alertController.create({
      title: 'Add Medication',
      message: 'Enter information about the medication you want to add.',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Generic Name - e.g. Aspirin'
        },
        {
          name: 'medName',
          type: 'text',
          placeholder: 'Medical Name e.g. Acetominophin'
        },
        {
          name: 'dosage',
          type: 'text',
          placeholder: 'Dosage - e.g. 500mg .'
        },
        {
          name: 'time',
          type: 'text',
          placeholder: 'Frequency - e.g. once daily.'
        }

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Send Request',
          handler: x => {
            this.handleAddMedication(new MedicationAddRequest({
              userId: this.user._user.id,
              name: x.name,
              medName: x.medName,
              dosage: x.dosage,
              time: x.time
            }))
          }
        }
      ]
    });

    await alert.present();
   }

   handleAddMedication(request: MedicationAddRequest){
    this.httpWrapper.post(request, 'Medication/AddMedication').subscribe((x: any) => {
      if (x == 'success') {
      this.updateAndRefreshMeds();
       this.loginSuccess();
      } else {
        this.loginFailed();
      }
    })
   }

   async loginSuccess() {
    const toast = await this.toastController.create({
      message: 'Medication added successfully.',
      duration: 2000
    });
    toast.present();
   }

   async loginFailed() {
    const toast = await this.toastController.create({
      message: 'Adding medication failed.',
      duration: 2000
    });
    toast.present();
   }
  /**
   * Perform a service for the proper items.
   */
  // getItems(ev) {
  //   let val = ev.target.value;
  //   if (!val || !val.trim()) {
  //     this.currentItems = [];
  //     return;
  //   }
  //   this.currentItems = this.items.query({
  //     name: val
  //   });
  // }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

}
