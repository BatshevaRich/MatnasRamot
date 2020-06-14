import { Component, OnInit } from '@angular/core';
import { MyTask} from '../../../Classes/MyTask';
@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {
  tasks: MyTask[] = [];
  sumDone: number;
  constructor() {
    this.tasks.push(new MyTask(1, 'להזמין פרסומת בלוח קיר', '02/05/2019'));
    this.tasks.push(new MyTask(2, 'לברר בקשר למשפחת לוי', '02/05/2019'));
    this.tasks.push(
      new MyTask(3, 'להודיע לאסתי רפפורט לא לבוא השבוע למשחקיה', '02/05/2019')
    );
    this.sumDone = this.tasks.length;
  }
  search = '';
  ngOnInit() {
  }

  taskUnDone(task) {
    this.sumDone += 1;
  }

  taskDone(task) {
    this.sumDone -= 1;
  }
  deleteTask(task) {
  this.tasks.splice(this.tasks.indexOf(task), 1);
  }
  newTask(task){
   this.tasks.push(task);
   this.sumDone += 1;
  }
}
