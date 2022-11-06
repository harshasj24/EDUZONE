import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../../../models/course.model";
import { LocalStorageService } from "../../localstorage-service/localstorage.service";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  private baseURL = "http://localhost:8080";

  constructor(
    private httpClient: HttpClient,
    private localstorage: LocalStorageService
  ) {}

  public getCourseList(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(
      `${this.baseURL}/course/getall/${this.localstorage.get("user").id}`
    );
  }

  public getCourseById(id: number): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/${id}`);
  }

  public addCourse(course: any): Observable<Object> {
    return this.httpClient.post(
      `${this.baseURL}/course/up/${this.localstorage.get("user").id}`,
      course
    );
  }

  public updateCourse(id: number, course: Course): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/add/${id}`, course);
  }

  public deleteCourse(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
  }
}
