/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import { Controller } from 'react-hook-form';
import { theme } from '../../styles/theme';
import { Typography } from '../Typography';
import {
  StyledFlexDiv,
  StyledProgressInner,
  StyledProgressWrapper,
  StyledCustomBodyText,
  StyledUploadLabel,
  StyledGridDiv,
} from './styled';
import { Icon } from '../Icon';
import {
  fileFormatValidator,
  fileSizeValidator,
  formatFileSize,
  getFormatFile,
} from './helper';
import { Table } from '../Table';
import { ActionButton } from '../ActionButton';

const iconStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};

const ellipsisTextStyle = {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

export const UploadFile = (props) => {
  const {
    accept,
    disabled,
    file,
    id,
    maxSize,
    variant,
    onChange,
    onHandleDownload,
    control,
    rules,
    getError,
    hideRemoveButton,
    name,
    isUploadPhoto,
    isUploadValidation,
    table,
    maxSizeErrMsg,
    fileFormatErrMsg,
  } = props;
  const onChangeHookFormRef = useRef(null);
  const valueHookFormRef = useRef(null);

  const [currentFileSize, setCurrentFileSize] = useState(0);
  const [errors, setErrors] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(100);

  const handleTempUploadFile = (event, currentFile) => {
    const isMaxSizeExceeded = fileSizeValidator(currentFile.size, maxSize);
    const isInvalidFormat = fileFormatValidator(currentFile.type, accept);
    setCurrentFileSize(formatFileSize(currentFile.size));

    if (isMaxSizeExceeded) {
      setErrors({
        message: maxSizeErrMsg || `Max ${maxSize}`,
        errorType: 'FILE_SIZE',
      });
      getError({
        name: currentFile.name,
        message: maxSizeErrMsg || `Max ${maxSize}`,
        errorType: 'FILE_SIZE',
      });
    } else if (isInvalidFormat) {
      const fileExt = getFormatFile(currentFile.type);
      setErrors({
        message:
          fileFormatErrMsg || `File with format ${fileExt} is not allowed.`,
        errorType: 'FILE_FORMAT',
      });
      getError({
        name: currentFile.name,
        message:
          fileFormatErrMsg || `File with format ${fileExt} is not allowed.`,
        errorType: 'FILE_FORMAT',
      });
    } else {
      setErrors({ message: '' });
      getError({ name: '', message: '' });

      onChange(event, currentFile);
    }
  };

  const getEventType = (event) => {
    if (event && (event.type === 'change' || event.type === 'drop')) {
      return event.type === 'change'
        ? event.target.files[0]
        : event.dataTransfer.files[0]; // !! for type drag and drop (event.type === 'drop'), use event.dataTransfer.file[0]
    }
    return null;
  };

  const onHandleChange = (event) => {
    setErrors({});

    const currentFile = getEventType(event);

    setSelectedFile(currentFile);

    const handleFileReadProgress = (e) => {
      setProgress(0);
      if (e.lengthComputable) {
        const totalChunks = 100;
        const chunkSize = e.total / totalChunks;
        let currentChunk = 0;

        const interval = setInterval(() => {
          // eslint-disable-next-line no-plusplus
          currentChunk++;
          const percentLoaded = Math.round(
            ((currentChunk * chunkSize) / e.total) * 100
          );
          setProgress(percentLoaded);

          if (currentChunk >= totalChunks) {
            clearInterval(interval);
          }
        }, 10);
      }
    };

    const handleFileReadEnd = () => {
      handleTempUploadFile(event, currentFile);
    };

    const setupFileReader = () => {
      const reader = new FileReader();
      reader.onprogress = handleFileReadProgress;
      reader.onloadend = handleFileReadEnd;
      reader.readAsDataURL(currentFile);
    };

    if (variant === 'dragAndDrop') {
      setupFileReader();
    } else {
      handleFileReadEnd();
    }
  };

  const onHandleRemoveFile = () => {
    setErrors({});
    getError({});
    setSelectedFile(null);
    setCurrentFileSize(0);

    if (onChangeHookFormRef.current) {
      onChangeHookFormRef.current('');
    } else {
      onChange(null);
    }
  };

  const validateFileSize = async (currentFile) => {
    const isErrorUpload = fileSizeValidator(currentFile.size, maxSize);

    let error;
    if (variant === 'link') {
      error = `Max ${maxSize}`;
    } else {
      error = `Ukuran file maksimal ${maxSize}`;
    }

    return isErrorUpload ? error : undefined;
  };

  const onHandleKeyDown = (e, callback) => {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      callback();
    }
  };

  // for mobile responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (file) {
      setSelectedFile(file);
    } else {
      setErrors({});
      setSelectedFile(null);
      setCurrentFileSize(0);
    }
  }, [file]);

  // Populate Data With React Hook Form
  useEffect(() => {
    if (valueHookFormRef?.current?.name) {
      const dataFile = valueHookFormRef.current;
      setSelectedFile({
        name: dataFile.name,
        size: dataFile.size,
        ...(dataFile.type ? { type: dataFile.type } : {}),
      });

      const fileSize =
        typeof dataFile.size === 'string'
          ? dataFile.size
          : formatFileSize(dataFile.size);
      setCurrentFileSize(fileSize);
    } else {
      setSelectedFile(null);
      setCurrentFileSize(null);
    }
  }, [valueHookFormRef.current]);

  const uploadProps = {
    accept,
    disabled,
    maxSize,
    id,
    name,
    errors,
    isUploadPhoto,
    isUploadValidation,
    table,
    selectedFile: file || selectedFile,
    onHandleChange,
    onHandleKeyDown,
    onHandleRemoveFile,
  };

  const generateUploadInput = (onChangeRHF) => {
    if (variant === 'dragAndDrop') {
      return (
        <UploadTypeDragAndDrop
          isUploadPhoto={isUploadPhoto}
          onHandleDownload={onHandleDownload}
          currentFileSize={currentFileSize}
          progress={progress}
          isMobile={isMobile}
          hideRemoveButton={hideRemoveButton}
          {...uploadProps}
          onHandleChange={(event) => {
            if (control) {
              onChangeRHF(getEventType(event));
              onHandleChange(event);
            } else {
              onHandleChange(event);
            }
          }}
        />
      );
    }

    return (
      <UploadTypeLink
        {...uploadProps}
        onHandleChange={(event) => {
          if (control) {
            onChangeRHF({
              name: getEventType(event).name,
              size: getEventType(event).size,
            });
            onHandleChange(event);
          } else {
            onHandleChange(event);
          }
        }}
      />
    );
  };

  if (!isEmpty(control)) {
    return (
      <Controller
        control={control}
        name={name}
        rules={{
          validate: validateFileSize,
          ...rules,
        }}
        render={({
          field: { onChange: onChangeHookForm, value: valueHookForm },
        }) => {
          onChangeHookFormRef.current = onChangeHookForm;
          valueHookFormRef.current = valueHookForm;

          return generateUploadInput(onChangeHookFormRef.current);
        }}
      />
    );
  }

  return generateUploadInput();
};

