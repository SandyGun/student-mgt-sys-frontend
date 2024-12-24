import {Component} from '@angular/core';
import {StudentService} from './services/student.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddEditStudentPopupComponent} from './components/add-edit-student-popup/add-edit-student-popup.component';
import {Student} from './models/student';


@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  // countries = COUNTRIES;

  students: Student[] = []

  constructor(private studentService: StudentService, private modalService: NgbModal) {


    this.getAllStudents();
  }

  private getAllStudents() {
    this.studentService.getAllStudents().subscribe(allStudentsData => {
      console.log(allStudentsData);
      this.students = allStudentsData;
    })
  }

  openAddEditStudentPopup() {
    const modalRef = this.modalService.open(AddEditStudentPopupComponent, {
      size: 'lg', // Options: 'sm', 'lg', 'xl'
      backdrop: 'static', // Disable closing by clicking outside
      keyboard: false // Disable closing with the ESC key
    });

    modalRef.componentInstance.type = 'add';

    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.getAllStudents();
        }
      },
      (reason) => {
        console.log('Modal dismissed with:', reason);
      }
    );
  }
}
