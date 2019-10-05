export class MyTask {
  id: number;
  description: string;
  date: string;
  isDone: boolean;
  constructor(id: number, description: string, date: string) {
    this.id = id;
    this.description = description;
    this.date = date;
    this.isDone = false;
  }
}
