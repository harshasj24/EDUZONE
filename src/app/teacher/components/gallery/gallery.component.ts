import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { Teacher, TeacherGallery } from "src/app/models";
import { LocalStorageService } from "src/app/services/localstorage-service/localstorage.service";
import { TeacherService } from "src/app/services/api/teacher-service/teacher.service";
import { UploadDailogComponent } from "../upload-dailog/upload-dailog.component";
import { StoreService } from "../../service/store.service";
import { LoaderService } from "src/app/services/loader/loader.service";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.css"],
})
export class GalleryComponent implements OnInit {
  // teacherDetails: Teacher;
  teacherGallery: TeacherGallery[];
  dailog: MatDialogRef<UploadDailogComponent>;
  isLoading: Boolean = false;
  @ViewChild("imgFile") file: any;
  @ViewChild("addButton") addButton: ElementRef;
  constructor(
    private teacherService: TeacherService,
    private localstorage: LocalStorageService,
    private matDailog: MatDialog,
    public store: StoreService,
    private loader: LoaderService
  ) {
    // this.teacherDetails = new Teacher();
  }
  isTeacher = this.store.isTeacher();
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

  // getTeacherGallery() {
  //   this.isLoading = true;
  //   this.teacherService.getTeachersMedia().subscribe((res: any) => {
  //     console.log(res);
  //     this.teacherGallery = res;
  //     this.isLoading = false;
  //   });
  // }

  ngOnInit(): void {
    // this.getTeacherGallery();
    this.store.getTeacherGallery();
    this.store.teacherStore.subscribe((val) => {
      this.teacherGallery = val.teacherGallery;
    });
    let user = this.localstorage.get("user");
    // this.teacherService.getTeachersDetails(user.userName).subscribe((res) => {
    //   this.teacherDetails = res;
    // });
    this.store.uploadGalleryDailog?.afterClosed().subscribe(() => {
      console.log("called");

      // this.getTeacherGallery();
    });
  }

  handleAdd() {
    this.store.uploadGalleryDailog = this.matDailog.open(UploadDailogComponent);
  }

  deleteImage(url: string) {
    let urlArr = url.split("/");
    console.log(urlArr[urlArr.length - 1]);

    this.teacherGallery = this.teacherGallery.filter((el) => el.url !== url);
    this.teacherService
      .deleteTeacher(urlArr[urlArr.length - 1])
      .subscribe((res) => {
        console.log(res);
      });
  }
}
