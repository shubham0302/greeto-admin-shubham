import { Box, LinearProgress, Rating, Typography } from "@mui/material";
import { FC } from "react";

type StarRatingTypes = {
  rating: number;
  percentage: number;
};

const StarRating: FC<StarRatingTypes> = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        gap: 2,
      }}
    >
      <Rating value={props.rating} />
      <Typography variant="bodyLr" color={"gray.700"} whiteSpace={"nowrap"}>
        {" "}
        {props.rating} Star
      </Typography>
      <LinearProgress
        color="warning"
        sx={{ width: "100%" }}
        variant="determinate"
        value={props.percentage}
      />
      <Typography variant="bodyLr" color={"gray.800"} fontWeight={"600"}>
        {props.percentage.toFixed()}%
      </Typography>
    </Box>
  );
};

export default StarRating;