const UploadTypeLink = ({
  id,
  selectedFile,
  errors,
  accept,
  disabled,
  onHandleRemoveFile,
  onHandleChange,
  onHandleKeyDown,
  name,
}) => {
  const fileUploaded = (
    <StyledFlexDiv flexDirection="column" width="100%">
      <StyledFlexDiv
        height="100%"
        width="100%"
        gap={theme.spacings.spacing03}
        alignItems="center"
      >
        <StyledFlexDiv
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Icon
            iconName="FilledFile"
            color="blue80"
            size="24px"
            style={{
              ...iconStyle,
            }}
          />
        </StyledFlexDiv>
        <Typography
          color="blue80"
          size="1.6rem"
          weight={400}
          lineHeight="150%"
          style={{
            ...ellipsisTextStyle,
            width: '100%',
          }}
        >
          {get(selectedFile, 'name', 'File')}
        </Typography>
        <StyledFlexDiv
          id={`btn-remove-file-${id}`}
          alignItems="center"
          justifyContent="center"
          height="100%"
          onClick={!disabled ? onHandleRemoveFile : undefined}
          onKeyDown={(e) => onHandleKeyDown(e, onHandleRemoveFile)}
        >
          <Icon
            iconName="OutlinedDelete"
            size="24px"
            color={disabled ? 'neutral50' : 'secondary'}
            style={{
              cursor: disabled ? 'auto' : 'pointer',
              ...iconStyle,
            }}
          />
        </StyledFlexDiv>
      </StyledFlexDiv>
      {errors.message && (
        <Typography
          color="secondary"
          size="1.2rem"
          weight={400}
          lineHeight="150%"
          margin="0 0 0 32px"
        >
          {errors.message}
        </Typography>
      )}
    </StyledFlexDiv>
  );

  const fileNotUploaded = (
    <StyledFlexDiv disabled={disabled}>
      <StyledUploadLabel disabled={disabled} htmlFor={id} variant="link">
        Upload File
      </StyledUploadLabel>
    </StyledFlexDiv>
  );

  return (
    <StyledFlexDiv alignItems="center" height={theme.spacings.spacing06}>
      {selectedFile ? fileUploaded : fileNotUploaded}
      <UploadInput
        id={id}
        name={name}
        accept={accept}
        disabled={disabled}
        onChange={onHandleChange}
      />
    </StyledFlexDiv>
  );
};

