import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { Teacher, TeacherGallery } from "src/app/models";
import { LocalStorageService } from "src/app/services/api/localstorage-service/localstorage.service";
import { TeacherService } from "src/app/services/api/teacher-service/teacher.service";
import { UploadDailogComponent } from "../upload-dailog/upload-dailog.component";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.css"],
})
export class GalleryComponent implements OnInit {
  teacherDetails: Teacher;
  teacherGallery: TeacherGallery[];
  dailog: MatDialogRef<UploadDailogComponent>;
  isLoading: Boolean = false;
  @ViewChild("imgFile") file: any;
  @ViewChild("addButton") addButton: ElementRef;
  constructor(
    private teacherService: TeacherService,
    private localstorage: LocalStorageService,
    private matDailog: MatDialog
  ) {
    this.teacherDetails = new Teacher();
  }
  ngAfterViewInit(): void {
    window.addEventListener("scroll", () => {
      let addBtn = document.getElementById("addBtn");
      let galleryTab = document.getElementById("galleryTab");
      if (addBtn) {
        console.log(galleryTab.scrollTop);
        if (
          window.scrollY >
          galleryTab.offsetTop + galleryTab.clientHeight - 50
        ) {
          addBtn.classList.replace("hide", "show");
        } else if (
          window.scrollY <
          galleryTab.offsetTop + galleryTab.clientHeight - 50
        ) {
          addBtn.classList.replace("show", "hide");
        }
      }
    });
  }

  getTeacherGallery() {
    this.isLoading = true;
    this.teacherService.getTeachersMedia().subscribe((res: any) => {
      console.log(res);
      this.teacherGallery = res;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.getTeacherGallery();
    let user = this.localstorage.get("user");
    this.teacherService.getTeachersDetails(user.userName).subscribe((res) => {
      this.teacherDetails = res;
    });
    this.matDailog.afterAllClosed.subscribe(() => {
      console.log("called");

      this.getTeacherGallery();
    });
  }

  handleAdd() {
    this.dailog = this.matDailog.open(UploadDailogComponent, {
      disableClose: true,
    });
  }
}
