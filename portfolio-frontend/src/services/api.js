import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Ensure correct backend URL

export const fetchProjects = async () => {
    try {
        const response = await axios.get(`${API_URL}/projects`);
        return response.data;
    } catch (error) {
        console.error("Error fetching projects:", error.response ? error.response.data : error);
        throw error;
    }
};

export const addProject = async (projectData) => {
    try {
        const response = await axios.post(`${API_URL}/projects`, projectData);
        return response.data;
    } catch (error) {
        console.error("Error adding project:", error.response ? error.response.data : error);
        throw error;
    }
};
