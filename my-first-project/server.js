// Создание простого HTTP-сервера (позволяет увидеть содержимое файла tasks.json)

// import fs from 'fs';
// import  http from 'http';

// const server = http.createServer((req, res) => {
//     fs.readFile('tasks.json', 'utf8', (err, data) => {
//         if (err) {
//             res.writeHead(500, {'Content-Type': 'text/plain'});
//             res.end("Error reading file.");
//             return;
//         }
//         res.writeHead(200, {'Content-Type': 'application/json'});
//         res.end(data);
//     });
// });

// server.listen(3000, () => {
//     console.log("Server running at http://localhost:3000/");
// });


// Создание базовой структуры сервера в server.js
import mongoose from "mongoose";
import express from 'express';
import 'dotenv/config';
import { TaskModel } from './TaskModel.js';
import {validateTaskData} from './middlewares/validateTaskData.js';

const mongoUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;

const app = express();
app.use(express.json());
const PORT = 3000;

mongoose.connect(mongoUri)

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.get('/tasks', async (req, res) => {
    try {
      const tasks = await TaskModel.find();
      res.json(tasks);
    } catch (err) {
      res.status(500).send(err.message);
    }
});

app.post('/tasks',validateTaskData, async (req, res) => {
    try {
      const newTask = new TaskModel(req.body);
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

  app.post('/tasks/:taskId', async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const deletedTask = await TaskModel.findOneAndDelete({ 'id': taskId });
      
      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(deletedTask);
    } catch (err) {
      res.status(400).send(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});