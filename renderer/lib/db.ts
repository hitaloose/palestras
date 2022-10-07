import NeDB from "nedb";
import { Discurso } from "../entities/Discurso";
import { Migration } from "../entities/Migration";
import { Orador } from "../entities/Orador";
import { Palestra } from "../entities/Palestra";

type DB = {
  migrations: NeDB<Migration>;
  oradores: NeDB<Orador>;
  discursos: NeDB<Discurso>;
  palestras: NeDB<Palestra>;
};

export const db: DB = {
  oradores: new NeDB<Orador>({
    filename: "./db/oradores.json",
  }),
  discursos: new NeDB<Discurso>({
    filename: "./db/discursos.json",
  }),
  palestras: new NeDB<Palestra>({
    filename: "./db/palestras.json",
  }),
  migrations: new NeDB<Migration>({
    filename: "./db/migrations.json",
  }),
};
