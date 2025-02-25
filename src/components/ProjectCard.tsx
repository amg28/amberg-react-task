import { FC } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { format } from "date-fns";

interface ProjectCardProps {
  name: string;
  lastModified: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ name, lastModified }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body2">
          {format(new Date(lastModified), "PPpp")}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
