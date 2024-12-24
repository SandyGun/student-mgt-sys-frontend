import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditStudentPopupComponent } from './add-edit-student-popup.component';

describe('AddEditStudentPopupComponent', () => {
  let component: AddEditStudentPopupComponent;
  let fixture: ComponentFixture<AddEditStudentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditStudentPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditStudentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
