import { DataGrid as MuiDataGrid, DataGridProps, ptBR } from "@mui/x-data-grid";
import { PAGE_SIZE } from "../../helpers/constants";

export const DataGrid = (props: DataGridProps) => {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ flexGrow: 1 }}>
        <MuiDataGrid
          {...props}
          density="standard"
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          disableColumnFilter
          disableColumnSelector
          disableColumnMenu
          disableSelectionOnClick
          rowsPerPageOptions={[20]}
          paginationMode="server"
          pageSize={PAGE_SIZE}
        />
      </div>
    </div>
  );
};
