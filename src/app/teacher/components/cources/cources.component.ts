import { Component, OnInit, AfterViewInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Course } from "src/app/models";
import { CourseService } from "src/app/services/api/course-service/course.service";
import { UploadCourseComponent } from "../upload-course/upload-course.component";

@Component({
  selector: "app-cources",
  templateUrl: "./cources.component.html",
  styleUrls: ["./cources.component.css"],
})
export class CourcesComponent implements OnInit, AfterViewInit {
  allCourses: Course[];
  constructor(
    private courseService: CourseService,
    private matDailog: MatDialog
  ) {}
  dailogRef: MatDialogRef<UploadCourseComponent>;
  ngAfterViewInit(): void {
    window.addEventListener("scroll", () => {
      let addBtn = document.getElementById("addBtn");
      let courses = document.getElementById("cources");
      if (addBtn) {
        if (window.scrollY > courses.offsetTop + courses.clientHeight - 50) {
          addBtn.classList.replace("hide", "show");
        } else if (
          window.scrollY <
          courses.offsetTop + courses.clientHeight - 50
        ) {
          addBtn.classList.replace("show", "hide");
        }
      }
    });
  }
  getAllCourse() {
    this.courseService.getCourseList().subscribe((res: any) => {
      this.allCourses = res;
    });
  }
  ngOnInit(): void {
    this.getAllCourse();
  }
  handleOpen() {
    this.dailogRef = this.matDailog.open(UploadCourseComponent);
  }
}
