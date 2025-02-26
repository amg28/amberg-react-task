import { FC, useRef } from "react";
import PageLayout from "../layout/PageLayout";
import { Button } from "@mui/material";
import NewProjectForm, {
  NewProjectFormRef,
} from "../components/NewProjectForm";

const NewProjectPage: FC = () => {
  const formRef = useRef<NewProjectFormRef | null>(null);

  return (
    <PageLayout
      subtitle="Create project"
      actions={
        <Button
          variant="contained"
          onClick={() => formRef.current?.submitForm()}
        >
          + Create
        </Button>
      }
    >
      <NewProjectForm ref={formRef} />
    </PageLayout>
  );
};

export default NewProjectPage;
