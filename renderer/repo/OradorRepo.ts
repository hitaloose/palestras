import uuid from "react-uuid";

import { Orador } from "../entities/Orador";
import { PAGE_SIZE } from "../helpers/constants";
import { db } from "../lib/db";

class OradorRepo {
  create(values: Omit<Orador, "_id" | "dataUltimaPalestra">): Promise<Orador> {
    return new Promise((resolve, reject) => {
      db.oradores.insert(
        { ...values, _id: uuid(), dataUltimaPalestra: null },
        (err, orador) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(orador);
        }
      );
    });
  }

  count(values: { q?: string }): Promise<number> {
    const { q } = values;

    return new Promise((resolve, reject) => {
      db.oradores
        .find({
          $or: [
            { nome: { $regex: new RegExp(q, "i") } },
            { congregacao: { $regex: new RegExp(q, "i") } },
          ],
        })
        .exec((err, oradores) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(oradores.length);
        });
    });
  }

  findAll(values: { q?: string; page?: number }): Promise<Orador[]> {
    const { q, page } = values;

    return new Promise((resolve, reject) => {
      db.oradores
        .find({
          $or: [
            { nome: { $regex: new RegExp(q, "i") } },
            { congregacao: { $regex: new RegExp(q, "i") } },
          ],
        })
        .sort({ dataUltimaPalestra: 1 })
        .skip(page ? PAGE_SIZE * (page - 1) : null)
        .limit(page ? PAGE_SIZE : null)
        .exec((err, oradores) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(oradores);
        });
    });
  }

  findById(_id: string): Promise<Orador> {
    return new Promise((resolve, reject) => {
      db.oradores.findOne({ _id }, (err, orador) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(orador);
      });
    });
  }

  delete(_id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      db.oradores.remove({ _id }, (err) => {
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
    values: Omit<Orador, "_id" | "dataUltimaPalestra">
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      db.oradores.update(
        { _id },
        {
          $set: {
            nome: values.nome,
            contato: values.contato,
            congregacao: values.congregacao,
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
      db.oradores.update(
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

export default new OradorRepo();
