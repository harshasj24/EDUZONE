import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-layout",
  templateUrl: "./list-layout.component.html",
  styleUrls: ["./list-layout.component.css"],
})
export class ListLayoutComponent implements OnInit {
  constructor(private router: Router) {}
  @Input() listData: any[];
  ngOnInit(): void {}
  handleClick(userName: string) {
    this.router.navigate(["/teachers", userName]);
  }
}
