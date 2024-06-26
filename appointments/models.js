import { Schema , model } from 'mongoose';

const appointmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['En attente', 'Accepté', 'Refusé'],
        default: "En attente"
    },
    message: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        required: true
    },
});

const Appointment = model('appointments', appointmentSchema);

export default Appointment;  