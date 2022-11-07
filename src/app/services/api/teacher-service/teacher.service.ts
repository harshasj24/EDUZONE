import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Admin, Login } from "src/app/models";
import { Teacher } from "../../../models/teacher.model";
import { map, tap } from "rxjs/operators";
import { LocalStorageService } from "../../localstorage-service/localstorage.service";
@Injectable({
  providedIn: "root",
})
export class TeacherService {
  private baseURL = "http://localhost:8080";

  constructor(
    private httpClient: HttpClient,
    private localstorage: LocalStorageService
  ) {}

  public getTeachersList(): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(`${this.baseURL}`);
  }
  public getTeachersDetails(userName: string): Observable<any> {
    return this.httpClient
      .get<any>(`${this.baseURL}/adminTeacher/${userName}`)
      .pipe(
        map((res) => res.admin),
        tap((res) => {
          let user = { ...this.localstorage.get("user"), id: res.id };
          this.localstorage.set("user", user);
        })
      );
  }
  public getTeachersMedia(): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(`${this.baseURL}/images/getall/1`);
  }
  public addTeacherMedia(file: any): Observable<Object> {
    return this.httpClient.post(
      `${this.baseURL}/images/upload/${this.localstorage.get("user")?.id}`,
      file
    );
  }
  public addTeacher(teacher: Teacher): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/add`, teacher);
  }

  public updateTeacher(id: number, teacher: Teacher): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/add/${id}`, teacher);
  }

  public deleteTeacher(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/images/delete/${id}`);
  }

  public teacherLogin(teacherDetails: Login): Observable<Object> {
    return this.httpClient.post(
      `${this.baseURL}/adminTeacher/login`,
      teacherDetails
    );
  }
  public teacherRegistartion(teacherDetails: any): Observable<Object> {
    return this.httpClient.post(
      `${this.baseURL}/teacher/in`,
      teacherDetails
    );
  }
}
