import { useImperativeHandle, Ref } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Box, Grid2 as Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import {
  ProjectInfo,
  newProjectValidationSchema as schema,
} from "../data/schema";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import TemplateSelector from "./inputs/TemplateSelector";

export interface NewProjectFormRef {
  submitForm: () => void;
}

interface NewProjectFormProps {
  ref: Ref<NewProjectFormRef>;
}

const NewProjectForm = ({ ref }: NewProjectFormProps) => {
  const navigate = useNavigate();
  const { createProject } = useProjects();

  const { control, handleSubmit } = useForm<ProjectInfo>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: ProjectInfo) => {
    createProject(
      { ...data },
      {
        onSuccess: () => navigate("/"),
        onError: (error) => console.error(error),
      }
    );
  };

  // Expose the submit function through the ref
  useImperativeHandle(ref, () => ({
    submitForm: () => handleSubmit(onSubmit)(),
  }));

  return (
    <Box component="form" sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="lineSectionName"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Line Section Name"
                fullWidth
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="trackName"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Track Name"
                fullWidth
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TemplateSelector control={control} name="projectTemplateId" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewProjectForm;
