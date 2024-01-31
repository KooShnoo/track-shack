// handleValidationErrors is an Express middleware used with the `check`
// middleware to format the validation errors. (To customize,
// see express-validator's documentation.)

import { RequestHandler } from "express";
import { validationResult } from "express-validator";

export const handleValidationErrors: RequestHandler = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errorFormatter = ({ msg }: any) => msg;
    const errors = validationErrors.formatWith(errorFormatter).mapped();

    const err: any = Error("Validation Error");
    err.errors = errors;
    err.statusCode = 400;
    err.title = "Validation Error";
    next(err);
  }
  next();
};

