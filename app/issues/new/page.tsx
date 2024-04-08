'use client';
import React, { useState } from 'react'
import { Button, Callout, TextField, Text, Spinner, AlertDialog, Flex } from '@radix-ui/themes'
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
  const [isSubmitting, setSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');


  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-5'>
            <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      }
      {alertMessage && (
        <div className="absolute top-16 right-4 mt-5 mr-5 bg-green-700 text-white p-3 opacity-90">
          {alertMessage}
        </div>
      )}
      <form 
        className=' space-y-3' 
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmitting(true);
            await axios.post('/api/issues', data); //send data through issues api upon submit
            setAlertMessage('Form Submitted Sucessfully ');
            setTimeout(() => {
              setSubmitting(true);
              router.push('/issues'); //send the user back to issues page after submitting form  
            }, 2000);
          } catch (error) {
            setSubmitting(false);
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
          <Button disabled={isSubmitting}>Submit New Issue { isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  )
}

export default NewIssuePage