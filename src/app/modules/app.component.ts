import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskFactory, Task } from '../models/task.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TaskFactory]
})
export class AppComponent implements OnInit, OnDestroy {

  tasks: Task[];
  subscription: Subscription;
  title: string;

  constructor(private _taskFactory: TaskFactory) {

  }

  ngOnInit() {
    this.getAllTasks();
  }

  private getAllTasks(): void {
    this.subscription = this._taskFactory.findAllTasks()
      .subscribe(data => {
        this.tasks = data;
      });
  }

  private addTask(title): void {
    const task = {
      title: title,
      isDone: false
    };
    this._taskFactory.createTask(task)
      .subscribe(data => {
        this.tasks.push(data.json());
      });
    this.title = '';
  }

  private delete(id, position: number) {
    this._taskFactory.deleteTask(id)
      .subscribe(data => {
        this.tasks.splice(position, 1);
      });
  }

  private updateStatus(task) {
    const _task = {
      _id: task._id,
      title: task.title,
      isDone: !task.isDone
    };

    this._taskFactory.updateStatus(_task)
    .subscribe(data => task.isDone = !task.isDone);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
