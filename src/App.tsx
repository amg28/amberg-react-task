import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProjectListPage from "./pages/ProjectListPage";
import NewProjectPage from "./pages/NewProjectPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectListPage />} />
        <Route path="/new" element={<NewProjectPage />} />
      </Routes>
    </Router>
  );
};

export default App;
