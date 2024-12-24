import {Component, Input} from '@angular/core';
import {NgbActiveModal, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {Student} from '../../models/student';
import {StudentService} from '../../services/student.service';

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

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private studentService: StudentService
  ) {
    this
      .studentForm = this.fb.group({
      index: ['', Validators.required],
      name: ['', Validators.required],
      dob: ['', Validators.required],
      gpa: [
        '',
        [Validators.min(0), Validators.max(4)]
      ]
    });
  }

  submitForm() {
    if (this.studentForm.valid) {
      console.log(this.studentForm.value); // You can send this data to the backend or process it further
      // this.activeModal.close(this.studentForm.value);

      if (this.type === 'add') {
        const requestData: Student = {
          id: null,
          index: this.studentForm.value.index,
          name: this.studentForm.value.name,
          dob: this.getFormattedDob(this.studentForm.value.dob),
          gpa: null,
        }
        console.log(requestData)

        this.studentService.createStudent(requestData).subscribe(createStudentResponse => {
          if (createStudentResponse) {
            this.activeModal.close('success');
          }
        });
      } else {

      }
    }
  }

  getFormattedDob(dob: { year: number; month: number; day: number }): string {
    const year = dob.year;
    const month = dob.month < 10 ? `0${dob.month}` : dob.month; // Add leading zero to single-digit months
    const day = dob.day < 10 ? `0${dob.day}` : dob.day;         // Add leading zero to single-digit days
    return `${year}-${month}-${day}`;
  }
}

