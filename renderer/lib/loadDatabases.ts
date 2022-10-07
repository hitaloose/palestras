import NeDB from "nedb";
import { db } from "./db";

const loadDatabase = (nedb: NeDB<any>): Promise<void> => {
  return new Promise((resolve, reject) => {
    nedb.loadDatabase((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
};

export const loadDatabases = async () => {
  await loadDatabase(db.migrations);
  await loadDatabase(db.discursos);
  await loadDatabase(db.oradores);
  await loadDatabase(db.palestras);
};
