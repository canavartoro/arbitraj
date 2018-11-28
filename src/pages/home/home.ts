import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { WebUtility } from '../../services/web-util';
import { Utilities } from '../../util/utilities';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items:any[];
  value = '';

  constructor(public navCtrl: NavController,
    private webUtil: WebUtility, 
    private util: Utilities,
    public modalCtrl: ModalController) {
  }

  setProduct(id: number) {
    //this.navCtrl.push('ListPage', {city: item});
  }

  

  onCancel(e: any) {
    this.value = '';
  }

  onDismiss() {
    console.log(this.value);
    if (!this.value || this.value.trim() === '') {
      return;
    }
    this.webUtil.doGet('product&asin=' + this.value).subscribe(data => {
      console.log(data);
      this.items = data;
    }, err => {
      console.error(err);
      this.util.showAlert(err);
    });
  }

  onSearchInput(q: string) {
    console.log(q);
    //(ionChange)="getItems($event.value)"
    // Reset items back to all of the items
    

    

    // if the value is an empty string don't filter the items
    /*if (!q || q.trim() === '') {
      return;
    }*/

    //this.items = this.items.filter((v) => v.toLowerCase().indexOf(q.toLowerCase()) > -1);
  }

  openModal() {
    let modal = this.modalCtrl.create('ListPage');
    modal.present();
  }

}
