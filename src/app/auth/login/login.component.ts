import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Admin, Login } from "src/app/models";
import { LocalStorageService } from "src/app/services/localstorage-service/localstorage.service";
import { StudentService } from "src/app/services/api/student-service/student.service";
import { TeacherService } from "src/app/services/api/teacher-service/teacher.service";
import jwtDecode from "jwt-decode";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private teacherService: TeacherService,
    private localstorage: LocalStorageService,
    private studentService: StudentService,
    private router: Router
  ) {}
  loginForm = new FormGroup({
    userName: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    role: new FormControl("", [Validators.required]),
  });
  get userName() {
    return this.loginForm.get("userName");
  }
  get password() {
    return this.loginForm.get("password");
  }
  get role() {
    return this.loginForm.get("role");
  }
  handleLoginSubmit() {
    let { role, ...details } = this.loginForm.value;
    let loginDetails: Login = { ...details };

    let handleResponce = (res: any) => {
      console.log(res);
      let [role] = res.list;
      let decodedToken: any = jwtDecode(res.jwt);
      let user = {
        jwt: res.jwt,
        role: role.authority,
        userName: decodedToken.sub,
      };
      this.localstorage.set("user", user);
      if (role.authority === "ROLE_teacher") {
        this.router.navigate(["/teachers", decodedToken.sub]);
      } else if (role.authority === "student") {
        this.router.navigate(["/students", decodedToken.sub]);
      }
    };
    if (role === "teacher") {
      this.teacherService.teacherLogin(loginDetails).subscribe(handleResponce);
    } else if (role === "student") {
      this.studentService.loginStudent(loginDetails).subscribe(handleResponce);
    }
  }
  ngOnInit(): void {}
}
