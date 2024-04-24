import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  electionTitle: z.string(),
  candidates: z.string(),
})

export default function Admin() {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      electionTitle: '',
      candidates: '',
    }
  });

  const submitHandler = (values) => {
    console.log(values);
  }

  return (
    <div className='flex flex-col items-center p-10 gap-2 w-full'>
        <div className="title text-4xl">
            Create an election
        </div>
        <div className='flex flex-col items-center justify-between gap-8 w-3/4 m-8 p-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className='space-y-8 w-1/2'>
              <FormField 
                control={form.control}
                name="electionTitle"
                render = {
                  ({field}) => {
                    return(
                      <FormItem>
                        <FormLabel className="text-2xl">Election title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter election title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }
                }
              />
              <FormField 
                control={form.control}
                name="candidates"
                render = {
                  ({field}) => {
                    return(
                      <FormItem>
                        <FormLabel className="text-2xl">Candidates</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter candidates seperated by commas" {...field} />
                        </FormControl>
                      </FormItem>
                    )
                  }
                }
              />
              <Button type="submit" className="w-1/2">Submit</Button>
            </form>
          </Form>
        </div>
    </div>
  )
}
