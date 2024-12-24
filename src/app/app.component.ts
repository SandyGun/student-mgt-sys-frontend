import {Component} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {StudentService} from './services/student.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddEditStudentPopupComponent} from './components/add-edit-student-popup/add-edit-student-popup.component';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

interface Student {
  id: number;
  index: string;
  name: string;
  dob: string;
  gpa: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754,
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199,
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463,
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397,
  },
];


@Component({
  selector: 'app-root',
  imports: [DecimalPipe],
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
        console.log('Modal closed with:', result);
      },
      (reason) => {
        console.log('Modal dismissed with:', reason);
      }
    );
  }
}
