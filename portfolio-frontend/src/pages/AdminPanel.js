import { Link } from "react-router-dom";
import "../styles.css";
import { useState } from "react";
import { addProject } from "../services/api";

const AdminPanel = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        if (!title || !description) {
            setMessage("Title and Description are required.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        
        if (imageFile) {
            formData.append("image", imageFile);
        } else if (imageUrl) {
            formData.append("imageUrl", imageUrl);
        }

        try {
            await addProject(formData);
            setMessage("Project Added Successfully!");
            setTitle("");
            setDescription("");
            setImageUrl("");
            setImageFile(null);
        } catch (error) {
            setMessage("Error adding project.");
        }
    };

    return (
        <div className="admin-container">
            <h2>Admin Panel - Add Project</h2>

            {/* Home Button */}
            <Link to="/">
                <button className="home-btn">Back to Home</button>
            </Link>

            <form onSubmit={handleAddProject} encType="multipart/form-data">
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

                <label>Upload Image from PC:</label>
                <input type="file" onChange={handleFileChange} accept="image/*" />

                <label>Or Enter Image URL:</label>
                <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

                <button type="submit">Add Project</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AdminPanel;
