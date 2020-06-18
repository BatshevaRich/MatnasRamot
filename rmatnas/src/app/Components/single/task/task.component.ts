import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MyTask } from '../../../Classes/MyTask';
import { User2} from '../../../Classes/user2';
import { HttpClient, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-my-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class MyTaskComponent implements OnInit {
  @Input() task: MyTask;
  @Input() num = 5;
  @Input() commend = '';
  @Output() done: EventEmitter<MyTask> = new EventEmitter<MyTask>();
  @Output() undone: EventEmitter<MyTask> = new EventEmitter<MyTask>();
  @Output() deleted: EventEmitter<MyTask> = new EventEmitter<MyTask>();
  constructor(private http: HttpClient) {}

  changes: boolean;
  ngOnInit() {this.changes = false; }
  onChckbokChange() {
    if (!this.changes) {
    this.done.emit(this.task);
    this.changes = true;
    } else {
      this.undone.emit(this.task);
      this.changes = false;
    }
  }
  taskDelete() {
    const head = {params: new HttpParams().set('value', 'hellow')};
    this.http.get<string[]>('http://localhost:51229/api/volunteer');
    //////////////////////// ???????????????????????????????????????????
    this.http.post('http://localhost:51229/api/volunteer', 'ggg', head).subscribe((data) => {

    });
    this.deleted.emit(this.task);
  }
}
