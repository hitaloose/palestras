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
  oradores: new NeDB<Orador>({ autoload: true, filename: "db/oradores" }),
  discursos: new NeDB<Discurso>({ autoload: true, filename: "db/discursos" }),
  palestras: new NeDB<Palestra>({ autoload: true, filename: "db/palestras" }),
  migrations: new NeDB<Migration>({
    autoload: true,
    filename: "db/migrations",
  }),
};
