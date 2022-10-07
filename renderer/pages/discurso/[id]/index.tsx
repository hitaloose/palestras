import { Unstable_Grid2 as Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ConfirmFooter } from "../../../components/ConfirmFooter";
import { Loading } from "../../../components/Loading";
import { PageContainer } from "../../../components/PageContainer";
import { TextFieldForm } from "../../../components/TextFieldForm";
import DiscursoRepo from "../../../repo/DiscursoRepo";

import { resolver } from "./schemas";

type Form = {
  codigo: number;
  nome: string;
};

export default function () {
  const { push, query } = useRouter();
  const { control, handleSubmit, reset } = useForm<Form>({ resolver });

  const [loading, setLoading] = useState(false);

  const id = useMemo(() => String(query.id), [query.id]);
  const isNew = useMemo(() => id === "new", [id]);

  const createDiscurso = useCallback(async (values: Form) => {
    await DiscursoRepo.create(values);
    toast.success("Discurso cadastrado com sucesso");
  }, []);

  const updateDiscurso = useCallback(
    async (values: Form) => {
      await DiscursoRepo.update(id, values);
      toast.success("Discurso atualizado com sucesso");
    },
    [id]
  );

  const handleCancel = useCallback(() => {
    push("/discurso");
  }, []);

  const handleConfirm = useCallback(
    async (values: Form) => {
      try {
        setLoading(true);

        if (isNew) {
          await createDiscurso(values);
        } else {
          await updateDiscurso(values);
        }

        push("/discurso");
      } catch (error) {
        toast.error("Erro ao cadastrar/atualizar orador");
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [createDiscurso, updateDiscurso]
  );

  const handleDidMount = useCallback(async () => {
    if (isNew) {
      return;
    }

    try {
      setLoading(true);

      const orador = await DiscursoRepo.findById(id);
      reset(orador);
    } catch (error) {
      toast.error("Não foi possivel obter o discurso");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [id, isNew]);

  useEffect(() => {
    handleDidMount();
  }, [handleDidMount]);

  return (
    <>
      {loading && <Loading />}
      <PageContainer>
        <Grid container spacing={1}>
          <Grid xs={12}>
            <TextFieldForm
              fullWidth
              label="Código"
              control={control}
              name="codigo"
            />
          </Grid>
          <Grid xs={12}>
            <TextFieldForm
              fullWidth
              label="Nome"
              control={control}
              name="nome"
            />
          </Grid>
          <Grid xs={12}>
            <TextFieldForm
              fullWidth
              disabled
              label="Data última palestra"
              control={control}
              name="dataUltimaPalestra"
            />
          </Grid>
        </Grid>
      </PageContainer>

      <ConfirmFooter
        onCancel={handleCancel}
        onConfirm={handleSubmit(handleConfirm)}
      />
    </>
  );
}
