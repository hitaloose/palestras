import AddIcon from "@mui/icons-material/Add";
import { Fab, Tooltip } from "@mui/material";

type Props = {
  onClick?: () => void;
};

export const AddFab = ({ onClick }: Props) => {
  return (
    <Tooltip title="Incluir">
      <Fab
        onClick={onClick}
        sx={(theme) => ({
          position: "absolute",
          bottom: theme.spacing(2),
          right: theme.spacing(2),
        })}
        color="primary"
        size="medium"
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};
