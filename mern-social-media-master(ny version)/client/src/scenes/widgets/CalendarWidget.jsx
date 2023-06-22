import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const CalendarWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Calendar
        </Typography>
        <Typography color={medium}>June 2023</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="calendar"
        src="https://i.pinimg.com/236x/cb/5b/7f/cb5b7f9f1e9322da5950756c1bc32c54.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>happy june!</Typography>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default CalendarWidget;
