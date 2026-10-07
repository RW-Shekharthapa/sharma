import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo, TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private todoService = inject(TodoService);

  protected readonly todos = signal<Todo[]>([]);
  protected readonly newTitle = signal('');

  constructor() {
    this.todoService.list().subscribe(todos => this.todos.set(todos));
  }

  add() {
    const title = this.newTitle().trim();
    if (!title) return;
    this.todoService.create(title).subscribe(todo => {
      this.todos.update(todos => [...todos, todo]);
      this.newTitle.set('');
    });
  }

  toggle(todo: Todo) {
    this.todoService.update({ ...todo, completed: !todo.completed }).subscribe(updated => {
      this.todos.update(todos => todos.map(t => (t.id === updated.id ? updated : t)));
    });
  }

  remove(todo: Todo) {
    this.todoService.delete(todo.id).subscribe(() => {
      this.todos.update(todos => todos.filter(t => t.id !== todo.id));
    });
  }
}
