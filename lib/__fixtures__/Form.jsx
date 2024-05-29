import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Typography, Form, TextField } from '../components';

const Wrapper = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async () => {
    const promise = await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    return promise;
  };

  useEffect(() => {
    setValue('OpptyName', 'oppty name ');
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Typography variant="h1" size="2.5rem">
        Example Form
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            maxWidth: 300,
          }}
        >
          <TextField
            name="OpptyName"
            label="Opportunity Name"
            register={register}
            validation={{
              required: 'Opportunity Name is Required',
            }}
            errors={errors}
          />
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  );
};
export default {
  default: <Wrapper />,
};
