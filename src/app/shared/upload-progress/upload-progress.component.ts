import { Component, Input, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: "app-upload-progress",
  templateUrl: "./upload-progress.component.html",
  styleUrls: ["./upload-progress.component.css"],
})
export class UploadProgressComponent implements OnInit, OnDestroy {
  value: number = 0;
  interval: any;

  constructor() {}
  ngOnDestroy(): void {
    clearInterval(this.interval);
    this.interval = 0;
  }
  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.value++;
      console.log(this.value);
    }, 1000);
  }
}
