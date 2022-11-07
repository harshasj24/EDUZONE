import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from "@angular/core";
import { TeacherService } from "../services/api/teacher-service/teacher.service";

import { LocalStorageService } from "../services/localstorage-service/localstorage.service";
import { Teacher, TeacherGallery } from "../models";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UploadDailogComponent } from "./components/upload-dailog/upload-dailog.component";
import { LoaderService } from "../services/loader/loader.service";
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
    private matDailog: MatDialog,
    private loaderService: LoaderService
  ) {
    this.teacherDetails = new Teacher();
  }
  loader: boolean;
  ngOnInit(): void {
    this.loaderService.loader.subscribe((load: any) => {
      this.loader = load;
    });
    let user = this.localstorage.get("user");
    this.teacherService.getTeachersDetails(user.userName).subscribe((res) => {
      this.teacherDetails = res;
    });
  }
}
