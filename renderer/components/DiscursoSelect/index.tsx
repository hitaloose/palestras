import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Discurso } from "../../entities/Discurso";
import DiscursoRepo from "../../repo/DiscursoRepo";
import { SelectForm } from "../SelectForm";

type Props = {
  control: any;
};

export const DiscursoSelect = ({ control }: Props) => {
  const [discursos, setDiscursos] = useState<Discurso[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDidMount = useCallback(async () => {
    try {
      setLoading(true);

      const getted = await DiscursoRepo.findAll({});
      setDiscursos(getted);
    } catch (error) {
      toast.error("Erro ao obter lista de discursos");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleDidMount();
  }, [handleDidMount]);

  if (loading) return null;

  return (
    <SelectForm
      options={discursos}
      getOptionLabel={(option) => option.nome}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      loading={loading}
      disabled={loading}
      label="Discurso"
      name="discurso"
      control={control}
    />
  );
};
