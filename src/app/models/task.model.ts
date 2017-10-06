import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export class Task {
  constructor(
    public _id: number,
    public title: string,
    public isDone: boolean
  ) { }
}

@Injectable()
export class TaskFactory {
  constructor(private http: Http) { }

  private tasksUrl = 'http://localhost:3000/api/tasks';
  private taskUrl = 'http://localhost:3000/api/task';

  findAllTasks(): Observable<Task[]> {
    return this.http.get(this.tasksUrl)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  createTask(task): Observable<Response> {
    return this.http.post(this.taskUrl, task);
  }

  updateStatus(task) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/api/task/' + task._id, task, {headers: headers})
    .map(res => res.json());
  }

  deleteTask(id) {
    return this.http.delete('http://localhost:3000/api/task/' + id)
      .map(res => {
        res.json();
      });
  }
}

