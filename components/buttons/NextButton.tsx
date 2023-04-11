import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Button from "@mui/material/Button";
import homeStyle from "../../styles/Home.module.css";
import mobileStyle from "../../styles/mobile.module.css";

export default function NextButton(style: any) {
  return (
    <Button className={style.NextButton} endIcon={<NavigateNextIcon />}>
      Next
    </Button>
  );
}
