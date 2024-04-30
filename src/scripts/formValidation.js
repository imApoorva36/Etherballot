import { check } from "prettier"
import * as yup from "yup"

let userSchema = yup.object({
    electionTitle: yup.string().required("Election title is required"),
    startTime: yup.object().shape({
        year: yup.number(),
        month: yup.number(),
        day: yup.number(),
        hour: yup.number(),
        minute: yup.number(),
    }).required("Select a start date"),
    endTime: yup.object().shape({
        year: yup.number(),
        month: yup.number(),
        day: yup.number(),
        hour: yup.number(),
        minute: yup.number(),
    }).required("Select an End Date"),
    candidates: yup.array().of(yup.string()).min(1, "Enter atleast one candidate"),
})

function checkDate(formObj) {
    if (!formObj.startTime && !formObj.endTime){
        throw new Error("Times are required")
    }

    const startTime = new Date(formObj.startTime.year,formObj.startTime.month-1,formObj.startTime.day,formObj.startTime.hour,formObj.startTime.minute)
    const endTime = new Date(formObj.endTime.year,formObj.endTime.month-1,formObj.endTime.day,formObj.endTime.hour,formObj.endTime.minute)
    const date = new Date()

    console.log("Start Time " + startTime)
        console.log("End time " + endTime)
        console.log("Curr Date " + date)

    if (startTime > endTime) {
        
        throw new Error("Start time cannot be after End Time")
    }

    if ((startTime < date) || (endTime < date)) {
        throw new Error("One of the time is before the current time")
    }
}

async function catchErrors(formObj) {

    let newError = {
        validate: null,
        date: null,
        errorFree: true
    }

    try {
        await userSchema.validate(formObj, {abortEarly:false})
    }
    catch (e) {
        let valErr = {}

        e.inner.forEach(err => {
            valErr[err.path] = err.message
        })

        newError.validate = valErr
        newError.errorFree = false
    }

    let x;
    try {
        checkDate(formObj)
    }
    catch (e) {
        newError.date = e.message
        newError.errorFree = false
    }

    return newError
}

export async function validate(formObj) {
    return await catchErrors(formObj)
}