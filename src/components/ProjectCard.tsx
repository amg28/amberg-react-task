import { FC } from "react";
import { Card, CardContent, Divider, styled, Typography } from "@mui/material";
import { format } from "date-fns";

interface ProjectCardProps {
  name: string;
  lastModified: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  width: "auto",
  height: "250px",
  margin: theme.spacing(1),
  padding: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  transition: "box-shadow 0.3s",
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
}));

const ProjectCard: FC<ProjectCardProps> = ({ name, lastModified }) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Divider sx={{ m: (theme) => theme.spacing(1) }} />
        <Typography variant="body2">Modified:</Typography>
        <Typography variant="body2">
          {format(new Date(lastModified), "PPpp")}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default ProjectCard;
