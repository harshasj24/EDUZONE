import { Injectable } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { BehaviorSubject } from "rxjs";
import { CourseService } from "src/app/services/api/course-service/course.service";
import { TeacherService } from "src/app/services/api/teacher-service/teacher.service";
import { LoaderService } from "src/app/services/loader/loader.service";
import { SnackbarService } from "src/app/services/snackbar/snackbar.service";
import { UploadCourseComponent } from "../components/upload-course/upload-course.component";
import { UploadDailogComponent } from "../components/upload-dailog/upload-dailog.component";
@Injectable({
  providedIn: "root",
})
export class StoreService {
  // dailog refs
  uploadCourseDailog: MatDialogRef<UploadCourseComponent>;
  uploadGalleryDailog: MatDialogRef<UploadDailogComponent>;
  loaded = {
    isTeacherDetailsLoaded: false,
    isTeacherGalleryLoaded: false,
    isTeacherCourseLoaded: false,
  };
  initialState = {
    teacherDetails: [],
    teacherGallery: [],
    teacherCourse: [],
  };
  teacherStore = new BehaviorSubject<any>(this.initialState);
  constructor(
    private teacherService: TeacherService,
    private courseService: CourseService,
    private loader:LoaderService,
    private snackbar:SnackbarService

  ) {}

  getTeacherGallery() {
    // this.isLoading = true;
    if (!this.loaded.isTeacherGalleryLoaded) {
      this.teacherService.getTeachersMedia().subscribe((res: any) => {
        console.log(res);
        this.teacherStore.next({ ...this.initialState, teacherGallery: res });
        // this.isLoading = false;
        this.loaded.isTeacherGalleryLoaded = true;
      });
    }
  }
  getAllCourse() {
    if (!this.loaded.isTeacherCourseLoaded) {
      this.courseService.getCourseList().subscribe((res: any) => {
        let preVal = this.teacherStore.value;
        preVal.teacherCourse = res;
        console.log(preVal);
        this.teacherStore.next(preVal);
        this.loaded.isTeacherCourseLoaded = true;
      });
    }
  }
  addCourse(data: any):any {
    return this.courseService.addCourse(data).subscribe((res) => {
      console.log(res);
    let preVal=this.teacherStore.value
    let newCourse:any={...res}
      newCourse.courseName=data.courseName
    preVal.teacherCourse=[... preVal.teacherCourse,newCourse]
    this.teacherStore.next(preVal)
    this.uploadCourseDailog.close()
    this.snackbar.success("Course Added Sucessfully.")
    return false
    });
  }

  addTeacherMedia(data:any):any{
   return this.teacherService.addTeacherMedia(data).subscribe((res) => {
      console.log(res);
      this.uploadGalleryDailog.close();
      let preVal=this.teacherStore.value
      preVal.teacherGallery=[...preVal.teacherGallery,res]
      this.teacherStore.next(preVal)
      return false
    });
  }

  deleteTeacherMedia(){}
}
