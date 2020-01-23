import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public mainForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.mainForm = this.fb.group({
      test: this.fb.array([])
    });
  }

  get apiCalls() {
    return this.mainForm.get('test') as FormArray;
  }

  public addTest() {
    (this.mainForm.get('test') as FormArray).push(this.fb.group({
      url: '',
      body: this.fb.array([this.setkeyVals()]),
      headers: this.fb.array([this.setkeyVals()])
    }));
  }

  public addBody(i) {
    const body = ((this.mainForm.get('test') as FormArray).controls[i].get('body') as FormArray);
    body.push(this.setkeyVals());
  }

  public addHeader(i) {
    const header = ((this.mainForm.get('test') as FormArray).controls[i].get('headers') as FormArray);
    header.push(this.setkeyVals());
  }

  public onSubmit() {
    console.log(this.mainForm.value);
  }

  private setkeyVals() {
    return this.fb.group({
      key: '',
      value: ''
    });
  }
}
