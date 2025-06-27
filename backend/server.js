const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer"); 
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded images statically

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Configure Multer for storing uploaded images
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

// Define Project Schema & Model
const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String, // Either a URL or local file path
});

const Project = mongoose.model("Project", projectSchema);

// GET Projects API
app.get("/api/projects", async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: "Error fetching projects" });
    }
});

// POST Project API (Supports Both Image Upload and URL)
app.post("/api/projects", upload.single("image"), async (req, res) => {
    try {
        const { title, description, imageUrl } = req.body;
        
        // Validate input
        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required." });
        }

        let imagePath = imageUrl || null;
        
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`; // Store uploaded image path
        }

        const newProject = new Project({ title, description, imageUrl: imagePath });
        await newProject.save();

        res.status(201).json(newProject);
    } catch (error) {
        console.error("Error adding project:", error);
        res.status(500).json({ error: "Error adding project." });
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
