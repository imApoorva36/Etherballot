import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useState } from 'react'
import { DateTimePicker } from '@/components/ui/date-time-picker/date-time-picker'
import { validate } from '@/scripts/formValidation'

export default function Admin() {

  const [electionTitle, setElectionTitle] = useState('')
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  const [candidates, setCandidates] = useState([])
  const [FormObj, setFormObj] = useState({})
  const [Errors, setErrors] = useState({})



  const SubmitHandler = async (e) => {
    e.preventDefault();
    const formObj = {
      electionTitle: electionTitle,
      startTime: startTime,
      endTime: endTime,
      candidates: candidates,
    }

    const newErrors = await validate(formObj)
    setErrors(newErrors)

    if (newErrors.errorFree == true){
      setFormObj(formObj)
      console.log(formObj)
    }
  }

  const KeyHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value != "") {
        const newCandidates = [...candidates,e.target.value]
        setCandidates(newCandidates)
        e.target.value = ""
      }
    }
  }

  return (
    <div className="admin flex flex-col justify-center items-center m-10 w-full">
      <div className="title text-4xl">
        Create an election
      </div>
      <div className={
        (candidates.length > 0) ? 'w-full flex justify-between p-10 gap-4' :
        'w-full flex justify-center'
      }>
        <div className="form w-1/2 items-center justify-center">
          <form onSubmit={SubmitHandler} className='flex flex-col gap-4'>
            <div className="electionTitle flex flex-col gap-2">
            <Label className="text-2xl">Election Title</Label>
            <Input type="text" id="electionTitle" value={electionTitle} placeholder="Enter election title" onChange={(e) => {setElectionTitle(e.target.value)}} />
            <Label className="text-red-700">{Errors.validate?.electionTitle}</Label>
            </div>
            <div className="electionCandidates">
              <Label className="text-2xl">Candidates</Label>
              <Input type="text" id="candidates" onKeyDown={KeyHandler} placeholder={
                (candidates.length > 0 ) ? "Enter another candidate name and press enter" :
                "Enter a candidate name and press enter"
              } />
              <Label className="text-red-700">{Errors.validate?.candidates}</Label>
            </div>
            <div className="electionStartTime">
              <Label className="text-2xl">Start Date</Label>
              <DateTimePicker id="startTime" onChange={
                (obj) => {
                  const newTime = new Date(obj.year,obj.month-1,obj.day,obj.hour,obj.minute)
                  const newTimeEpoch = newTime.getTime()
                  setStartTime(newTimeEpoch)
                }
              } granularity={"minute"}/>
            </div>
            <Label className="text-red-700">{Errors.date?.toString()}</Label>
            <div className="electionEndTime">
              <Label className="text-2xl">End Time</Label>
              <DateTimePicker id="endTime" onChange={
                (obj) => {
                  const newTime = new Date(obj.year,obj.month-1,obj.day,obj.hour,obj.minute)
                  const newTimeEpoch = newTime.getTime()
                  setEndTime(newTimeEpoch)
                }
              } granularity={"minute"}/>
              <Label className="text-red-700">{Errors.date?.toString()}</Label>
            </div>
            <Button type="submit">Create an election</Button>
          </form>
        </div>
        {
          (candidates.length > 0) ?
          <div className="candidates w-1/2">
            <div className="title text-2xl text-center">
              Selected Candidates
            </div>
            <div className='p-10'>
              {
                candidates.map((candidate, index) => (
                  <ul>
                    <div className='flex items-center justify-between'>
                      <li key={index} className='text-xl p-5'>{index +1}. {candidate}</li>
                      <Button onClick={() => {
                          const newCandidates = [...candidates]
                          newCandidates.splice(index,1)
                          setCandidates(newCandidates)
                        }
                      }>Remove Candidate</Button>
                    </div>
                  </ul>
                ))
              }
            </div>
          </div>
          : null
        }
      </div>
    </div>
  )
}
