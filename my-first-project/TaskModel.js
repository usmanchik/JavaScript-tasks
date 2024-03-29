import mongoose from "mongoose";

const taskShema = new mongoose.Schema({
    id: String,
    description: String,
    status: String
});

export const TaskModel = mongoose.model("task", taskShema);
