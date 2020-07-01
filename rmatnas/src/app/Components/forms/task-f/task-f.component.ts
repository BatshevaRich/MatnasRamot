import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { MyTask } from '../../../Classes/MyTask';

@Component({
  selector: 'app-task-f',
  templateUrl: './task-f.component.html',
  styleUrls: ['./task-f.component.css']
})
export class TaskFComponent implements OnInit {

  @Output()mySend:EventEmitter<MyTask>=new EventEmitter<MyTask>();
  newTask: MyTask = new MyTask(1, 'ברירת מחדל', 'ברירת מחדל');
  constructor() { }

  ngOnInit() {
  }
  submitForm(f) {
    // tslint:disable-next-line: max-line-length
    this.mySend.emit(this.newTask);
    f.reset();
  }

}
