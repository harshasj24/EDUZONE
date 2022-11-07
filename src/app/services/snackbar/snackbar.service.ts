import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar:MatSnackBar) { }
  success(message:string){
    this.snackbar.open(message,"X",{panelClass:"success",duration:5000,horizontalPosition:"end",verticalPosition:"top"})
  }
  error(message:string){
    this.snackbar.open(message,"X",{panelClass:"error",duration:5000})
  }
}
