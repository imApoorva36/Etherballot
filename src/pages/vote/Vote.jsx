import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import userContext from '@/scripts/userContext'
  

export default function Vote() {

    const [election, setElection] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [hasVoted, setHasVoted] = useState(true)
    const userState = useContext(userContext)

    const params = useParams()
    const electionId = params.electionId

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
  
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

    const ABI = import.meta.env.VITE_ABI


    const contract = new ethers.Contract(contractAddress,ABI,signer)

    const getElection = async (electionId) => {
        const election = await contract.getElectionById(electionId)
        setElection(election)
        setIsLoading(false)
    }

    const checkVoted = async () => {
        const accounts = await provider.send('eth_requestAccounts')
        const account = accounts[0]
        const newHasVoted = await contract.checkIfVoted(account,electionId)
        setHasVoted(newHasVoted)
    }

    const vote = async (candidateId) => {
        console.log(election)
        const newVote = await contract.vote(electionId, userState.user.userName, candidateId)
        await newVote.wait()
        setHasVoted(true)
    }

    useEffect(() => {
        getElection(electionId)
        checkVoted()
    },[hasVoted,userState.user])



  return (
    <div>
        {
            isLoading ?
            <div>Loading please wait...</div>
            :
            <div className='flex flex-col gap-4 p-10'>
                <div className='text-4xl flex justify-center'>{election[2]}</div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Candidate Name</TableHead>
                            <TableHead>Vote Count</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            election[1].map((candidate,index)=> {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{candidate[0]}</TableCell>
                                        <TableCell>{Number(candidate[1]._hex)}</TableCell>
                                        {
                                            hasVoted ? 
                                            <TableCell><Button variant="ghost">Already Voted</Button></TableCell>
                                            :
                                            <TableCell><Button onClick={() => vote(index)}>Vote</Button></TableCell>
                                        }
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        }
    </div>
  )
}
