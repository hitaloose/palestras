import { useCallback, useEffect, useState } from "react";

import { Orador } from "../../entities/Orador";
import OradorRepo from "../../repo/OradorRepo";
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
  const [oradores, setOradores] = useState<Orador[]>([]);
  const [oradoresCount, setOradoresCount] = useState(0);

  const getOradores = useCallback(async (page: number, q: string) => {
    const getted = await OradorRepo.findAll({ page, q });
    const gettedCount = await OradorRepo.count({ q });
    setOradores(getted);
    setOradoresCount(gettedCount);
  }, []);

  const deleteOrador = useCallback(async (id: string) => {
    try {
      setLoading(true);

      await OradorRepo.delete(id);
      await getOradores(1, "");
      setPageIndex(0);
      setQ("");
      toast.success("Orador removido com sucesso");
    } catch (error) {
      toast.error("Erro ao excluir orador");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDidMount = useCallback(async () => {
    try {
      setLoading(true);

      await getOradores(1, "");
    } catch (error) {
      toast.error("Erro ao obter lista de oradores");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChangeQ = useCallback(async (newQ: string) => {
    try {
      setLoading(true);

      await getOradores(1, newQ);
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

        await getOradores(newPageIndex + 1, q);
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
    push("/orador/new");
  }, []);

  const handleEditClick = useCallback((id: string) => {
    push(`/orador/${id}`);
  }, []);

  const handleDeleteClick = useCallback((id: string) => {
    dialog({
      title: "Atenção",
      content: "Deseja realmente deletar o orador?",
      onConfirm: () => deleteOrador(id),
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
          rows={oradores}
          rowCount={oradoresCount}
          page={pageIndex}
          onPageChange={handleChangePage}
          columns={[
            { field: "_id", headerName: "Código", sortable: false },
            { field: "nome", headerName: "Nome", flex: 1, sortable: false },
            {
              field: "contato",
              headerName: "Contato",
              flex: 1,
              sortable: false,
            },
            {
              field: "congregacao",
              headerName: "Congregação",
              flex: 1,
              sortable: false,
            },
            {
              field: "dataUltimaPalestra",
              headerName: "Última palestra",
              width: 200,
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
