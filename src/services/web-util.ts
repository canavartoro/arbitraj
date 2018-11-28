import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AlertController, LoadingController } from "ionic-angular";
import * as cfg from '../util/config';



@Injectable()
export class WebUtility {
    constructor(
        private alertCntrl: AlertController,
        private loadingCntrl: LoadingController,
        private http: Http) {
    
      }

      doGet(action: string): Observable<any> {
        let loading = this.loadingCntrl.create({content:'Please wait..'});
          loading.present();
          return this.http.get(cfg.getWebUrl(action)).timeout(30000).map(res => {
            loading.dismiss();
            let data = res.json();
            if (data) {
              return data.answer;
            }
          }, err => {
            loading.dismiss();
            console.error(err);
          });
    }
    


   
}