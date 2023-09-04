import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-add-description',
  templateUrl: './add-description.component.html',
  styleUrls: ['./add-description.component.scss']
})
export class AddDescriptionComponent {
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
  };
  htmlContent:any;
  constructor(public dialogRef: MatDialogRef<AddDescriptionComponent>,@Inject(MAT_DIALOG_DATA) public data: { editData: any}) {
    this.htmlContent = this.data.editData;
  }
  close() {
    this.dialogRef.close()
  }

  submit() {
    this.dialogRef.close(this.htmlContent)
  }
}
