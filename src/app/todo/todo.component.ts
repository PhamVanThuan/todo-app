import { Component, OnInit } from '@angular/core';
import { TechStackService, TodoService } from '../services';
import { TodoModel } from '../models';
import { Observable } from 'rxjs/Rx';

@Component({

  selector: 'my-todo-form',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6 add-todo">
          <h1>Add a Todo Item</h1>
          <form *ngIf="active" (submit)="onSubmit()" #myTodoForm="ngForm">
            <div class="form-group">
              <label for="item">Item:</label>
              <input type="text" required="" [(ngModel)]="model.item" name="item" #item="ngModel" class="form-control"/>
              <div [hidden]="item.valid || item.pristine" class="alert alert-danger">Item is required</div>
            </div>
            <button type="submit" [disabled]="!myTodoForm.form.valid" class="btn btn-default">Create New Todo</button>
          </form>
        </div>
        <div class="col-md-5">
          <my-list-of-todos [todos]="todos"></my-list-of-todos>
        </div>
      </div>
      <div class="row">
        <p>This app was built using {{techStack}}</p>
      </div>
    </div>
  `,
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  model: TodoModel = new TodoModel();
  submitted: boolean = false;
  active: boolean = true;
  todos: Array<TodoModel> = [];
  techStack: String = '';

  constructor(private _techStack: TechStackService, private _todoService: TodoService) {
  }

  ngOnInit() {
    this.techStack = this._techStack.technologies();
    this._todoService.getTodos().subscribe(
      data => {
        this.todos = data;
      }
    );
  }

  onSubmit() {
    this.active = false;
    this.submitted = true;
    this._todoService.addTodos(this.model).subscribe(
      data => {
        this.todos = data;
      }
    );
    this.model = new TodoModel();
    setTimeout(() => this.active = true, 0);
  }
}
