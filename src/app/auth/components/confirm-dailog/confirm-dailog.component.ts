import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: "app-confirm-dailog",
  templateUrl: "./confirm-dailog.component.html",
  styleUrls: ["./confirm-dailog.component.css"],
})
export class ConfirmDailogComponent implements OnInit {
  constructor(
    private dailogRef: MatDialogRef<ConfirmDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public dailogData: any,
    private router: Router
  ) {}
  handleClick(type: string) {
    if (type === "login") {
      this.dailogRef.close();
      this.router.navigate(["/login"]);
    }
    if (type === "tryagain") {
      this.dailogRef.close();
    }
  }
  ngOnInit(): void {
    console.log(this.dailogData);
  }
}
