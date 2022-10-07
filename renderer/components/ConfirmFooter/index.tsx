import { Box, Fab, Tooltip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

type Props = {
  onConfirm?: () => void;
  onCancel?: () => void;
};

export const ConfirmFooter = ({ onConfirm, onCancel }: Props) => {
  return (
    <Box
      sx={(theme) => ({
        position: "absolute",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      })}
    >
      <Tooltip title="Cancelar">
        <Fab
          sx={{ marginRight: 2 }}
          onClick={onCancel}
          color="primary"
          size="medium"
        >
          <CancelIcon />
        </Fab>
      </Tooltip>

      <Tooltip title="Confirmar">
        <Fab onClick={onConfirm} color="primary" size="medium">
          <CheckIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};
