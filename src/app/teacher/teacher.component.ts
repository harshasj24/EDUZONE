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
import { ActivatedRoute } from "@angular/router";
import { StoreService } from "./service/store.service";
import { StudentStoreService } from "../student/services/store/store.service";
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
    public store: StoreService,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    public studentStore: StudentStoreService
  ) {
    this.teacherDetails = new Teacher();
  }

  userName = "";
  regTeachers: Teacher[];
  checkReg() {
    let regIds: number[] = this.localstorage.get("registedIds");
    return regIds.includes(this.teacherDetails.id);
  }
  handelClick() {
    if (!this.checkReg()) {
      console.log("called");
      this.studentStore.regStudentToTeacher(this.teacherDetails.id);
      let ids = this.localstorage.get("registedIds");
      ids.push(this.teacherDetails.id);
      this.localstorage.set("registedIds", ids);
    }
  }

  isTeacher = this.store.isTeacher();
  ngOnInit(): void {
    let user = this.localstorage.get("user");
    // getting username form route
    this.route.params.subscribe((route) => {
      this.userName = route.userName;
      this.store.getTeacherDetails(route.userName);
    });
    //getting teacherdetails
    this.store.teacherStore.subscribe((store) => {
      this.teacherDetails = store.teacherDetails;
    });
    // All registread teacher
    this.studentStore.studentStore.subscribe((store) => {
      console.log(store.studentDetails);
      this.regTeachers = store.studentDetails;
    });
  }
}
