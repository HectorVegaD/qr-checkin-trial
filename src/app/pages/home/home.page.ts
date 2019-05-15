import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private platform: Platform,
    private router: Router
    ){

  }

  async ngOnInit(){
    await this.platform.ready();
  }

  startScan() {
    this.router.navigate(['/qrscanner']); 
  }
}
