import { db } from "../lib/db";

class MigrationRepo {
  insert(name: string) {
    return new Promise((resolve, reject) => {
      db.migrations.insert({ name }, (err, newMigration) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(newMigration);
      });
    });
  }

  findByName(name: string) {
    return new Promise((resolve, reject) => {
      db.migrations.findOne({ name }, (err, newMigration) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(newMigration);
      });
    });
  }
}

export default new MigrationRepo();
