import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Button from "@mui/material/Button";
import homeStyle from "../../styles/Home.module.css";

export default function NextButton() {
  return (
    <Button className={homeStyle.NextButton} endIcon={<NavigateNextIcon />}>
      Next
    </Button>
  );
}
