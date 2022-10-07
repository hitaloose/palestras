import { Unstable_Grid2 as Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ConfirmFooter } from "../../../components/ConfirmFooter";
import { DateFieldForm } from "../../../components/DateFieldForm";
import { Loading } from "../../../components/Loading";
import { PageContainer } from "../../../components/PageContainer";
import { TextFieldForm } from "../../../components/TextFieldForm";
import OradorRepo from "../../../repo/OradorRepo";

import { resolver } from "./schemas";

type Form = {
  nome: string;
  contato: string;
  congregacao: string;
};

export default function () {
  const { push, query } = useRouter();
  const { control, handleSubmit, reset } = useForm<Form>({ resolver });

  const [loading, setLoading] = useState(false);

  const id = useMemo(() => String(query.id), [query.id]);
  const isNew = useMemo(() => id === "new", [id]);

  const createOrador = useCallback(async (values: Form) => {
    await OradorRepo.create(values);
    toast.success("Orador cadastrado com sucesso");
  }, []);

  const updateOrador = useCallback(
    async (values: Form) => {
      await OradorRepo.update(id, values);
      toast.success("Orador atualizado com sucesso");
    },
    [id]
  );

  const handleCancel = useCallback(() => {
    push("/orador");
  }, []);

  const handleConfirm = useCallback(
    async (values: Form) => {
      try {
        setLoading(true);

        if (isNew) {
          await createOrador(values);
        } else {
          await updateOrador(values);
        }

        push("/orador");
      } catch (error) {
        toast.error("Erro ao cadastrar/atualizar orador");
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [createOrador, updateOrador]
  );

  const handleDidMount = useCallback(async () => {
    if (isNew) {
      return;
    }

    try {
      setLoading(true);

      const orador = await OradorRepo.findById(id);
      reset(orador);
    } catch (error) {
      toast.error("Não foi possivel obter o orador");
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
          <Grid xs={6}>
            <TextFieldForm
              fullWidth
              disabled
              label="Código"
              control={control}
              name="_id"
            />
          </Grid>
          <Grid xs={6}>
            <TextFieldForm
              fullWidth
              label="Nome"
              control={control}
              name="nome"
            />
          </Grid>
          <Grid xs={6}>
            <TextFieldForm
              fullWidth
              label="Contato"
              control={control}
              name="contato"
            />
          </Grid>
          <Grid xs={6}>
            <TextFieldForm
              fullWidth
              label="Congregação"
              control={control}
              name="congregacao"
            />
          </Grid>
          <Grid xs={6}>
            <DateFieldForm
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
