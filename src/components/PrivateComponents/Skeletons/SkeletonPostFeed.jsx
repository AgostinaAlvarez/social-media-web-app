import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/material/Skeleton";
import { useTheme } from "../../../context/ThemeContext";

const SkeletonPostFeed = () => {
  const { theme } = useTheme();

  return (
    <Card
      sx={{ width: "100%" }}
      style={{ backgroundColor: theme === "dark" ? "#181818" : "#ffffff" }}
    >
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            sx={theme === "dark" ? { bgcolor: "grey.900" } : {}}
            variant="circular"
            width={40}
            height={40}
          />
        }
        action={null}
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            sx={theme === "dark" ? { bgcolor: "grey.900" } : {}}
            style={{ marginBottom: 6 }}
          />
        }
        subheader={
          <Skeleton
            animation="wave"
            height={10}
            width="40%"
            sx={theme === "dark" ? { bgcolor: "grey.900" } : {}}
          />
        }
      />
    </Card>
  );
};

export default SkeletonPostFeed;
