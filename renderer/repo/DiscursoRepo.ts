import uuid from "react-uuid";

import { Discurso } from "../entities/Discurso";
import { PAGE_SIZE } from "../helpers/constants";
import { db } from "../lib/db";

class DiscursoRepo {
  create(
    values: Omit<Discurso, "_id" | "dataUltimaPalestra">
  ): Promise<Discurso> {
    return new Promise((resolve, reject) => {
      db.discursos.insert(
        { ...values, _id: uuid(), dataUltimaPalestra: null },
        (err, discurso) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(discurso);
        }
      );
    });
  }

  count(values: { q?: string }): Promise<number> {
    const { q } = values;

    return new Promise((resolve, reject) => {
      db.discursos
        .find({
          $or: [
            { nome: { $regex: new RegExp(q, "i") } },
            { codigo: { $regex: new RegExp(q, "i") } },
          ],
        })
        .exec((err, discuros) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(discuros.length);
        });
    });
  }

  findAll(values: { q?: string; page?: number }): Promise<Discurso[]> {
    const { q, page } = values;

    return new Promise((resolve, reject) => {
      db.discursos
        .find({
          $or: [
            { nome: { $regex: new RegExp(q, "i") } },
            { codigo: { $regex: new RegExp(q, "i") } },
          ],
        })
        .sort({ dataUltimaPalestra: 1, codigo: 1 })
        .skip(page ? PAGE_SIZE * (page - 1) : null)
        .limit(page ? PAGE_SIZE : null)
        .exec((err, discursos) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(discursos);
        });
    });
  }

  findById(_id: string): Promise<Discurso> {
    return new Promise((resolve, reject) => {
      db.discursos.findOne({ _id }, (err, discurso) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(discurso);
      });
    });
  }

  delete(_id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      db.discursos.remove({ _id }, (err) => {
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
    values: Omit<Discurso, "_id" | "dataUltimaPalestra">
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      db.discursos.update(
        { _id },
        {
          $set: {
            codigo: values.codigo,
            nome: values.nome,
          },
        },
        { multi: false },
        (err) => {
          if (err) {
            reject(err);
            return;
          }

          resolve();
        }
      );
    });
  }

  updateDataUltimaPalestra(
    _id: string,
    dataUltimaPalestra: Date
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      db.discursos.update(
        { _id },
        {
          $set: {
            dataUltimaPalestra,
          },
        },
        { multi: false },
        (err) => {
          if (err) {
            reject(err);
            return;
          }

          resolve();
        }
      );
    });
  }
}

export default new DiscursoRepo();
