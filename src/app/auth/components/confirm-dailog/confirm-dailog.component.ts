import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-confirm-dailog",
  templateUrl: "./confirm-dailog.component.html",
  styleUrls: ["./confirm-dailog.component.css"],
})
export class ConfirmDailogComponent implements OnInit {
  constructor(
    private dailogRef: MatDialogRef<ConfirmDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public dailogData: any
  ) {}

  ngOnInit(): void {
    console.log(this.dailogData);
  }
}
