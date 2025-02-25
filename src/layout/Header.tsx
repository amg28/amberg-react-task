// src/layout/Header.tsx
import React, { ReactNode } from "react";
import { Box, Typography, Stack, styled, Divider } from "@mui/material";

interface HeaderProps {
  subtitle?: string;
  actions?: ReactNode;
}

const StyledHeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  margin: theme.spacing(1, 2),
}));

const Header: React.FC<HeaderProps> = ({ subtitle, actions }) => {
  return (
    <Box>
      <Typography variant="h4">Amberg Entry Task UI</Typography>
      <Divider />
      <StyledHeaderContainer>
        {subtitle && (
          <Typography variant="subtitle1" color="text.secondary">
            {subtitle}
          </Typography>
        )}
        <Stack direction="row" spacing={2}>
          {actions}
        </Stack>
      </StyledHeaderContainer>
    </Box>
  );
};

export default Header;
