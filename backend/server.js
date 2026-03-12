const express = require("express");
const cors = require("cors");
const db=require('./mysqlconnect')
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.json({message:"welcome"})
})
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from Backend 🚀" });
});
app.get("/api/users", async (req, res) => {
  try {
    // const [rows] = await db.query(
    //   "SELECT 'Hello from MySQL 🚀' AS message"
    // );
    const [rows]=await db.query("SELECT * from users")
    console.log(rows)
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    await db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
    res.json({ message: "User added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

console.log(process.env.PORT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});