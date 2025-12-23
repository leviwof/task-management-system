import { body } from "express-validator";

export const taskValidator = [
    body("title").notEmpty().isLength({ max: 100 }),
    body("description").optional().isLength({ max: 500 })
];
