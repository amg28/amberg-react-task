import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { ProjectInfo, ProjectTemplate } from "../../data/schema";
import { useProjectTemplates } from "../../hooks/useProjectTemplates";

interface TemplateSelectorProps {
  control: Control<ProjectInfo>;
  name: keyof ProjectInfo;
}

const TemplateSelector: FC<TemplateSelectorProps> = ({ control, name }) => {
  const { templates, isLoading } = useProjectTemplates();

  return (
    <FormControl fullWidth>
      <InputLabel id="template-select-label" variant="outlined">
        Select a Template
      </InputLabel>
      <Controller
        name={name}
        control={control}
        disabled={isLoading}
        render={({ field }) => (
          <Select {...field} labelId="template-select-label">
            {templates.map((template: ProjectTemplate) => (
              <MenuItem key={template.id} value={template.id}>
                {template.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default TemplateSelector;
