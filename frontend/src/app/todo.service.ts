import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const API = '/proxy/8080/api/todos';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);

  list() {
    return this.http.get<Todo[]>(API);
  }

  create(title: string) {
    return this.http.post<Todo>(API, { title, completed: false });
  }

  update(todo: Todo) {
    return this.http.put<Todo>(`${API}/${todo.id}`, todo);
  }

  delete(id: number) {
    return this.http.delete<void>(`${API}/${id}`);
  }
}
