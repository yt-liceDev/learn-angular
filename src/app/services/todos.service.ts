import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos: Item[] = [];
  private url = 'http://localhost:8000/todos';
  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<Item[]>(this.url);
  }

  postTodo(todo: Item) {
    return this.http.post<Item>(this.url, todo);
  }

  removeTodo(id: string) {
    return this.http.delete<string>(`${this.url}/${id}`);
  }

  editTodo(item: Item) {
    return this.http.put<Item>(`${this.url}/${item.id}`, item);
  }
}
