export class MyTask {
  Id: number;
  description: string;
  date: string;
  isDone: boolean;
  constructor(id: number, description: string, date: string) {
    this.Id = id;
    this.description = description;
    this.date = date;
    this.isDone = false;
  }
}
