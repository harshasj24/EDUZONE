import { Component, OnInit } from "@angular/core";
import { LoaderService } from "src/app/services/loader/loader.service";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.css"],
})
export class LoaderComponent implements OnInit {
  constructor(private loader: LoaderService) {}
  isLoading: any;
  ngOnInit(): void {
    this.loader.loader.subscribe((res) => {
      this.isLoading = res;
    });
  }
}
