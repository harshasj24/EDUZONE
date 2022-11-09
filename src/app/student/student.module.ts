import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListStudentsComponent } from "./list-students/list-students.component";
import { StudentComponent } from "./student.component";
import { MaterialModule } from "../material";
import { RouterModule, Routes } from "@angular/router";
const routes: Routes = [
  {
    path: "allStudents",
    component: ListStudentsComponent,
  },
  {
    path: ":userName",
    component: StudentComponent,
  },
];
@NgModule({
  declarations: [ListStudentsComponent, StudentComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class StudentModule {}
