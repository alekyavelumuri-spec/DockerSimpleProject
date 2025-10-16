const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 5050;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const MONGO_URL = "mongodb://admin:qwerty@mongo:27017";
const client = new MongoClient(MONGO_URL);

let db;

// Connect once at startup
async function connectDB() {
  await client.connect();
  db = client.db("student-db");
  console.log("MongoDB connected");
}

connectDB().catch(console.error);

// GET all students
app.get("/getStudents", async (req, res) => {
  try {
    const students = await db.collection("students").find({}).toArray();
    res.json(students);
  } catch (err) {
    res.status(500).send("Error fetching students");
  }
});

// POST new student
app.post("/addStudent", async (req, res) => {
  const student = req.body;
  try {
    await db.collection("students").insertOne(student);
    res.status(200).send("Student added");
  } catch (err) {
    res.status(500).send("Error adding student");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});