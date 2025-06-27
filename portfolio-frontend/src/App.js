import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectList from "./components/ProjectList";
import AdminPanel from "./pages/AdminPanel";
import "./styles.css"; // ✅ Import global styles

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Home Page showing projects */}
                <Route path="/" element={<ProjectList />} />

                {/* Upload Page for adding new projects */}
                <Route path="/upload" element={<AdminPanel />} />
            </Routes>
        </Router>
    );
};

export default App;
