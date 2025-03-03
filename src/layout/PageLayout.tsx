import { FC, ReactNode } from "react";
import { Box, Container } from "@mui/material";
import Header from "./Header";

interface PageLayoutProps {
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({
  subtitle,
  actions,
  children,
}) => {
  return (
    <Container maxWidth="lg">
      <Header subtitle={subtitle} actions={actions} />
      <Box sx={{ my: (theme) => theme.spacing(2) }}>{children}</Box>
    </Container>
  );
};

export default PageLayout;
