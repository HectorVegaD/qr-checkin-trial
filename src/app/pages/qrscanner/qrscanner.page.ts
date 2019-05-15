import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { NavController, Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.page.html',
  styleUrls: ['./qrscanner.page.scss'],
})
export class QrscannerPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public platform:Platform,
    public qrScanner: QRScanner,
    private alertController: AlertController) {
        
  } 

  ngOnInit(){
    this.platform.ready().then(()=>{
      this.qrscanner();
    });
  }

  qrscanner() {
    // Optionally request the permission early
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
          if (status.authorized) {
            // camera permission was granted
            alert('authorized');

            // start scanning
            let scanSub = this.qrScanner.scan().subscribe((text: string) => {
              this.showAlert(text);
              alert(text);
              this.qrScanner.hide(); // hide camera preview
              scanSub.unsubscribe(); // stop scanning
              this.navCtrl.pop();
            });

            this.qrScanner.resumePreview();

            // show camera preview
            this.qrScanner.show().then((data : QRScannerStatus)=> { 
              alert(data.showing);
            },err => {
              alert(err);
            });

            // wait for user to scan something, then the observable callback will be called
        } else if (status.denied) {
          alert('denied');
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          alert('else');
        }
      }).catch((e: any) => {
        alert('Error is' + e);
      });
    }

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
}
