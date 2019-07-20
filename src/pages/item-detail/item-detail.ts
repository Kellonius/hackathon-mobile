import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Items, User } from '../../providers';
import { HttpClientWrapperService } from '../../providers/api/http-wrapper.service';
import { MedicationDataResponse } from '../../models/MedicationDataResponse';
import { ScriptModel } from '../../models/ScriptModel';
import { MedicationPrescriptionRequest } from '../../models/MedicationPrescriptionRequest';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  itemDetails: ScriptModel[] = [];

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, private httpWrapper: HttpClientWrapperService, private user: User) {
    this.item = navParams.get('item') || items.defaultItem;

    let request = new MedicationPrescriptionRequest({
      userId: user._user.id,
      medicationId: this.item.MedicationId
    })

    this.httpWrapper.post<MedicationPrescriptionRequest, ScriptModel[]>(request, 'Medication/GetMedicationPrescriptions').subscribe(x=> {
      x.forEach(y => {
        this.itemDetails.push(y);
      });;
    })
  }

}
