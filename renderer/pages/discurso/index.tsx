import { useCallback, useEffect, useState } from "react";

import { Discurso } from "../../entities/Discurso";
import DiscursoRepo from "../../repo/DiscursoRepo";
import { Toolbar } from "../../components/Toolbar";
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
  const [q, setQ] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [discursos, setDiscursos] = useState<Discurso[]>([]);
  const [discursosCount, setDiscursosCount] = useState(0);

  const getDiscursos = useCallback(async (page: number, q: string) => {
    const getted = await DiscursoRepo.findAll({ page, q });
    const gettedCount = await DiscursoRepo.count({ q });
    setDiscursos(getted);
    setDiscursosCount(gettedCount);
  }, []);

  const deleteDiscurso = useCallback(async (id: string) => {
    try {
      setLoading(true);

      await DiscursoRepo.delete(id);
      await getDiscursos(1, "");
      setPageIndex(0);
      setQ("");
      toast.success("Discurso removido com sucesso");
    } catch (error) {
      toast.error("Erro ao excluir discurso");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDidMount = useCallback(async () => {
    try {
      setLoading(true);

      await getDiscursos(1, "");
    } catch (error) {
      toast.error("Erro ao obter lista de discursos");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChangeQ = useCallback(async (newQ: string) => {
    try {
      setLoading(true);

      await getDiscursos(1, newQ);
      setQ(newQ);
      setPageIndex(0);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChangePage = useCallback(
    async (newPageIndex: number) => {
      try {
        setLoading(true);

        await getDiscursos(newPageIndex + 1, q);
        setPageIndex(newPageIndex);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    },
    [q]
  );

  const handleAddClick = useCallback(() => {
    push("/discurso/new");
  }, []);

  const handleEditClick = useCallback((id: string) => {
    push(`/discurso/${id}`);
  }, []);

  const handleDeleteClick = useCallback((id: string) => {
    dialog({
      title: "Atenção",
      content: "Deseja realmente deletar o discurso?",
      onConfirm: () => deleteDiscurso(id),
    });
  }, []);

  useEffect(() => {
    handleDidMount();
  }, [handleDidMount]);

  return (
    <>
      <PageContainer>
        <DataGrid
          components={{
            Toolbar: () => <Toolbar onSearchValueChange={handleChangeQ} />,
          }}
          loading={loading}
          getRowId={(row) => row._id}
          rows={discursos}
          rowCount={discursosCount}
          page={pageIndex}
          onPageChange={handleChangePage}
          columns={[
            { field: "codigo", headerName: "Código", sortable: false },
            {
              field: "nome",
              headerName: "Nome",
              flex: 1,
              sortable: false,
            },
            {
              field: "dataUltimaPalestra",
              headerName: "Última palestra",
              flex: 1,
              sortable: false,
              renderCell: ({ value }) => dateToString(value),
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
