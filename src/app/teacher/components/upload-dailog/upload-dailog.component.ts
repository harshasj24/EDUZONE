import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { LocalStorageService } from "src/app/services/api/localstorage-service/localstorage.service";
import { TeacherService } from "src/app/services/api/teacher-service/teacher.service";

@Component({
  selector: "app-upload-dailog",
  templateUrl: "./upload-dailog.component.html",
  styleUrls: ["./upload-dailog.component.css"],
})
export class UploadDailogComponent implements OnInit {
  constructor(
    private teacherService: TeacherService,
    private localstorage: LocalStorageService,
    private matDailog: MatDialog
  ) {}
  @ViewChild("imgFile") file: any;
  dailog: MatDialogRef<UploadDailogComponent>;

  ngOnInit(): void {}
  handleUpload() {
    let imageFile = this.file.nativeElement.files[0];
    const formData = new FormData();
    formData.append("file", imageFile);
    this.teacherService.addTeacherMedia(formData).subscribe((res) => {
      console.log(res);
      this.matDailog.closeAll();
    });
  }
}
