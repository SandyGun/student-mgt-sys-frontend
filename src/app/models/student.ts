export class Student {
  id: any;
  index: string;
  name: string;
  dob: string;
  gpa: any;

  constructor(id: number, index: string, name: string, dob: string, gpa: number) {
    this.id = id;
    this.index = index;
    this.name = name;
    this.dob = dob;
    this.gpa = gpa;
  }
}
