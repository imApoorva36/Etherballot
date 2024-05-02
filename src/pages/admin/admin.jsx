import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useState } from 'react'
import { DateTimePicker } from '@/components/ui/date-time-picker/date-time-picker'
import { validate } from '@/scripts/formValidation'
import { ethers } from "ethers"
import { useContext } from 'react'
import userContext from '@/scripts/userContext'

export default function Admin() {

  const [electionTitle, setElectionTitle] = useState('')
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  const [candidates, setCandidates] = useState([])
  const [FormObj, setFormObj] = useState({})
  const [Errors, setErrors] = useState({})
  const userState = useContext(userContext)
  // Provider and signer
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  
  const contractAddress = "0x0B306BF915C4d645ff596e518fAf3F9669b97016"

  const ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "startTime",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "stopTime",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "title",
          "type": "string"
        }
      ],
      "name": "ElectionCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "electionId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "candidateIndex",
          "type": "uint256"
        }
      ],
      "name": "VoteCast",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        }
      ],
      "name": "VoterAdded",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_voter",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "addToUniqueVoters",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_startTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_stopTime",
          "type": "uint256"
        },
        {
          "internalType": "string[]",
          "name": "_candidates",
          "type": "string[]"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "createElection",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "electionCounter",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "elections",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "startTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "stopTime",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllElections",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256[3]",
              "name": "electionDetails",
              "type": "uint256[3]"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "name",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "voteCount",
                  "type": "uint256"
                }
              ],
              "internalType": "struct etherballot.Candidate[]",
              "name": "candidates",
              "type": "tuple[]"
            }
          ],
          "internalType": "struct etherballot.ElectionReturnValue[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_voter",
          "type": "address"
        }
      ],
      "name": "getName",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_electionId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_voterName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_candidateIndex",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voterNameAddress",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]


  const contract = new ethers.Contract(contractAddress,ABI,signer)


  const SubmitHandler = async (e) => {
    e.preventDefault();
    const formObj = {
      electionTitle: electionTitle,
      startTime: startTime,
      endTime: endTime,
      candidates: candidates,
    }

    // const addVoter = await contract.addToUniqueVoters("0x90F79bf6EB2c4f870365E785982E1f101E93b906","UserTwo", {
    //   gasPrice: ethers.utils.parseUnits('1000','gwei'),
    //   gasLimit: 1000000
    // })
    // await addVoter.wait()
    // console.log(addVoter)

    const newErrors = await validate(formObj)
    setErrors(newErrors)


    if (newErrors.errorFree == true){
      setFormObj(formObj)
      console.log(formObj)
      console.log(userState.user.userAddress)
      const submitElection = await contract.createElection(formObj.startTime,formObj.endTime,formObj.candidates, {
        gasPrice: ethers.utils.parseUnits('1000', 'gwei'), 
        gasLimit: 1000000
      })
      await submitElection.wait()
      console.log(submitElection)
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
