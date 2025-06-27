import "../styles.css";
import { useEffect, useState } from "react";
import { fetchProjects } from "../services/api";
import { useSpring, animated } from "@react-spring/web";
import { Link } from "react-router-dom";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProjects()
            .then((data) => {
                setProjects(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching projects:", err);
                setError("Error fetching projects");
                setLoading(false);
            });
    }, []);

    const fadeInAnimation = useSpring({
        from: { opacity: 0, transform: "translateY(20px)" },
        to: { opacity: 1, transform: "translateY(0)" },
        config: { duration: 800 }
    });

    if (loading) return <p>Loading projects...</p>;
    if (error) return <p>{error}</p>;

    return (
        <animated.div style={fadeInAnimation}>
            <h2>Portfolio Projects</h2>
            
            {/* Button to navigate to the Upload Page */}
            <Link to="/upload">
                <button className="upload-btn">Add a New Project</button>
            </Link>

            {projects.length > 0 ? (
                projects.map((project) => (
                    <div key={project._id || project.title} className="project-card">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        {project.imageUrl && (
                            <img
                                src={project.imageUrl.startsWith("http") ? project.imageUrl : `${process.env.REACT_APP_BACKEND_URL}${project.imageUrl}`}
                                alt={project.title}
                            />
                        )}
                    </div>
                ))
            ) : (
                <p>No projects found. Add some projects to display.</p>
            )}
        </animated.div>
    );
};

export default ProjectList;
