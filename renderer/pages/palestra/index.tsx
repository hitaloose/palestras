import { useCallback, useEffect, useState } from "react";

import { Palestra } from "../../entities/Palestra";
import PalestraRepo from "../../repo/PalestraRepo";
import { AddFab } from "../../components/AddFab";
import { DataGrid } from "../../components/DataGrid";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { PageContainer } from "../../components/PageContainer";
import { makeDeleteCell, makeEditCell } from "../../helpers/data-grid";
import { dialog } from "../../helpers/dilaog";
import { dateToString } from "../../helpers/date";

export default function () {
  const { push } = useRouter();

  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [palestras, setPalestras] = useState<Palestra[]>([]);
  const [palestrasCount, setPalestrasCount] = useState(0);

  const getPalestras = useCallback(async (page: number) => {
    const getted = await PalestraRepo.findAll({ page });
    const gettedCount = await PalestraRepo.count();
    setPalestras(getted);
    setPalestrasCount(gettedCount);
  }, []);

  const deletePalestra = useCallback(async (id: string) => {
    try {
      setLoading(true);

      await PalestraRepo.delete(id);
      await getPalestras(1);
      setPageIndex(0);
      toast.success("Palestra removida com sucesso");
    } catch (error) {
      toast.error("Erro ao excluir palestra");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDidMount = useCallback(async () => {
    try {
      setLoading(true);

      await getPalestras(1);
    } catch (error) {
      toast.error("Erro ao obter lista de palestras");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChangePage = useCallback(async (newPageIndex: number) => {
    try {
      setLoading(true);

      await getPalestras(newPageIndex + 1);
      setPageIndex(newPageIndex);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddClick = useCallback(() => {
    push("/palestra/new");
  }, []);

  const handleEditClick = useCallback((id: string) => {
    push(`/palestra/${id}`);
  }, []);

  const handleDeleteClick = useCallback((id: string) => {
    dialog({
      title: "Atenção",
      content: "Deseja realmente deletar a palestra?",
      onConfirm: () => deletePalestra(id),
    });
  }, []);

  useEffect(() => {
    handleDidMount();
  }, [handleDidMount]);

  return (
    <>
      <PageContainer>
        <DataGrid
          loading={loading}
          getRowId={(row) => row._id}
          rows={palestras}
          rowCount={palestrasCount}
          page={pageIndex}
          onPageChange={handleChangePage}
          columns={[
            { field: "_id", headerName: "Código", sortable: false },
            {
              field: "data",
              headerName: "Data",
              width: 200,
              sortable: false,
              renderCell: ({ value }) => dateToString(value),
            },
            {
              field: "orador.nome",
              headerName: "Orador",
              flex: 1,
              sortable: false,
              renderCell: ({ row }) =>
                `${row.orador.nome} (${row.orador.congregacao})`,
            },
            {
              field: "discurso.nome",
              headerName: "Discurso",
              flex: 1,
              sortable: false,
              renderCell: ({ row }) => row.discurso.nome,
            },
            makeEditCell(handleEditClick),
            makeDeleteCell(handleDeleteClick),
          ]}
        />
      </PageContainer>

      <AddFab onClick={handleAddClick} />
    </>
  );
}
