import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Typography, UploadFile, TextField, Button } from '../components';

const getEventType = (event) => {
  if (event && (event.type === 'change' || event.type === 'drop')) {
    return event.type === 'change'
      ? event.target.files[0]
      : event.dataTransfer.files[0];
  }
  return null;
};

const handleDownload = () => {
  const selectedFileInput = document.getElementById('dragNDrop');
  const selectedFile = selectedFileInput.files[0];
  const fileUrl = URL.createObjectURL(selectedFile);

  const link = document.createElement('a');
  link.href = fileUrl;
  link.target = '_blank';
  link.download = selectedFile.name;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};

const UploadFileCosmos = ({ variant }) => {
  const [errorUpload, setErrorUpload] = useState(null);
  const [file, setFile] = useState(null);

  const handleUpload = async (event) => {
    if (!event) {
      setFile(null);
      return;
    }

    const currentFile = getEventType(event);

    setFile({
      name: currentFile.name,
      size: currentFile.size,
    });
  };

  const handleGetErrorUpload = (errors) => {
    setErrorUpload(errors);
  };

  if (variant === 'dragAndDrop') {
    return (
      <div
        style={{
          padding: '16px',
          background: 'white',
          height: '200px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <UploadFile
          id="dragNDrop"
          name="dragNDrop"
          variant={variant}
          accept=".pdf, .jpg, .jpeg, doc,.jpeg, doc,.jpeg, doc, .docx"
          onChange={handleUpload}
          onHandleDownload={handleDownload}
          maxSize="5MB"
          getError={handleGetErrorUpload}
          file={file}
        />
        <div>
          Get Error Message With getError prop:{' '}
          {errorUpload?.message && JSON.stringify(errorUpload)}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '16px',
        width: '160px',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <UploadFile
        id="link"
        name="link"
        variant={variant}
        disabled={false}
        accept=".doc, .docx, .ppt, .pptx, application/pdf, image/*"
        onChange={handleUpload}
        onHandleDownload={handleDownload}
        maxSize="5MB"
        getError={handleGetErrorUpload}
        file={file}
      />
      <div>
        Get Error Message With getError prop:{' '}
        {errorUpload?.message && JSON.stringify(errorUpload)}
      </div>
    </div>
  );
};

const UploadFileReactHookFormCosmos = ({ isPopulateData }) => {
  const [result, setResult] = useState(0);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isValid },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    setResult({
      example: data.example,
      link: data.linkRHF.name,
      dragNDrop: data.dragNDropRHF.name,
    });
  };

  useEffect(() => {
    if (isPopulateData) {
      setValue('dragNDropRHF', {
        name: 'Test_File_Drag_And_Drop.pdf',
        size: '1MB',
        type: '.pdf',
      });
      setValue('linkRHF', {
        name: 'Link_Type_Test_File.pdf',
        size: '1MB',
      });
    }
  }, [isPopulateData]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          padding: '16px',
          width: '75%',
          display: 'flex',
          flexDirection: 'column',
          background: '#eef6ff',
          gap: '16px',
        }}
      >
        <Typography align="center" size="2rem">
          Upload In Form Example
        </Typography>
        <TextField
          label="Example"
          name="example"
          type="text"
          width="100%"
          register={register}
          errors={errors}
          validation={{ required: 'This field is required' }}
        />
        <div>
          <UploadFile
            id="dragNDropRHF"
            name="dragNDropRHF"
            variant="dragAndDrop"
            accept=".pdf, .jpg, .jpeg, doc,.jpeg, doc,.jpeg, doc, .docx"
            onHandleDownload={handleDownload}
            maxSize="1MB"
            control={control}
            rules={{ required: 'Upload is Required' }}
          />
        </div>
        <div style={{ width: '160px' }}>
          <UploadFile
            id="linkRHF"
            name="linkRHF"
            variant="link"
            accept=".doc, .docx, .ppt, .pptx, application/pdf, image/*"
            onHandleDownload={handleDownload}
            maxSize="1MB"
            control={control}
            rules={{ required: 'Upload is Required' }}
          />
        </div>
        <Typography>
          Error Variant Drag And Drop: {errors?.dragNDropRHF?.message}
        </Typography>
        <Typography>Error Variant Link: {errors?.linkRHF?.message}</Typography>
        <Button
          type="submit"
          disabled={Object.keys(errors).length > 0 || !isValid}
        >
          submit
        </Button>
      </form>

      <pre style={{ width: '50%' }}>
        Result:{!!result && JSON.stringify(result)}
      </pre>
    </>
  );
};

UploadFileCosmos.propTypes = {
  variant: PropTypes.string.isRequired,
};

UploadFileReactHookFormCosmos.defaultProps = {
  isPopulateData: false,
};
UploadFileReactHookFormCosmos.propTypes = {
  isPopulateData: PropTypes.bool,
};

export default {
  Link: () => <UploadFileCosmos variant="link" />,
  'Drag And Drop': () => <UploadFileCosmos variant="dragAndDrop" />,
  'React Hook Form': () => <UploadFileReactHookFormCosmos />,
  'Populate Data React Hook Form': () => (
    <UploadFileReactHookFormCosmos isPopulateData />
  ),
};
