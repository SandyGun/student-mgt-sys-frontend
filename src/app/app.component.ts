import {Component} from '@angular/core';
import {StudentService} from './services/student.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddEditStudentPopupComponent} from './components/add-edit-student-popup/add-edit-student-popup.component';
import {Student} from './models/student';

// comment

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
      this.students = allStudentsData;
    })
  }

  openAddEditStudentPopup(studentData: any = null) {
    const modalRef = this.modalService.open(AddEditStudentPopupComponent, {
      size: 'lg', // Options: 'sm', 'lg', 'xl'
      backdrop: 'static', // Disable closing by clicking outside
      keyboard: false // Disable closing with the ESC key
    });

    modalRef.componentInstance.setType = studentData === null ? 'add' : 'edit';
    modalRef.componentInstance.studentData = studentData;


    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.getAllStudents();
        }
      }
    );
  }


  deleteStudent(studentData: any) {
    this.studentService.deleteStudent(studentData.id).subscribe(deleteStudentResponse => {
      if (deleteStudentResponse) {
        this.getAllStudents();
      }
    });
  }
}
