'use client';
import React from 'react'
import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async(data) => {
      await axios.post('/api/issues', data); //send data through issues api upon submit
      router.push('/issues'); //send the user back to issues page after submitting form
    })}>
        <TextField.Root placeholder='title' {...register('title')}>
        </TextField.Root>
        <Controller 
          name='description'
          control = {control}
          render = { ({ field }) => <SimpleMDE placeholder='description...' {...field}/> }
        /> 
        <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage