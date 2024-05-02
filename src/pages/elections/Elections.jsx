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
  
  const contractAddress = "0x68B1D87F95878fE05B998F19b66F4baba5De1aed"

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
            },
            {
              "internalType": "string",
              "name": "title",
              "type": "string"
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

  async function fetchElections() {
    const elections = await contract.getAllElections()
    elections.forEach((election) => {
      console.log(election)
    })
    setElections(elections)
  }

  

  return (
    <div className="flex flex-col items-center m-10 gap-4">
        <div className="text-4xl">
          Active Elections
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
