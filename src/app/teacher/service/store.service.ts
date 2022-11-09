import { Injectable } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { BehaviorSubject } from "rxjs";
import { CourseService } from "src/app/services/api/course-service/course.service";
import { TeacherService } from "src/app/services/api/teacher-service/teacher.service";
import { LoaderService } from "src/app/services/loader/loader.service";
import { LocalStorageService } from "src/app/services/localstorage-service/localstorage.service";
import { SnackbarService } from "src/app/services/snackbar/snackbar.service";
import { UploadCourseComponent } from "../components/upload-course/upload-course.component";
import { UploadDailogComponent } from "../components/upload-dailog/upload-dailog.component";
@Injectable({
  providedIn: "root",
})
export class StoreService {
  // dailog refs
  isTeacher(): boolean {
    const user = this.loacalstorage.get("user");
    console.log("called");
    return user.role === "ROLE_teacher";
  }
  uploadCourseDailog: MatDialogRef<UploadCourseComponent>;
  uploadGalleryDailog: MatDialogRef<UploadDailogComponent>;
  loaded = {
    isTeacherDetailsLoaded: false,
    isTeacherGalleryLoaded: false,
    isTeacherCourseLoaded: false,
    isAllTeacherLoaded: false,
  };
  initialState = {
    teacherDetails: [],
    teacherGallery: [],
    teacherCourse: [],
    allTeachers: [],
  };
  teacherStore = new BehaviorSubject<any>(this.initialState);
  constructor(
    private teacherService: TeacherService,
    private courseService: CourseService,
    private loader: LoaderService,
    private snackbar: SnackbarService,
    private loacalstorage: LocalStorageService
  ) {}

  getTeacherDetails(userName: string) {
    if (!this.loaded.isTeacherDetailsLoaded) {
      this.teacherService.getTeachersDetails(userName).subscribe((res) => {
        const preVal = this.teacherStore.value;
        preVal.teacherDetails = res;
        this.teacherStore.next(preVal);
      });
    }
  }

  getTeacherGallery() {
    // this.isLoading = true;
    // if (!this.loaded.isTeacherGalleryLoaded) {
    this.teacherService.getTeachersMedia().subscribe((res: any) => {
      console.log(res);
      this.teacherStore.next({ ...this.initialState, teacherGallery: res });
      // this.isLoading = false;
      this.loaded.isTeacherGalleryLoaded = true;
    });
    // }
  }
  getAllCourse() {
    this.courseService.getCourseList().subscribe((res: any) => {
      let preVal = this.teacherStore.value;
      preVal.teacherCourse = res;
      console.log(preVal);
      this.teacherStore.next(preVal);
      this.loaded.isTeacherCourseLoaded = true;
    });
  }
  addCourse(data: any): any {
    return this.courseService.addCourse(data).subscribe((res) => {
      console.log(res);
      // let preVal = this.teacherStore.value;
      // let newCourse: any = { ...res };
      // newCourse.courseName = data.courseName;
      // preVal.teacherCourse = [...preVal.teacherCourse, newCourse];
      // this.teacherStore.next(preVal);
      this.getAllCourse();
      this.uploadCourseDailog.close();
      this.snackbar.success("Course Added Sucessfully.");
      return false;
    });
  }

  addTeacherMedia(data: any): any {
    return this.teacherService.addTeacherMedia(data).subscribe((res) => {
      console.log(res);
      this.uploadGalleryDailog.close();
      // let preVal = this.teacherStore.value;
      // preVal.teacherGallery = [...preVal.teacherGallery, res];
      // this.teacherStore.next(preVal);
      this.getTeacherGallery();
      this.snackbar.success("Media Added Sucessfully.");
      return false;
    });
  }

  deleteTeacherMedia() {}

  getAllTeachers() {
    if (!this.loaded.isAllTeacherLoaded) {
      this.teacherService.getTeachersList().subscribe((res) => {
        let preVal = this.teacherStore.value;
        preVal.allTeachers = res;
        this.teacherStore.next(preVal);
      });
    }
  }
}
