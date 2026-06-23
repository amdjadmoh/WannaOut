import { Router } from "express"
import {
  getAll,
  getById,
  getWithUniversities,
  create,
  update,
  remove,
} from "../controllers/countryController"

export const countryRouter = Router()

countryRouter.get("/", getAll)
countryRouter.get("/:id", getById)
countryRouter.get("/:id/universities", getWithUniversities)
countryRouter.post("/", create)
countryRouter.put("/:id", update)
countryRouter.delete("/:id", remove)
