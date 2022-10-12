import { format } from "date-fns";
import NeDB from "nedb";
import { readFile } from "fs/promises";
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
    filename: "db/oradores.json",
  }),
  discursos: new NeDB<Discurso>({
    filename: "db/discursos.json",
  }),
  palestras: new NeDB<Palestra>({
    filename: "db/palestras.json",
  }),
  migrations: new NeDB<Migration>({
    filename: "db/migrations.json",
  }),
};

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

const backupItem = (db: NeDB<any>) => {
  return new Promise((resolve, reject) => {
    db.find({}, (err, items) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(items);
    });
  });
};

export const backup = async () => {
  const data = {};

  for (const [name, item] of Object.entries(db)) {
    data[name] = await backupItem(item);
  }

  const parsedBackup = new Blob([JSON.stringify(data)], {
    type: "text/plain",
  });

  const newLink = document.createElement("a");
  const fileName = format(new Date(), "d/M/y-H:m:s");
  newLink.download = fileName;

  if (window.webkitURL != null) {
    newLink.href = window.webkitURL.createObjectURL(parsedBackup);
  } else {
    newLink.href = window.URL.createObjectURL(parsedBackup);
    newLink.style.display = "none";
    document.body.appendChild(newLink);
  }

  newLink.click();
};

const deleteItem = (db: NeDB<any>) => {
  return new Promise((resolve, reject) => {
    db.remove({}, { multi: true }, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(null);
    });
  });
};

const restoreItem = (db: NeDB<any>, data: any) => {
  return new Promise((resolve, reject) => {
    db.insert(data, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(null);
    });
  });
};

export const restore = async (filePath: string) => {
  const file = await readFile(filePath);
  const data = JSON.parse(file.toString("utf8"));

  for (const [name, item] of Object.entries(db)) {
    await deleteItem(item);
    await restoreItem(item, data[name]);
  }
};
