import { yupResolver } from "@hookform/resolvers/yup";

import { yup } from "../../../helpers/yup";

const schema = yup.object({
  codigo: yup.number().min(0).required(),
  nome: yup.string().trim().max(255).required(),
});

export const resolver = yupResolver(schema);
