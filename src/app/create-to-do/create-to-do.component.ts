import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TodoHttpService } from '../service/todo-http.service';

@Component({
  selector: 'app-create-to-do',
  templateUrl: './create-to-do.component.html',
  styleUrls: ['./create-to-do.component.css'],
})
export class CreateToDoComponent {
  @Output()
  created = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private todoHttpService: TodoHttpService
  ) {}

  todoForm = this.formBuilder.group({
    title: '',
    description: '',
  });

  onSubmit() {
    const formValues = this.todoForm.value;
    if (formValues.title && formValues.description) {
      this.todoHttpService
        .create(formValues.title, formValues.description)
        .subscribe(() => {
          this.todoForm.reset();
          this.created.emit();
        });
    }
  }
}
