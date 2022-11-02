import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from "@angular/core";
import { TeacherService } from "../services/api/teacher-service/teacher.service";

import { LocalStorageService } from "../services/api/localstorage-service/localstorage.service";
import { Teacher, TeacherGallery } from "../models";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UploadDailogComponent } from "./components/upload-dailog/upload-dailog.component";
@Component({
  selector: "app-teacher",
  templateUrl: "./teacher.component.html",
  styleUrls: ["./teacher.component.css"],
})
export class TeacherComponent implements OnInit {
  teacherDetails: Teacher;
 
  constructor(
    private teacherService: TeacherService,
    private localstorage: LocalStorageService,
    private matDailog: MatDialog
  ) {
    this.teacherDetails = new Teacher();
  }
 
 

  ngOnInit(): void {
    let user = this.localstorage.get("user");
    this.teacherService.getTeachersDetails(user.userName).subscribe((res) => {
      this.teacherDetails = res;
    });
  }



 
}
