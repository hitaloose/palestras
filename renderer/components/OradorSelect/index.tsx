import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Orador } from "../../entities/Orador";
import OradorRepo from "../../repo/OradorRepo";
import { SelectForm } from "../SelectForm";

type Props = {
  control: any;
};

export const OradorSelect = ({ control }: Props) => {
  const [oradores, setOradores] = useState<Orador[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDidMount = useCallback(async () => {
    try {
      setLoading(true);

      const getted = await OradorRepo.findAll({});
      setOradores(getted);
    } catch (error) {
      toast.error("Erro ao obter lista de oradores");
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
      options={oradores}
      getOptionLabel={(option) => `${option.nome} (${option.congregacao})`}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      loading={loading}
      disabled={loading}
      label="Orador"
      name="orador"
      control={control}
    />
  );
};
