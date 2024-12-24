import {Component, Input} from '@angular/core';
import {NgbActiveModal, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-add-edit-student-popup',
  imports: [
    NgbInputDatepicker,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './add-edit-student-popup.component.html',
  styleUrl: './add-edit-student-popup.component.scss'
})
export class AddEditStudentPopupComponent {

  @Input() type: string = 'add';
  studentForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      indexNumber: ['', Validators.required],
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gpa: [
        '',
        [Validators.min(0), Validators.max(4)]
      ]
    });
  }

  submitForm() {
    if (this.studentForm.valid) {
      console.log(this.studentForm.value); // You can send this data to the backend or process it further
      this.activeModal.close(this.studentForm.value);
    }
  }
}
