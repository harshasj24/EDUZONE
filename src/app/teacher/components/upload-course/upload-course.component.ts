import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Course } from "src/app/models";
import { CourseService } from "src/app/services/api/course-service/course.service";
import { StoreService } from "../../service/store.service";

@Component({
  selector: "app-upload-course",
  templateUrl: "./upload-course.component.html",
  styleUrls: ["./upload-course.component.css"],
})
export class UploadCourseComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private matDailog: MatDialog,
    private store:StoreService
  ) {}
  @ViewChild("file") file: ElementRef;
  value: number = 0;
  isLoading: Boolean = false;
  interval: any;
  courseForm = new FormGroup({
    courseName: new FormControl("", []),
    courseContaines: new FormControl("", []),
    reference: new FormControl("", []),
  });

  handleSubmit() {
    let imageFile = this.file.nativeElement.files[0];
    const formData = new FormData();
    formData.append("file", imageFile);
    let formValues = this.courseForm.value;
    Object.keys(formValues).map((key) => {
      formData.append(key, formValues[key]);
    });
    this.isLoading=true
    this.isLoading = this.store.addCourse(formData);

    // this.courseService.addCourse(formData).subscribe((res) => {
    //   console.log(res);
    //   this.isLoading = false;
    //   this.store.uploadCourseDailog.close()
    // });
  }
  ngOnInit(): void {}
}
