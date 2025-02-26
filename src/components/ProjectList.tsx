import { FC } from "react";

import { Project } from "../data/schema";
import ProjectCard from "./ProjectCard";
import { Box, Grid2 as Grid } from "@mui/material";

interface ProjectListProps {
  projects: Project[] | undefined;
}

const ProjectList: FC<ProjectListProps> = ({ projects }) => {
  return (
    <Box>
      <Box mt={2}>
        <Grid container spacing={2} columns={5}>
          {projects?.map((project) => (
            <Grid key={project.id} size={{ xs: 5, sm: 2.5, md: 1 }}>
              <ProjectCard
                name={project.projectInfo.name}
                lastModified={project.modifiedDate}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProjectList;
