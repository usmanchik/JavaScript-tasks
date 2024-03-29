// класс Task с конструктором, принимающим параметры для инициализации свойств id, description, и status
export class Task {
  constructor(id, description, status) {
    this.id = id;
    this.description = description;
    this.status = status;
  }
// Вывод информации о задаче
  toString() {
    return `Task ID: ${this.id}\nDescription: ${this.description}\nStatus: ${this.status}`;
  }
}