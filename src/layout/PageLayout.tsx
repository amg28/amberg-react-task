// src/layout/PageLayout.tsx
import React, { ReactNode } from "react";
import { Box, Container } from "@mui/material";
import Header from "./Header";

interface PageLayoutProps {
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  subtitle,
  actions,
  children,
}) => {
  return (
    <Container maxWidth="lg">
      <Header subtitle={subtitle} actions={actions} />
      <Box sx={{ my: 2 }}>{children}</Box>
    </Container>
  );
};

export default PageLayout;
