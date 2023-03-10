import { NextFunction, Request, Response } from "express"

export default async function setPageSize(
  request: Request,
  response: Response,
  next: NextFunction
) {
  request.query.pageSize = '50'

  return next()
}
