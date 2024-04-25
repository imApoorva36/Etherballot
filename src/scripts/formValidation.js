import { check } from "prettier"
import * as yup from "yup"

let userSchema = yup.object({
    electionTitle: yup.string().required("Election title is required"),
    startTime: yup.object().shape({
        calendar: yup.object({
            identifier: yup.string(),
        }),
        era: yup.string(),
        year: yup.number(),
        month: yup.number(),
        day: yup.number(),
        hour: yup.number(),
        minute: yup.number(),
        second: yup.number(),
        millisecond: yup.number(),
    }).required("Select a start date"),
    endTime: yup.object().shape({
        calendar: yup.object({
            identifier: yup.string(),
        }),
        era: yup.string(),
        year: yup.number(),
        month: yup.number(),
        day: yup.number(),
        hour: yup.number(),
        minute: yup.number(),
        second: yup.number(),
        millisecond: yup.number(),
    }).required("Select an End Date"),
    candidates: yup.array().of(yup.string()).min(1, "Enter atleast one candidate"),
})

function checkDate(formObj) {
    if (!formObj.startTime && !formObj.endTime){
        throw new Error("Times are required")
    }

    if (formObj.startTime.year > formObj.endTime.year) {
        throw new Error("Start Time cannot be after End Time")
    }
    else if (formObj.startTime.month > formObj.endTime.month) {
        throw new Error("Start Time cannot be after End Time")
    }
    else if (formObj.startTime.day > formObj.endTime.day) {
        throw new Error("Start Time cannot be after End Time")
    }
    else if (formObj.startTime.hour > formObj.endTime.hour) {
        throw new Error("Start Time cannot be after End Time")
    }
    else if (formObj.startTime.minute > formObj.endTime.minute) {
        throw new Error("Start Time cannot be after End Time")
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