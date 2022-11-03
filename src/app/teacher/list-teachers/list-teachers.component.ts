import { Component, OnInit } from "@angular/core";
import { Teacher } from "../../models/teacher.model";
import { TeacherService } from "../../services/api/teacher-service/teacher.service";
declare var $: any;

@Component({
  selector: "app-list-teachers",
  templateUrl: "./list-teachers.component.html",
  styleUrls: ["./list-teachers.component.css"],
})
export class ListTeachersComponent implements OnInit {
  // public teacherList: Teacher[];
  // public addTeacher: Teacher;
  // public selectedTeacher: Teacher;

  // constructor(private teacherService: TeacherService) {
  //   this.addTeacher = new Teacher();
  //   this.addTeacher.teacherSalary = 0;
  //   this.selectedTeacher = new Teacher();
  // }

  // private getTeachers() {
  //   this.teacherService.getTeachersList()
  //   .subscribe(data => {
  //     this.teacherList = data;
  //   });
  // }

  ngOnInit(): void {
    // this.getTeachers();
  }

  // public onSubmit() {

  //   this.teacherService.addTeacher(this.addTeacher)
  //     .subscribe(response => {
  //       console.log(response)},
  //                error => {
  //       console.log(error);
  //     });
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 100);
  // }

  // public onSelect(teacher: Teacher) {
  //   this.selectedTeacher = teacher;
  // }

  // public editTeacher(teacher: Teacher) {
  //   this.addTeacher = teacher;
  // }

  // public deleteTeacher(teacher: Teacher) {
  //   this.teacherService.deleteTeacher(teacher.id);
  // }

  // public cleanTeacher() {
  //   this.addTeacher = new Teacher();
  // }

  // public showSalary() {
  //   $("#salaryText").html('Salary: ' + this.selectedTeacher.teacherSalary);
  // }

  // public closeSalary() {
  //   $("#salaryText").html('Show salary');
  // }
}
