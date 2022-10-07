import uuid from "react-uuid";
import { Discurso } from "../entities/Discurso";
import { Orador } from "../entities/Orador";

import { Palestra } from "../entities/Palestra";
import { PAGE_SIZE } from "../helpers/constants";
import { db } from "../lib/db";
import orador from "../pages/orador";
import DiscursoRepo from "./DiscursoRepo";
import OradorRepo from "./OradorRepo";

class PalestraRepo {
  create(values: {
    data: Date;
    discurso: Discurso;
    orador: Orador;
  }): Promise<Palestra> {
    return new Promise(async (resolve, reject) => {
      db.palestras.insert(
        {
          ...values,
          _id: uuid(),
          idDiscurso: values.discurso._id,
          idOrador: values.orador._id,
        },
        async (err, palestra) => {
          if (err) {
            reject(err);
            return;
          }

          await OradorRepo.updateDataUltimaPalestra(
            values.orador._id,
            values.data
          );
          await DiscursoRepo.updateDataUltimaPalestra(
            values.discurso._id,
            values.data
          );

          resolve(palestra);
        }
      );
    });
  }

  count(): Promise<number> {
    return new Promise((resolve, reject) => {
      db.palestras.find({}).exec((err, palestras) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(palestras.length);
      });
    });
  }

  findAll(values: { page: number }): Promise<Palestra[]> {
    const { page } = values;

    return new Promise((resolve, reject) => {
      db.palestras
        .find({})
        .sort({ data: -1 })
        .skip(PAGE_SIZE * (page - 1))
        .limit(PAGE_SIZE)
        .exec((err, palestras) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(palestras);
        });
    });
  }

  findById(_id: string): Promise<Palestra> {
    return new Promise((resolve, reject) => {
      db.palestras.findOne({ _id }, (err, palestra) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(palestra);
      });
    });
  }

  delete(_id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      db.palestras.remove({ _id }, (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }

  update(
    _id: string,
    values: {
      data: Date;
      discurso: Discurso;
      orador: Orador;
    }
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      db.palestras.update(
        { _id },
        {
          $set: {
            data: values.data,
            idDiscurso: values.discurso._id,
            idOrador: values.orador._id,
            orador: values.orador,
            discurso: values.discurso,
          },
        },
        { multi: false },
        async (err) => {
          if (err) {
            reject(err);
            return;
          }

          await OradorRepo.updateDataUltimaPalestra(
            values.orador._id,
            values.data
          );
          await DiscursoRepo.updateDataUltimaPalestra(
            values.discurso._id,
            values.data
          );

          resolve();
        }
      );
    });
  }
}

export default new PalestraRepo();
