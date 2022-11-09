import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import { Login, Student } from "src/app/models";
import { LocalStorageService } from "../../localstorage-service/localstorage.service";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  private baseURL = "http://localhost:8080";

  constructor(
    private httpClient: HttpClient,
    private localstorage: LocalStorageService
  ) {}

  public getStudentList(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.baseURL}`);
  }
  public getStudent(userName: string): Observable<Student> {
    return this.httpClient
      .get<Student>(`${this.baseURL}/getstudent/${userName}`)
      .pipe(
        map((res: any) => res.student),
        tap((res) => {
          console.log(res);

          let user = { ...this.localstorage.get("user"), studentId: res.id };
          this.localstorage.set("user", user);
        })
      );
  }
  public addStudent(student: Student): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/add`, student);
  }

  public updateStudent(id: number, student: Student): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/add/${id}`, student);
  }

  public deleteStudent(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
  }

  public loginStudent(student: Login): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/student/login`, student);
  }
  public registerStudent(student: any): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/student/in`, student);
  }
  public teacherRegStudent(id: any, userName: string): Observable<Object> {
    let payload = {
      selectStud: [id],
    };
    console.log(payload);
    return this.httpClient.post(
      `${this.baseURL}/addteacher/${userName}`,
      payload
    );
  }
}
