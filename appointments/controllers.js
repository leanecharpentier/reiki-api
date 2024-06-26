import Appointment from "./models.js";
import { addAppointmentSchema, updateStatusSchema } from "./validation.js"

export async function createAppointment(req, res) {
    console.log(req.body);
    try {
        const { error } = addAppointmentSchema.validate(req.body);
        if ( error ) {
            console.log({ error: error.details.map((d) => d.message) });
            return res.status(400).json({ error: error.details.map((d) => d.message) })
        }
        const appointment = new Appointment(req.body);
        const date = new Date();
        appointment.createdAt = date;
        await appointment.save();
        return res.status(200).json(appointment)
    } catch (error) {
        console.error(error);
        return res.status(500).json(error)
    }
}

export async function getAppointments(req, res) {
    if (Object.keys(req.query).length === 0) {
        try {
            const result = await Appointment.find({});
            if (!result || result.length == 0) {
                return res.status(404).json("No data found")
            }
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json("Error")
        }
    } else if (req.query.startDate && req.query.endDate) {
        const startDate = req.query.startDate
        const endDate = req.query.endDate
        try {
            const result = await Appointment.aggregate([
                {
                    $match: {
                        status: 'Accepté',
                        date: {
                            $gte: new Date(startDate),
                            $lt: new Date(endDate)
                        }
                    }
                }
            ]);
            if (!result || result.length == 0) {
                return res.status(404).json("No data found")
            }
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json("Error")
        }
    } else if (req.query.status && !req.query.date) {
        const status = req.query.status
        try {
            const result = await Appointment.find({status: status});
            if (!result || result.length == 0) {
                return res.status(404).json("No data found")
            }
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json("Error")
        }
    } else {
        return res.status(404).json("No data found")
    }
}

export async function getAcceptedAppointmentsByDate(req, res) {
    
}

export async function changeStatus(req, res) {
    const appointmentId = req.params.id;
    try {
        const { error } = updateStatusSchema.validate(req.body);
        if ( error ) {
            return res.status(400).json({ error: error.details.map((d) => d.message) })
        }
        const result = await Appointment.findByIdAndUpdate(appointmentId, req.body, { new: true, runValidators: true })
        return res.status(201).json(result)
    } catch (error) {
        return res.status(500).json("Error")
    }
}