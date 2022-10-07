import migration1 from "../migration/1-add-discursos";
import MigrationRepo from "../repo/MigrationRepo";

const migrations = [{ name: "1-add-discursos", fn: migration1 }];

export default async function () {
  for (const migration of migrations) {
    const alreadyRun = await MigrationRepo.findByName(migration.name);

    if (alreadyRun) {
      continue;
    }

    await migration.fn();
    await MigrationRepo.insert(migration.name);
  }
}
