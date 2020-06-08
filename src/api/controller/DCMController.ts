import IDCMController, { IDCM } from "./IDCMController";
import { Document } from "mongoose";
import { Snowflake } from "discord.js";
async function getAllMessages(): Promise<Array<Document>> {
  return IDCMController.find({}, (err, users) => {
    if (err) throw err;
    return users;
  });
}
async function addCM(obj: IDCM) {
  IDCMController.create(obj)
    .then((doc: Document) => {
      doc.save();
    })
    .catch((e) => {
      throw new Error(e);
    });
}
async function deleteCM(messageid: Snowflake) {
  IDCMController.deleteOne({ messageid: messageid }, (err: any) => {
    if (err) throw err;
  });
}
export default {
  getAllMessages,
  addCM,
  deleteCM,
};
