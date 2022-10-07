import { yupResolver } from "@hookform/resolvers/yup";

import { yup } from "../../../helpers/yup";

const schema = yup.object({
  data: yup.date().required(),
  orador: yup.mixed().required(),
  discurso: yup.mixed().required(),
});

export const resolver = yupResolver(schema);
