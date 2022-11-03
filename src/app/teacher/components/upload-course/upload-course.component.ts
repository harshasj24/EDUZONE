import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Course } from "src/app/models";
import { CourseService } from "src/app/services/api/course-service/course.service";

@Component({
  selector: "app-upload-course",
  templateUrl: "./upload-course.component.html",
  styleUrls: ["./upload-course.component.css"],
})
export class UploadCourseComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private matDailog: MatDialog
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
    this.isLoading = true;

    this.courseService.addCourse(formData).subscribe((res) => {
      console.log(res);
      this.isLoading = false;
      this.matDailog.closeAll();
    });
  }
  ngOnInit(): void {}
}
