import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Button from "@mui/material/Button";
import homeStyle from "../../styles/Home.module.css";

export default function NextButton(props: any) {
  return (
    <Button
      disabled={!props.kms}
      className={homeStyle.NextButton}
      endIcon={<NavigateNextIcon />}
      // onClick={}
    >
      Next
    </Button>
  );
}
