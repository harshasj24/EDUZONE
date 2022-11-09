import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Student, Teacher } from "../models";
import { StudentService } from "../services/api/student-service/student.service";
import { LocalStorageService } from "../services/localstorage-service/localstorage.service";
import { StudentStoreService } from "./services/store/store.service";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.css"],
})
export class StudentComponent implements OnInit {
  studentDetails: Student;
  constructor(
    private studentService: StudentService,
    private localstorage: LocalStorageService,
    private route: ActivatedRoute,
    private store: StudentStoreService
  ) {}
  userName: string = "";
  regsitredTeachers: Teacher[];

  ngOnInit(): void {
    console.log(this.regsitredTeachers);

    // getting router params
    this.route.params.subscribe((param: any) => {
      console.log(param);
      this.userName = param.userName;
      this.store.getStudentDetils(param.userName);
    });
    // getting student details
    this.store.studentStore.subscribe((store) => {
      this.studentDetails = store.studentDetails;
      this.regsitredTeachers = this.studentDetails.teacher;
    });
  }
}
