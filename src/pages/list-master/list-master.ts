import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items, User } from '../../providers';
import { HttpClientWrapperService } from '../../providers/api/http-wrapper.service';
import { PatientDataResponse } from '../../models/PatientDataResponse';
import { PatientDataRequest } from '../../models/PatientDataRequest';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  dob: string = "";

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, private httpWrapper: HttpClientWrapperService, private user: User) {
    this.currentItems = this.items.query();

    let email = new PatientDataRequest({
      userEmail : user._user.email
    })

    this.httpWrapper.post<PatientDataRequest, PatientDataResponse>(email, 'Patient/GetPatientData').subscribe(x => {
      this.firstName = x.firstName
      this.lastName = x.lastName,
      this.email = x.email,
      this.dob = x.DOB
    })
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
