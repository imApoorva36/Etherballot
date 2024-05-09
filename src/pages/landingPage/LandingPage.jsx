import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <div className='m-20 flex flex-col gap-2'>
        <h1 className='text-8xl font-jarkata font-bolder'>Welcome to</h1>
        <h1 className='text-9xl font-poppins font-bold'>EtherBallot</h1>
        <div className='text-4xl text-gray-400 font-noto'>Every election is determined by the people who show up</div>
        <div className='text-4xl text-gray-400 font-noto'>Now that's a quote</div>
        <div className='text-4xl text-gray-400 font-noto'>Anyways, you showed up!</div>
        <div className='text-4xl text-gray-400 font-noto'>So make it worth it!</div>
        <div className='flex gap-8 my-5'>
            <Link to="/elections/create"><Button className="text-xl p-5">Create an election</Button></Link>
            <Link to="/dashboard"><Button className="text-xl p-5">View all active elections</Button></Link>
        </div>
    </div>
  )
}
