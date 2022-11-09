import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StudentService } from "src/app/services/api/student-service/student.service";
import { LocalStorageService } from "src/app/services/localstorage-service/localstorage.service";
@Injectable({
  providedIn: "root",
})
export class StudentStoreService {
  constructor(
    private studentService: StudentService,
    private localstorage: LocalStorageService
  ) {}
  initialState = {
    studentDetails: {},
  };

  loaded = {
    studDetLoaded: false,
  };

  studentStore = new BehaviorSubject<any>(this.initialState);

  getStudentDetils(userName: string) {
    this.studentService.getStudent(userName).subscribe((res) => {
      let preVal = this.studentStore.value;
      console.log(res);
      preVal.studentDetails = res;
      this.studentStore.next(preVal);
      this.loaded.studDetLoaded = true;
      let regTeachId = res.teacher.map((el) => el.id);
      this.localstorage.set("registedIds", regTeachId);
    });
  }

  reload(userName: string) {
    this.loaded.studDetLoaded = false;
    this.getStudentDetils(userName);
  }
  regStudentToTeacher(id: number) {
    let user = this.localstorage.get("user");
    this.studentService
      .teacherRegStudent(id, user.userName)
      .subscribe((res) => {
        console.log(res);
        // this.reload(user.userName);
      });
  }
}
