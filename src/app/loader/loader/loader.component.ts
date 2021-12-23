import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'app/loader/services/loader/loader.service';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  progressRef: NgProgressRef;
  constructor(private progress: NgProgress, private loader: LoaderService) {
    this.progressRef = this.progress.ref('myProgress');
  }
  startLoading() {
    this.progressRef.start();
  }

  completeLoading() {
    this.progressRef.complete();
  }
  ngOnInit(): void {
    this.loader.getLoading().subscribe((val: boolean) => {
      if (val) this.startLoading();
      else this.completeLoading();
    });
  }
}
