import { Response } from "express";

export enum STATUS_CODES {
  NOTFOUND = 404,
  NOAUTH = 401,
  OK = 200,
  WTF = 418,
}
export function respondData(res: Response, code: STATUS_CODES, data: Object) {
  return res.json({
    timestamp: Date.now(),
    status: code,
    data,
  });
}
export function respondMessage(
  res: Response,
  code: STATUS_CODES,
  message: String
) {
  return res.json({
    timestamp: Date.now(),
    status: code,
    message: message,
  });
}
