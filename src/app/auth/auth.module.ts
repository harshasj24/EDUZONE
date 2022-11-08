import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material";
import { ConfirmDailogComponent } from './components/confirm-dailog/confirm-dailog.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ConfirmDailogComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
})
export class AuthModule {}
