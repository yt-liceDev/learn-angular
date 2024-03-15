import {
  Component,
  EventEmitter,
  Output,
  inject,
  input,
  signal,
} from '@angular/core';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css',
})
export class ItemsComponent {
  private todoService = inject(TodosService);
  isEdit = signal(false);
  todo = input.required<Item>();
  @Output() remove = new EventEmitter<string>();

  setEdit(val: boolean) {
    this.isEdit.set(val);
  }

  isDone() {
    this.todo().done = !this.todo().done;
    this.todoService.editTodo(this.todo()).subscribe();
  }

  saveEdit(item: Item) {
    this.todoService.editTodo(item).subscribe();
    this.setEdit(false);
    this.todo().description = item.description;
  }
}