const UploadTypeDragAndDrop = ({
  id,
  accept,
  selectedFile,
  errors,
  isMobile,
  maxSize,
  disabled,
  progress,
  hideRemoveButton,
  currentFileSize,
  onHandleChange,
  onHandleDownload,
  onHandleRemoveFile,
  onHandleKeyDown,
  isUploadPhoto,
  isUploadValidation,
  name,
  table,
}) => {
  const textRef = useRef(null);
  const [isBreakWord, setIsBreakWord] = useState(null);
  const [hideProgress, setHideProgress] = useState(false);
  const isProgressComplete = Number(progress) === 100;

  useEffect(() => {
    if (textRef.current) {
      const containerWidth = textRef.current.clientWidth;
      const shouldAddLineBreak = isMobile ? false : containerWidth < 357;
      setIsBreakWord(shouldAddLineBreak);
    }
  }, []);

  useEffect(() => {
    if (isProgressComplete && !errors?.message) {
      const timeoutId = setTimeout(() => {
        setHideProgress(true);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
    setHideProgress(false);

    return undefined;
  }, [isProgressComplete, progress, errors?.message]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    onHandleChange(e);
  };

  const generateNotUploadedBodyText = () => {
    let children;

    if (!accept) {
      children = maxSize && ` Maksimal ukuran ${maxSize}/file`;
    } else {
      const fileExtensions = accept.split(', ');

      const formatText =
        fileExtensions.length > 1
          ? `Format file ${fileExtensions.join(', ')}`
          : `Hanya format file ${fileExtensions} yang diterima.`;

      children = (
        <>
          {formatText}
          {isBreakWord !== null && isBreakWord && <br />}
          {maxSize && ` Maksimal ukuran ${maxSize}/file`}
          {fileExtensions.length === 1 &&
            ` dengan ukuran file maksimal ${maxSize}.`}
        </>
      );
    }

    return (
      <StyledCustomBodyText ref={textRef}>{children}</StyledCustomBodyText>
    );
  };

  const renderFileName = () => {
    const generateFileNameText = () => (
      <Typography
        color={onHandleDownload && isProgressComplete ? 'primary' : 'blue80'}
        size="1.2rem"
        lineHeight="18px"
        textDecoration={
          onHandleDownload && isProgressComplete ? 'underline' : 'none'
        }
        className="ellipsis-text"
      >
        {get(selectedFile, 'name', 'File')}
      </Typography>
    );

    if (!onHandleDownload) {
      return generateFileNameText();
    }

    return (
      <StyledFlexDiv
        id={`btn-download-file-${id}`}
        cursor={!isProgressComplete ? 'auto' : 'pointer'}
        onClick={isProgressComplete ? onHandleDownload : undefined}
        onKeyDown={(e) =>
          isProgressComplete &&
          (e.key === 'Enter' || e.key === ' ') &&
          onHandleDownload()
        }
      >
        {generateFileNameText()}
      </StyledFlexDiv>
    );
  };

  const renderRemoveButton = () => (
    <StyledFlexDiv
      id={`btn-remove-file-${id}`}
      alignItems="center"
      justifyContent="center"
      height="100%"
      onClick={!disabled ? onHandleRemoveFile : undefined}
      onKeyDown={(e) => onHandleKeyDown(e, onHandleRemoveFile)}
    >
      <Icon
        iconName="OutlinedDelete"
        size="16px"
        color={disabled ? 'neutral50' : 'secondary'}
        className="remove-icon"
      />
    </StyledFlexDiv>
  );

  const fileNotUploaded = () => (
    <StyledFlexDiv
      flexDirection="column"
      gap={isMobile ? theme.spacings.spacing02 : theme.spacings.spacing01}
    >
      <div>
        <Typography color="blue80" size="1.2rem" lineHeight="150%">
          {!isMobile ? <>Drag dan drop file untuk upload atau </> : ''}
          <StyledUploadLabel htmlFor={id} variant="dragAndDrop">
            Upload File
          </StyledUploadLabel>
        </Typography>
      </div>
      {generateNotUploadedBodyText()}
    </StyledFlexDiv>
  );

  const fileUploaded = () => (
    <StyledFlexDiv
      alignItems="center"
      justifyContent={isMobile ? 'space-between' : 'center'}
      gap={isMobile ? theme.spacings.spacing03 : theme.spacings.spacing05}
      width={isMobile ? '100%' : ''}
    >
      <StyledFlexDiv
        flexDirection="column"
        justifyContent="center"
        gap={theme.spacings.spacing01}
        width={isMobile && !isProgressComplete ? '100%' : ''}
      >
        <StyledFlexDiv
          justifyContent="space-between"
          alignItems="center"
          gap={theme.spacings.spacing02}
        >
          <StyledFlexDiv alignItems="center" gap={theme.spacings.spacing02}>
            {renderFileName()}
            <Typography color="neutral50" size="1rem" lineHeight="150%">
              {currentFileSize || ''}
            </Typography>
            {isProgressComplete &&
              !errors?.message &&
              !hideRemoveButton &&
              renderRemoveButton()}
          </StyledFlexDiv>
          {!isProgressComplete && !errors?.message && (
            <Typography color="neutral50" size="1rem" lineHeight="150%">
              {progress}%
            </Typography>
          )}
        </StyledFlexDiv>
        {errors?.message ? (
          <Typography
            color="secondary"
            size="1rem"
            lineHeight="150%"
            weight={500}
          >
            {errors?.message}
          </Typography>
        ) : (
          !hideProgress && (
            <StyledProgressWrapper isMobile={isMobile}>
              <StyledProgressInner progress={progress} />
            </StyledProgressWrapper>
          )
        )}
      </StyledFlexDiv>
      {!hideProgress ? (
        <StyledFlexDiv
          id={`icon-remove-file-${id}`}
          alignItems="center"
          justifyContent="center"
          height="100%"
          onClick={!disabled ? onHandleRemoveFile : undefined}
          onKeyDown={(e) => onHandleKeyDown(e, onHandleRemoveFile)}
        >
          <Icon
            iconName="OutlinedCircleClose"
            color="secondary"
            size="32px"
            className="close-icon"
          />
        </StyledFlexDiv>
      ) : (
        <StyledUploadLabel htmlFor={id} variant="dragAndDrop" type="button">
          Ubah File
        </StyledUploadLabel>
      )}
    </StyledFlexDiv>
  );

  if (isUploadPhoto) {
    return (
      <>
        {selectedFile ? (
          <div style={{ display: 'flex' }}>
            <StyledFlexDiv
              type="photo"
              id={`btn-remove-file-${id}`}
              alignItems="center"
              justifyContent="center"
              height="100%"
              onClick={!disabled ? onHandleRemoveFile : undefined}
              onKeyDown={(e) => onHandleKeyDown(e, onHandleRemoveFile)}
              style={{
                width: 'fit-content',
                height: 'auto',
              }}
            >
              <Icon iconName="Folder" size="16px" />
              <Typography
                color="#0055B6"
                size="14px"
                lineHeight="21px"
                weight={400}
                style={{ textWrap: 'nowrap' }}
              >
                Hapus Foto
              </Typography>
            </StyledFlexDiv>
            <Typography
              color="#666666"
              size="12px"
              lineHeight="21px"
              weight={400}
              style={{ alignSelf: 'center', marginLeft: 20 }}
            >
              {renderFileName()}
            </Typography>
          </div>
        ) : (
          <>
            <StyledUploadLabel htmlFor={id} variant="dragAndDrop" type="photo">
              <Icon iconName="Folder" size="16px" />
              <Typography
                color="#0055B6"
                size="14px"
                lineHeight="21px"
                weight={400}
              >
                Pilih Foto
              </Typography>
            </StyledUploadLabel>
            <Typography
              color="#666666"
              size="12px"
              lineHeight="21px"
              weight={400}
              style={{ alignSelf: 'center', marginLeft: 20 }}
            >
              Belum Ada File yang dipilih.
            </Typography>
          </>
        )}
        <UploadInput
          id={id}
          name={name}
          accept={accept}
          onChange={onHandleChange}
          disabled={disabled}
        />
      </>
    );
  }

  if (isUploadValidation) {
    return (
      <StyledFlexDiv
        height="100%"
        width="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding="16px"
        gap="32px"
        outline={`1px dashed ${theme.colors.neutral70}`}
        borderRadius={theme.radius.small}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        minHeight="82px"
      >
        <StyledFlexDiv
          justifyContent="center"
          alignItems="center"
          gap={isMobile ? theme.spacings.spacing03 : theme.spacings.spacing05}
          width={isMobile ? '100%' : ''}
        >
          <Icon
            iconName={
              selectedFile && errors?.message
                ? 'OutlinedCloudOff'
                : 'OutlinedUpload'
            }
            color={selectedFile && errors?.message ? 'secondary' : 'primary'}
            size="32px"
            style={{
              ...iconStyle,
              cursor: 'auto',
            }}
          />
          {selectedFile ? fileUploaded() : fileNotUploaded()}
          <UploadInput
            id={id}
            name={name}
            accept={accept}
            onChange={onHandleChange}
            disabled={disabled}
          />
        </StyledFlexDiv>
        {selectedFile && !isEmpty(table) && (
          <>
            <StyledGridDiv
              justifyContent="space-around"
              alignItems="center"
              padding="2rem"
              gap="2rem"
            >
              <StyledFlexDiv flexDirection="column" alignItems="center">
                <Typography
                  id="txt-total-data"
                  size="1.4rem"
                  lineHeight="3rem"
                  weight={600}
                  color="blue80"
                >
                  Total Data
                </Typography>
                <Typography
                  id="txt-total-data"
                  size="1.4rem"
                  lineHeight="3rem"
                  color="neutral70"
                >
                  {table?.totalData}
                </Typography>
              </StyledFlexDiv>
              <StyledFlexDiv flexDirection="column" alignItems="center">
                <Typography
                  id="txt-valid-data"
                  size="1.4rem"
                  lineHeight="3rem"
                  weight={600}
                  color="blue80"
                >
                  Data Valid
                </Typography>
                <Typography
                  id="txt-valid-data"
                  size="1.4rem"
                  lineHeight="3rem"
                  weight={500}
                  color="green"
                >
                  {table?.totalSuccess}
                </Typography>
              </StyledFlexDiv>
              <StyledFlexDiv flexDirection="column" alignItems="center">
                <Typography
                  id="txt-invalid-data"
                  size="1.4rem"
                  lineHeight="3rem"
                  weight={600}
                  color="blue80"
                >
                  Data Invalid
                </Typography>
                <Typography
                  id="txt-invalid-data"
                  size="1.4rem"
                  lineHeight="3rem"
                  weight={500}
                  color="error"
                >
                  {table?.totalFailed}
                </Typography>
              </StyledFlexDiv>
              <StyledFlexDiv flexDirection="column" alignItems="center">
                <ActionButton
                  id="btn-download-upload"
                  variant="download"
                  onClick={table?.handleDownloadUploadedFile}
                  disabled={table?.isFetchingUploadedFile}
                />
              </StyledFlexDiv>
            </StyledGridDiv>
            <StyledFlexDiv width="-webkit-fill-available">
              <Table
                id="tbl-leads"
                columns={table?.tableColumn}
                data={table?.tableBody}
                pagination={{
                  page: table?.paginationState?.page,
                  onSelectPage: table?.handleSetPage,
                  totalData: table?.totalData,
                  limit: table?.paginationState?.limit,
                  onSelectLimit: table?.handleSetLimit,
                  indicatorType: 'input',
                  paginationType: 'inputSingle',
                  disabledNext:
                    table?.tableBody?.length < table?.paginationState?.limit,
                }}
              />
            </StyledFlexDiv>
          </>
        )}
      </StyledFlexDiv>
    );
  }

  return (
    <StyledFlexDiv
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
      padding="16px"
      outline={`1px dashed ${theme.colors.neutral70}`}
      borderRadius={theme.radius.small}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      minHeight="82px"
    >
      <StyledFlexDiv
        justifyContent="center"
        alignItems="center"
        gap={isMobile ? theme.spacings.spacing03 : theme.spacings.spacing05}
        width={isMobile ? '100%' : ''}
      >
        <Icon
          iconName={
            selectedFile && errors?.message
              ? 'OutlinedCloudOff'
              : 'OutlinedUpload'
          }
          color={selectedFile && errors?.message ? 'secondary' : 'primary'}
          size="32px"
          style={{
            ...iconStyle,
            cursor: 'auto',
          }}
        />
        {selectedFile ? fileUploaded() : fileNotUploaded()}
        <UploadInput
          id={id}
          name={name}
          accept={accept}
          onChange={onHandleChange}
          disabled={disabled}
        />
      </StyledFlexDiv>
    </StyledFlexDiv>
  );
};

const UploadInput = ({ id, name, accept, onChange, disabled }) => {
  const onHandleClick = (event) => {
    /*
     * This function addresses the issue where the same file cannot be uploaded twice, even after it has been deleted.
     * The problem arises because during the onChange event, the event.target.value remains the same.
     * By setting event.target.value to an empty string, we ensure that the input field is cleared and allowing users to upload the same file again.
     * This workaround is implemented to handle inconsistencies across different browsers.
     */
    if (event.target.files[0]) {
      // eslint-disable-next-line no-param-reassign
      event.target.value = '';
    }
  };

  return (
    <input
      id={id}
      name={name}
      type="file"
      accept={accept}
      onChange={onChange}
      disabled={disabled}
      onClick={onHandleClick}
      hidden
    />
  );
};

UploadFile.defaultProps = {
  accept: '',
  disabled: false,
  file: null,
  maxSize: '',
  variant: 'link',
  isUploadPhoto: false,
  isUploadValidation: false,
  rules: {},
  control: null,
  hideRemoveButton: false,
  hideDownloadFile: false,
  table: {},
  maxSizeErrMsg: '',
  fileFormatErrMsg: '',

  onHandleDownload: null,
  onChange: () => {},
  getError: () => {},
};

UploadFile.propTypes = {
  accept: PropTypes.string,
  disabled: PropTypes.bool,
  file: PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  maxSize: PropTypes.string, // Units: 'Bytes', 'KB', 'MB', 'GB', 'TB'. e.g: '100KB', '10MB', '1GB'
  variant: PropTypes.oneOf(['link', 'dragAndDrop']),
  rules: PropTypes.shape({}),
  control: PropTypes.shape({}),
  hideRemoveButton: PropTypes.bool,
  hideDownloadFile: PropTypes.bool,
  table: PropTypes.shape({}),
  maxSizeErrMsg: PropTypes.string,
  fileFormatErrMsg: PropTypes.string,

  onHandleDownload: PropTypes.func,
  onChange: PropTypes.func,
  getError: PropTypes.func, // Use this prop to send error message if you are not using React Hook Form
  isUploadPhoto: PropTypes.bool,
  isUploadValidation: PropTypes.bool,
};

UploadInput.defaultProps = {
  accept: '',
  disabled: false,

  onChange: () => {},
};

UploadInput.propTypes = {
  accept: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,

  onChange: PropTypes.func,
};

UploadTypeLink.defaultProps = {
  accept: '',
  disabled: false,
  selectedFile: null,
  errors: {},

  onHandleChange: () => {},
  onHandleKeyDown: () => {},
  onHandleRemoveFile: () => {},
};

UploadTypeLink.propTypes = {
  accept: PropTypes.string,
  disabled: PropTypes.bool,
  selectedFile: PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.shape({
    message: PropTypes.string,
  }),

  onHandleChange: PropTypes.func,
  onHandleKeyDown: PropTypes.func,
  onHandleRemoveFile: PropTypes.func,
};

UploadTypeDragAndDrop.defaultProps = {
  accept: '',
  currentFileSize: null,
  disabled: false,
  isUploadPhoto: false,
  isUploadValidation: false,
  selectedFile: null,
  errors: {},
  isMobile: false,
  maxSize: '',
  progress: 0,
  hideRemoveButton: false,
  table: {},
  onHandleDownload: null,
  onHandleChange: () => {},
  onHandleKeyDown: () => {},
  onHandleRemoveFile: () => {},
};

UploadTypeDragAndDrop.propTypes = {
  accept: PropTypes.string,
  currentFileSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  isUploadPhoto: PropTypes.bool,
  isUploadValidation: PropTypes.bool,
  selectedFile: PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.shape({
    message: PropTypes.string,
  }),
  isMobile: PropTypes.bool,
  maxSize: PropTypes.string,
  progress: PropTypes.number,
  hideRemoveButton: PropTypes.bool,
  table: PropTypes.shape({
    tableColumn: PropTypes.shape([]),
    tableBody: PropTypes.shape([]),
    paginationState: PropTypes.shape({
      page: PropTypes.number,
      limit: PropTypes.number,
    }),
    totalSuccess: PropTypes.number,
    totalFailed: PropTypes.number,
    totalData: PropTypes.number,
    handleSetPage: PropTypes.func,
    handleSetLimit: PropTypes.func,
    handleDownloadUploadedFile: PropTypes.func,
    isFetchingUploadedFile: PropTypes.bool,
  }),

  onHandleDownload: PropTypes.func,
  onHandleChange: PropTypes.func,
  onHandleKeyDown: PropTypes.func,
  onHandleRemoveFile: PropTypes.func,
};
