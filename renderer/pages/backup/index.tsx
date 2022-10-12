import { Button, Unstable_Grid2 as Grid } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { Loading } from "../../components/Loading";

import { PageContainer } from "../../components/PageContainer";
import { TextField } from "../../components/TextField";
import { backup, restore } from "../../lib/db";

export default function () {
  const { push } = useRouter();

  const [loading, setLoading] = useState(false);
  const [filePath, setFilePath] = useState<"">(null);

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files[0]) {
        return;
      }

      setFilePath((event.target.files[0] as any).path);
    },
    []
  );

  const handleBackup = useCallback(async () => {
    try {
      setLoading(true);
      await backup();
    } catch (error) {
      toast.error("Erro ao realizar backup");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRestore = useCallback(async () => {
    try {
      setLoading(true);

      if (!filePath) {
        toast.error("Um arquivo de backup deve ser selecionado");
      }

      await restore(filePath);

      toast.success("Backup restaurado com sucesso");

      push("/home");
    } catch (error) {
      toast.error("Não foi possivel restaurar o backup");
    } finally {
      setLoading(false);
    }
  }, [filePath, push]);

  return (
    <>
      {loading && <Loading />}
      <PageContainer>
        <Grid container spacing={1}>
          <Grid xs={12}>
            <Button onClick={handleBackup} color="primary">
              Realizar backup
            </Button>
          </Grid>
          <Grid xs={12}>
            <TextField
              sx={{ mr: 1 }}
              type="file"
              label="Arquivo"
              onChange={handleFileChange}
            />
            <Button color="primary" onClick={handleRestore}>
              Restaurar
            </Button>
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
}
