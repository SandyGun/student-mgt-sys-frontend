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

  type: any = null
  data: any = null

  @Input() set setType(data: any) {
    if (data) {
      this.type = data;
    }
  };

  @Input() set studentData(data: any) {
    if (data) {
      this.data = data;
      this.studentForm?.get('index')?.setValue(this.data?.index);
      this.studentForm?.get('name')?.setValue(this.data?.name);
      this.studentForm?.get('dob')?.setValue(this.convertStringToNgbDate(this.data?.dob));
      this.studentForm?.get('gpa')?.setValue(this.data?.gpa);
    }
  };

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
      gpa: ['']
    });


  }


  submitForm() {
    if (this.studentForm.valid) {
      if (this.type === 'add') {
        const requestData: Student = {
          id: null,
          index: this.studentForm.value.index,
          name: this.studentForm.value.name,
          dob: this.getFormattedDob(this.studentForm.value.dob),
          gpa: null,
        }

        this.studentService.createStudent(requestData).subscribe(createStudentResponse => {
          if (createStudentResponse) {
            this.activeModal.close('success');
          }
        });
      } else {
        const requestData: Student = {
          id: this.data.id,
          index: this.studentForm.value.index,
          name: this.studentForm.value.name,
          dob: this.getFormattedDob(this.studentForm.value.dob),
          gpa: this.studentForm.value.gpa,
        }
        this.studentService.updateStudent(requestData).subscribe(updateStudentResponse => {
          if (updateStudentResponse) {
            this.activeModal.close('success');
          }
        });
      }
    }
  }

  getFormattedDob(dob: { year: number; month: number; day: number }): string {
    const year = dob.year;
    const month = dob.month < 10 ? `0${dob.month}` : dob.month; // Add leading zero to single-digit months
    const day = dob.day < 10 ? `0${dob.day}` : dob.day;         // Add leading zero to single-digit days
    return `${year}-${month}-${day}`;
  }

  convertStringToNgbDate(dateString: string): { year: number; month: number; day: number } {
    const [year, month, day] = dateString.split('-').map(Number); // Split the string and convert to numbers
    return {year, month, day};
  }
}

