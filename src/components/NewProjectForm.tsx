import React from "react";

const NewProjectForm: React.FC = () => {
  return (
    <>New Project</>
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <Controller
    //     name="projectName"
    //     control={control}
    //     render={({ field }) => (
    //       <TextField
    //         {...field}
    //         label="Project Name"
    //         error={!!errors.projectName}
    //         helperText={errors.projectName?.message}
    //       />
    //     )}
    //   />
    //   <Controller
    //     name="lineSectionName"
    //     control={control}
    //     render={({ field }) => (
    //       <TextField
    //         {...field}
    //         label="Line Section Name"
    //         error={!!errors.lineSectionName}
    //         helperText={errors.lineSectionName?.message}
    //       />
    //     )}
    //   />
    //   <Controller
    //     name="trackName"
    //     control={control}
    //     render={({ field }) => (
    //       <TextField
    //         {...field}
    //         label="Track Name"
    //         error={!!errors.trackName}
    //         helperText={errors.trackName?.message}
    //       />
    //     )}
    //   />
    //   <Button type="submit" variant="contained">
    //     Create Project
    //   </Button>
    // </form>
  );
};

export default NewProjectForm;
