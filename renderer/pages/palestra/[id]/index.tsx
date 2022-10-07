import { Unstable_Grid2 as Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ConfirmFooter } from "../../../components/ConfirmFooter";
import { DateFieldForm } from "../../../components/DateFieldForm";
import { DiscursoSelect } from "../../../components/DiscursoSelect";
import { Loading } from "../../../components/Loading";
import { OradorSelect } from "../../../components/OradorSelect";
import { PageContainer } from "../../../components/PageContainer";
import { TextFieldForm } from "../../../components/TextFieldForm";
import { Discurso } from "../../../entities/Discurso";
import { Orador } from "../../../entities/Orador";
import PalestraRepo from "../../../repo/PalestraRepo";

import { resolver } from "./schemas";

type Form = {
  data: Date;
  orador: Orador;
  discurso: Discurso;
};

export default function () {
  const { control, reset, handleSubmit } = useForm<Form>({ resolver });
  const { push, query } = useRouter();

  const [loading, setLoading] = useState(false);

  const id = useMemo(() => String(query.id), [query.id]);
  const isNew = useMemo(() => id === "new", [id]);

  const createPalestra = useCallback(async (values: Form) => {
    await PalestraRepo.create(values);
    toast.success("Palestra cadastrada com sucesso 🎉");
  }, []);

  const updatePalestra = useCallback(
    async (values: Form) => {
      await PalestraRepo.update(id, values);
      toast.success("Palestra atualizada com sucesso 🎉");
    },
    [id]
  );

  const handleCancel = useCallback(() => {
    push("/palestra");
  }, []);

  const handleConfirm = useCallback(
    async (values: Form) => {
      try {
        setLoading(true);

        if (isNew) {
          await createPalestra(values);
        } else {
          await updatePalestra(values);
        }

        push("/palestra");
      } catch (error) {
        toast.error("Erro ao cadastrar/atualizar palestra");
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [createPalestra, updatePalestra]
  );

  const handleDidMount = useCallback(async () => {
    if (isNew) {
      return;
    }

    try {
      setLoading(true);

      const palestra = await PalestraRepo.findById(id);

      reset(palestra);
    } catch (error) {
      toast.error("Não foi possivel obter a palestra");
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
              name="_id"
              control={control}
            />
          </Grid>
          <Grid xs={6}>
            <DateFieldForm
              fullWidth
              label="Data"
              name="data"
              control={control}
            />
          </Grid>
          <Grid xs={6}>
            <DiscursoSelect control={control} />
          </Grid>
          <Grid xs={6}>
            <OradorSelect control={control} />
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
