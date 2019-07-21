import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Items, User } from '../../providers';
import { HttpClientWrapperService } from '../../providers/api/http-wrapper.service';
import { MedicationDataResponse } from '../../models/MedicationDataResponse';
import { ScriptModel } from '../../models/ScriptModel';
import { MedicationPrescriptionRequest } from '../../models/MedicationPrescriptionRequest';
import { PatientDeniedMedicationRequest } from '../../models/PatientDeniedMedicationRequest';

declare var google

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  src: string = "";
  msg: string = "";
  itemDetails: ScriptModel[] = [];

  constructor(public navCtrl: NavController, 
    navParams: NavParams, 
    items: Items, 
    private httpWrapper: HttpClientWrapperService, 
    private user: User,
    private alertController: AlertController) {
    this.item = navParams.get('item') || items.defaultItem;
    this.getSource();
    //this.updateAndRefresh();
  }

updateAndRefresh() {
  let request = new MedicationPrescriptionRequest({
    userId: this.user._user.id,
    medicationId: this.item.MedicationId
  })

  this.httpWrapper.post<MedicationPrescriptionRequest, ScriptModel[]>(request, 'Medication/GetMedicationPrescriptions').subscribe(x => {
    x.forEach(y => {
      this.itemDetails.push(y);
      this.item = y;
      this.getSource();
    });;
   
  })
}

  getSource() {

    if (this.item.DateFilled == null) {
      this.src = '../../assets/img/prescription.png';
      this.msg = "Prescription received by pharmacist."
    }
    if (this.item.DateFilled != null && this.item.DatePickedUp == null) {
      this.src = '../../assets/img/filled.png';
      this.msg = "Prescription is ready to be picked up."
    }
    if (this.item.DatePickedUp != null) {
      this.src = '../../assets/img/rx-bottles.jpg';
      this.msg = "Prescription picked up by patient."
    }
  }

  pickUpPrescription() {
    this.httpWrapper.post({}, 'Patient/PatientPickedUpMedication?scriptId='+this.item.ScriptId).subscribe(x =>{
      this.updateAndRefresh();
    });
  }

  async stoppedTakingPrescription() {
    const alert = await this.alertController.create({
      title: 'Stop Medication',
      inputs: [
        {
          name: 'explanation',
          type: 'text',
          placeholder: 'Explanation'
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
          text: 'Confirm',
          handler: x => {
            this.handleDeniedMedication(new PatientDeniedMedicationRequest({

              ScriptId: this.item.ScriptId,
              Reason: x.explanation
            }))
          }
        }
      ]
    });

    await alert.present();
  }

  handleDeniedMedication(request: PatientDeniedMedicationRequest) {
    this.httpWrapper.post(request, "Patient/PatientDeniedMedication").subscribe();
  }

  tookPrescription() {
    this.httpWrapper.post({}, 'Patient/PatientUsedMedication?scriptId='+this.item.ScriptId).subscribe();
  }

  drawMaterial() {

    var data = google.visualization.arrayToDataTable([
      ['Year', 'A', 'D'],
      ['2018', 660, 1120],
      ['2019', 1030, 540]
    ]);

    var options = {
      chart: {
        title: 'Medication Usage Data',
        subtitle: 'Adherance and Denials',
      }
    };

    var materialChart = new google.charts.Bar(document.getElementById('chart_div'));
    materialChart.draw(data, options);
  }
}
