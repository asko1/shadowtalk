import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton } from "@mui/material";
import homeStyle from "../../styles/Home.module.css";
import React from 'react';

export default function ExitButton(props: any) {
  const refresh = () => window.location.reload()
  return (
    <IconButton
      color="error"
      className={homeStyle.ExitButton}
      disabled={!props.kms}
    >
      <CancelIcon
      onClick={ refresh }
       />
    </IconButton>
  );
}
