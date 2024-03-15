import { Component, inject, signal } from '@angular/core';
import { ItemsComponent } from './items/items.component';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ItemsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  todosService = inject(TodosService);
  todos = signal(this.todosService.todos);

  ngOnInit() {
    this.todosService.getTodos().subscribe((data) => {
      this.todos.set(data);
      console.log(this.todos());
    });
  }

  addTodo(todo: Item) {
    this.todosService.postTodo(todo).subscribe();
    this.todos.update((old) => [todo, ...old]);
  }

  removeTodo(id: string) {
    this.todosService.removeTodo(id).subscribe();
    this.todos.update((ctx) => ctx.filter((item) => item.id !== id));
  }
}
