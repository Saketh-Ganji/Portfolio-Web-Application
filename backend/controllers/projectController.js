const Project = require('../models/Project');

const addProjectController = async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: "Error adding project" });
    }
};

const getProjectsController = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: "Error fetching projects" });
    }
};

module.exports = { addProjectController, getProjectsController };
