import { FC } from "react";
import PageLayout from "../layout/PageLayout";
import { Button } from "@mui/material";

const NewProjectPage: FC = () => {
  return (
    <PageLayout
      subtitle="Create project"
      actions={
        <Button variant="contained" type="submit">
          + Create
        </Button>
      }
    >
      <></>
      {/* Form */}
    </PageLayout>
  );
};

export default NewProjectPage;
