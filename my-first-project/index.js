// Lab 1

import chalk from 'chalk';

let tasks = [
    { id: 1, description: "Выучить JS", status: "process" },
    { id: 2, description: "Выучить React", status: "сompleted" },
    { id: 3, description: "Сделать домашку", status: "not started" }
  ];


  function printTasks(array) {
    for (let task of array) {
      console.log(task);
    }
  }

  console.log(chalk.blue('Обычное сообщение'));
  console.log(chalk.red('ERROR 404'));

printTasks(tasks);


// Lab 2

import {Task} from './task.js'

let task1 = new Task(1, "Выучить JS", "process");
let task2 = new Task(2, "Выучить React", "process");
let task3 = new Task(3, "Сделать домашку", "not started");

console.log(task1.toString());


import mongoose from 'mongoose';
import 'dotenv/config';
import {TaskManager} from './task-manager.js'

const taskManager = new TaskManager();
const mongoUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;

mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected');
    taskManager.loadTasks();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
  