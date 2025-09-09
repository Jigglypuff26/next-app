import { Box } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "testPage",
  description: "Описание",
};

const testPageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Box>
        {children}
    </Box>
  );
}

export default testPageLayout;
