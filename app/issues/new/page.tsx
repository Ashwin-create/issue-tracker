'use client';
import React, { useState } from 'react'
import { Button, Callout, TextField, Text } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';

type IssueForm = z.infer<typeof createIssueSchema>; //infer IssueForm based on creatIssueSchema, reducing the effort to manually type in additonal fields 

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setError] = useState('');

  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-5'>
            <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      }
      <form className=' space-y-3' onSubmit={handleSubmit(async(data) => {
        try {
          await axios.post('/api/issues', data); //send data through issues api upon submit
          router.push('/issues'); //send the user back to issues page after submitting form  
        } catch (error) {
          setError('An unexpected error occured. ')  
        }
      })}>
          <TextField.Root placeholder='title' {...register('title')}>
          </TextField.Root>
          {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
          <Controller 
            name='description'
            control = {control}
            render = { ({ field }) => <SimpleMDE placeholder='description...' {...field}/> }
          />
          {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
          <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage