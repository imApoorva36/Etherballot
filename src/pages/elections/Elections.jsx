import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function Elections() {

  const [elections, setElections] = useState([])



  useEffect(() => {
    async function fetchElections() {
      const elections = await fetch('http://localhost:4000/elections')
      const newElections = await elections.json()
      setElections(newElections)
    }

    fetchElections()
  },[])

  return (
    <div className="flex flex-col items-center m-10 gap-4">
        <div className="text-4xl">Active Elections</div>
        <div className='grid grid-cols-3 gap-8 w-full px-20 py-5'>
            {
              elections.map((election, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{election.electionTitle}</CardTitle>
                  </CardHeader>
                  <CardContent className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-3'>
                      <Label>Start Date: {election.startTime.day} / {election.startTime.month} / {election.startTime.year}</Label>
                      <Label>Start Time: {election.startTime.hour} : {election.startTime.minute}</Label>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Label>End Date: {election.endTime.day} / {election.endTime.month} / {election.endTime.year}</Label>
                      <Label>End Time: {election.endTime.hour} : {election.endTime.minute}</Label>
                    </div>  
                  </CardContent>
                  <CardFooter>
                    <Button>View More</Button>
                  </CardFooter>
                </Card>
              ))
            }
        </div>
    </div>
  )
}
