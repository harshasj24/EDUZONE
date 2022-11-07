import { Component, OnInit, AfterViewInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Course } from "src/app/models";
import { CourseService } from "src/app/services/api/course-service/course.service";
import { StoreService } from "../../service/store.service";
import { UploadCourseComponent } from "../upload-course/upload-course.component";

@Component({
  selector: "app-cources",
  templateUrl: "./cources.component.html",
  styleUrls: ["./cources.component.css"],
})
export class CourcesComponent implements OnInit, AfterViewInit {
  allCourses: Course[];
  isLoading: boolean = false;
  constructor(
    private courseService: CourseService,
    private matDailog: MatDialog,
    private store:StoreService
  ) {}
  dailogRef: MatDialogRef<UploadCourseComponent>;
  ngAfterViewInit(): void {
    window.addEventListener("scroll", () => {
      let addBtn = document.getElementById("addBtn");
      let courses = document.getElementById("cources");
      if (addBtn && courses) {
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
    this.isLoading = true;
 
    this.courseService.getCourseList().subscribe((res: any) => {
      this.allCourses = res;
      this.isLoading = false;
    });
  }
  ngOnInit(): void {
       this.store.teacherStore.subscribe((teachDet)=>{
      this.allCourses=teachDet.teacherCourse
    })
    
    setTimeout(() => {
      this.store.getAllCourse()
      // this.getAllCourse();
    }, 1000);

    this.store.uploadCourseDailog.afterClosed().subscribe(() => {
    this.store.getAllCourse()
    });
  }
  handleOpen() {
    this.store.uploadCourseDailog = this.matDailog.open(UploadCourseComponent);
  }
}
