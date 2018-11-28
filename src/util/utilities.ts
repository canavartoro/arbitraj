import { Injectable } from '@angular/core';
import { ActionSheet, ActionSheetController, ModalController } from 'ionic-angular';
import { Alert, AlertController, LoadingController, ToastController } from 'ionic-angular';

import { MyApp } from '../app/app.component';


@Injectable()
export class Utilities {

  constructor(
    private loadingCntrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private alertCntrl: AlertController) { }

  public avatarImg: string;
  public application: MyApp;
  public platform: string;
  public modalCntrl: ModalController;

  makeToast(msj: string, delay: number = 2000, location: string = 'top', closeButton: boolean = false, buttonText: string = '') {
    const toast = this.toastCtrl.create({
      message: msj,
      duration: delay,
      position: location,
      showCloseButton: closeButton,
      closeButtonText: buttonText
    });
    if (closeButton) {
      toast.onDidDismiss(() => {
        console.info("Toast buton clicked");
      });
    }
    toast.present();
  }

  makeLoading(msj: string) {
    let loading = this.loadingCntrl.create({
      content: msj
    });
    loading.present();
    return loading;
  }

  showAlert(msj: string) {
    let alert = this.alertCntrl.create({
      title: 'Upps!',
      message: msj,
      buttons: ['Tamam']
    });
    alert.addButton
    alert.present();
  }

  createAlert(title: string, btnText: string = 'İptal'): Alert {
    return this.alertCntrl.create({
      title: title,
      buttons: [{
        text: btnText,
        role: 'cancel'
      }]
    });
  }

  createOnlyAlert(title: string): Alert {
    return this.alertCntrl.create({
      title: title
    });
  }

  createAction(caption: string, btns: {
    text: string,
    icon: string,
    hand: any
  }[]): ActionSheet {

    let actionSheet = this.actionSheetCtrl.create({
      title: caption,
      buttons: [{
        text: 'İptal',
        icon: 'close',
        role: 'cancel',
        handler: () => { }
      }]
    });
    if (btns && btns.length > 0) {
      btns.forEach(item => {
        actionSheet.addButton({
          text: item.text,
          icon: item.icon,
          //role: 'destructive',
          handler: item.hand
        });
      });
    }
    return actionSheet;
  }

  getDateStr() {
    return new Date().toISOString();
  }

  getTimeStr() {
    var date = new Date();
    return date.toISOString().substr(11, 5);
  }

  getTel(val: string) {
    if (val) {
      val = val.replace(/[&_ \/\\#,+()$~%.'":*?<>{}-]/g, '');
      if (val.length > 10)
        val = val.substr(0, 10);
      return val;
    } else {
      return '';
    }
  }

  strtoupperTR(str: string) {
    if (str == '') return '';
    if (str == null) return '';
    if (str == undefined) return '';
    str = str.replace(/i/g, 'İ');
    str = str.replace(/ı/g, 'I');
    str = str.replace(/ü/g, 'Ü');
    str = str.replace(/ğ/g, 'Ğ');
    str = str.replace(/ş/g, 'Ş');
    str = str.replace(/ö/g, 'Ö');
    str = str.replace(/ç/g, 'Ç');
    return str.toUpperCase();
  }

  getIsMail(val: string) {
    if (val == null || val == '' || val == undefined) {
      return true;
    } else {
      var result: boolean = false;
      const emailRegex = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([\.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i;
      try {
        result = emailRegex.test(val);
      } catch (e) {
        console.log(e);
      }
      return result;
    }
  }

  getBase64(file: string, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', file);
    xhr.responseType = 'blob';
    xhr.send();
  }
}
