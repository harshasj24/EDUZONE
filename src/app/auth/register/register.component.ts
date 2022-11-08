import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { StudentService } from "src/app/services/api/student-service/student.service";
import { TeacherService } from "src/app/services/api/teacher-service/teacher.service";
import { LocalStorageService } from "src/app/services/localstorage-service/localstorage.service";
import { ConfirmDailogComponent } from "../components/confirm-dailog/confirm-dailog.component";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor(
    private teacherService: TeacherService,
    private localstorage: LocalStorageService,
    private studentService: StudentService,
    private matDailog: MatDialog
  ) {}
  registrationForm = new FormGroup({
    name: new FormControl("", Validators.required),
    contact: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
    role: new FormControl("", Validators.required),
    userName: new FormControl("", Validators.required),
    qualification: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });
  get role() {
    return this.registrationForm.get("role");
  }

  ngOnInit(): void {
    this.openDailog("error");
    this.registrationForm.get("role").valueChanges.subscribe((val) => {
      console.log(val);

      if (val === "ROLE_teacher") {
        let hasCources = this.registrationForm.get("cources");
        if (!hasCources) {
          this.registrationForm.addControl(
            "cources",
            new FormControl("", Validators.required)
          );
        }
      } else {
        this.registrationForm.removeControl("cources");
      }
    });
  }

  openDailog(type: string) {
    const dailog: MatDialogRef<ConfirmDailogComponent> = this.matDailog.open(
      ConfirmDailogComponent,
      {
        data: {
          type,
        },
      }
    );
  }

  handleSubmit() {
    if (this.role.value === "ROLE_teacher") {
      this.teacherService
        .teacherRegistartion(this.registrationForm.value)
        .subscribe(
          (res) => {
            console.log(res);
            this.openDailog("success");
          },
          () => {
            this.openDailog("error");
          }
        );
    }
    if (this.role.value === "student") {
      this.studentService
        .registerStudent(this.registrationForm.value)
        .subscribe(
          (res) => {
            console.log(res);
          },
          () => {}
        );
    }
  }
}
