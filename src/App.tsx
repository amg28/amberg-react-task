import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProjectListPage from "./pages/ProjectListPage";
import NewProjectPage from "./pages/NewProjectPage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Router>
      <Routes>
        <Route path="/" element={<ProjectListPage />} />
        <Route path="/new" element={<NewProjectPage />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
};

export default App;
