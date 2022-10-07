import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridEnrichedColDef } from "@mui/x-data-grid";

export const makeEditCell = (
  onEditClick: (id: string) => void
): GridEnrichedColDef<any, any, any> => ({
  field: "edit",
  width: 50,
  headerName: " ",
  sortable: false,
  align: "center",
  renderCell: ({ id }) => (
    <IconButton color="info" onClick={() => onEditClick(String(id))}>
      <EditIcon />
    </IconButton>
  ),
});

export const makeDeleteCell = (
  onDeleteClick: (id: string) => void
): GridEnrichedColDef<any, any, any> => ({
  field: "delete",
  width: 50,
  headerName: " ",
  sortable: false,
  align: "center",
  renderCell: ({ id }) => (
    <IconButton color="error" onClick={() => onDeleteClick(String(id))}>
      <DeleteIcon />
    </IconButton>
  ),
});
