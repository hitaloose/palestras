import { yupResolver } from "@hookform/resolvers/yup";

import { yup } from "../../../helpers/yup";

const schema = yup.object({
  nome: yup.string().trim().max(255).required(),
  contato: yup.string().trim().max(255).required(),
  congregacao: yup.string().trim().max(255).required(),
});

export const resolver = yupResolver(schema);
