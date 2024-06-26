import { Router } from "express"
import { createAppointment, getAppointments, changeStatus } from "./controllers.js"

const router = Router()

router.post('/', createAppointment)
router.patch('/status/:id', changeStatus)
router.get('/', getAppointments)

export default router