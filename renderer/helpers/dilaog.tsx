import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";

type Props = {
  title?: string;
  content?: string;
  onConfirm?: (...args: any[]) => unknown;
};

export const dialog = ({ title, content, onConfirm }: Props) => {
  const Dialog = () => {
    const handleConfirm = () => {
      if (onConfirm) {
        onConfirm();
      }

      unrender();
    };

    return (
      <MuiDialog open onClose={unrender}>
        <DialogTitle>{title || "Atenção"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content || " "}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={unrender}>Cancelar</Button>
          <Button onClick={handleConfirm} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </MuiDialog>
    );
  };

  const div = document.createElement("div");
  div.setAttribute("id", "dialog");

  const body = document.querySelector("body");
  body?.appendChild(div);

  const root = ReactDOM.createRoot(
    document.getElementById("dialog") as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <Dialog />
    </React.StrictMode>
  );

  const unrender = () => {
    root.unmount();
    const body = document.querySelector("body");
    body?.removeChild(div);
    div.remove();
  };
};
