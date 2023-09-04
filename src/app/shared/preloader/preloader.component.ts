import { Component, OnInit } from '@angular/core';
import { Preloader } from './preloader.service';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {
  public active: any;
  public constructor(private preloader: Preloader) {
    this.preloader.status.subscribe(status => {
      this.active = status;
    });
  }

  ngOnInit() {
  }
}
