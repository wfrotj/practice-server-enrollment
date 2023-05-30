const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const Student = require("./models/studentModel");
const PORT = process.env.PORT || 3001;
const MONGO_URI =
  "mongodb+srv://trebrodrigo:6vsdQHa0obUrDNpw@cluster0.rxxovym.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());
app.use(cors());

//get
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
  }
});
//getById
app.get("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
});
//post
app.post("/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});
//delete
app.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
});

//put
app.put("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, req.body);
    if (!student) {
      return res.status(404).json({ message: `${id} not found` });
    }
    const updatedStudent = await Student.findById(updatedStudent);

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
});
async function connectToDB(url) {
  try {
    await mongoose.connect(url);
    console.log("You are now connect to the database");
  } catch (error) {
    console.log(error);
  }
}
connectToDB(MONGO_URI);

app.listen(PORT, () => {
  console.log(`You are now live at port ${PORT}`);
});
