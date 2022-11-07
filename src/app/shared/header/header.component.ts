import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";
import { LocalStorageService } from "src/app/services/localstorage-service/localstorage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  public time = new Date();

  constructor(private localstorage: LocalStorageService,private authser:AuthService) {}
  isLoggedIn() {
    if (this.localstorage.get("user")) {
      return true;
    } else {
      return false;
    }
  }

  logout(){
    this.authser.logout()
  }
  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }
}
