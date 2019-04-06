import {Student} from "./student";

export class Subject {
  _id: string;
  name: string;
  address: string
  students:[Student]

  constructor(name: string, address: string, students: [Student]) {
    this.name = name;
    this.address = address;
    this.students = students;
  }
}
