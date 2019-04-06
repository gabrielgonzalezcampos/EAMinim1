import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Environment } from "./environment";

@Injectable({
  providedIn: 'root'
})
export class SubjectServices {

  environment: Environment;

  constructor(private http: HttpClient) {
    this.environment = new Environment();
  }

  obtainSubjects() {
    return this.http.get(this.environment.urlUser + "subs", {observe: 'response'})
  }

  obtainSubject(subjectId) {
    return this.http.get(this.environment.urlUser + "sub/"+subjectId, {observe: 'response'})
  }
}
