import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton } from "@mui/material";
import homeStyle from "../../styles/Home.module.css";

export default function ExitButton(props: any) {
  return (
    <IconButton
      color="error"
      className={homeStyle.ExitButton}
      disabled={!props.kms}
    >
      <CancelIcon />
    </IconButton>
  );
}
