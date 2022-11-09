import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { LoaderComponent } from "./loader/loader.component";
import { UploadProgressComponent } from "./upload-progress/upload-progress.component";
import { MaterialModule } from "../material";
import { ListLayoutComponent } from "./layouts/list-layout/list-layout.component";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    UploadProgressComponent,
    ListLayoutComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    UploadProgressComponent,
    ListLayoutComponent,
  ],
})
export class SharedModule {}
