import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListTeachersComponent } from "./list-teachers/list-teachers.component";
import { TeacherComponent } from "./teacher.component";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../material";
import { UploadDailogComponent } from "./components/upload-dailog/upload-dailog.component";
import { SharedModule } from "../shared/shared.module";
import { GalleryComponent } from "./components/gallery/gallery.component";
import { CourcesComponent } from "./components/cources/cources.component";
import { UploadCourseComponent } from "./components/upload-course/upload-course.component";

const routes: Routes = [
  {
    path: "allTeachers",
    component: ListTeachersComponent,
  },
  {
    path: ":userName",
    component: TeacherComponent,
  },
];

@NgModule({
  declarations: [
    ListTeachersComponent,
    TeacherComponent,
    UploadDailogComponent,
    GalleryComponent,
    CourcesComponent,
    UploadCourseComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule,
  ],
})
export class TeacherModule {}
