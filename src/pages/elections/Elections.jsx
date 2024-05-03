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

  // Contract Details
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

  const ABI = import.meta.env.VITE_ABI


  const contract = new ethers.Contract(contractAddress,ABI,signer)

  async function fetchElections() {
    const elections = await contract.getAllElections()
    elections.forEach((election) => {
      console.log(election)
    })
    setElections(elections)
  }

  

  return (
    <div className="flex flex-col items-center m-10 gap-4">
        <div className="text-4xl flex gap-8">
          <div>Active Elections</div>
          <Button onClick={fetchElections}>Refresh</Button>
        </div>
        <div className='grid grid-cols-3 gap-8 w-full px-20 py-5'>
            {
              elections.map((election, index) => {

                const startTime = new Date(Number(election[0][1]._hex))
                const endTime = new Date(Number(election[0][2]._hex))

                return (
                <Card key={index} className="m-10">
                  <CardHeader>
                    <CardTitle className="text-3xl">{election[2]}</CardTitle>
                  </CardHeader>
                  <CardContent className='flex flex-col gap-4'>
                    <div className='flex flex-col'>
                      <Label className="text-2xl">Starts at {startTime.getDay()}/{startTime.getMonth()}/{startTime.getFullYear()}</Label>
                      <Label className="text-xl">{startTime.getHours()} hrs : {startTime.getMinutes()} mins</Label>
                    </div>
                    <div className='flex flex-col'>
                      <Label className="text-2xl">Starts at {endTime.getDay()}/{endTime.getMonth()}/{endTime.getFullYear()}</Label>
                      <Label className="text-xl">{endTime.getHours()} hrs : {endTime.getMinutes()} mins</Label>
                    </div>  
                  </CardContent>
                  <CardFooter>
                    <Button>View More</Button>
                  </CardFooter>
                </Card>
              )})
            }
        </div>
    </div>
  )
}
