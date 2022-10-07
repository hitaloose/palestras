import { Discurso } from "./Discurso";
import { Orador } from "./Orador";

export type Palestra = {
  _id: string;
  data: Date;

  idDiscurso: string;
  discurso: Discurso;

  idOrador: string;
  orador: Orador;
};
