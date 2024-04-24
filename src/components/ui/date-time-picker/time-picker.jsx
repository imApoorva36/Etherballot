"use client"
import React from "react"
import { TimeField } from "./time-field"

const TimePicker = React.forwardRef((props, forwardedRef) => {
  return <TimeField {...props} />
})

TimePicker.displayName = "TimePicker"

export { TimePicker }
