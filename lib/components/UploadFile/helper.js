import { isArray, isEmpty } from 'lodash';

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
  const fileSize = parseFloat((bytes / k ** i).toFixed(2));

  if (!fileSize) return null;

  return `${fileSize} ${sizes[i]}`;
};

export const fileSizeValidator = (fileSize, maxAllowedSize) => {
  const match = maxAllowedSize.match(/^(\d+(\.\d+)?)([KMG]B)$/i);

  if (match?.[1] && match?.[3]) {
    const inputSize = parseFloat(match[1]);
    const unit = match[3].toUpperCase();

    let maxSizeInByte;

    if (unit === 'KB') {
      maxSizeInByte = inputSize * 1024;
    } else if (unit === 'GB') {
      maxSizeInByte = inputSize * 1024 * 1024 * 1024;
    } else {
      maxSizeInByte = inputSize * 1024 * 1024;
    }

    if (fileSize > maxSizeInByte) {
      return true;
    }
  }
  return false;
};

export const getContentTypeFile = (fileExt) => {
  let contentType;
  switch (fileExt) {
    case 'pdf':
      contentType = 'application/pdf';
      break;
    case 'ppt':
      contentType = 'application/vnd.ms-powerpoint';
      break;
    case 'pptx':
      contentType =
        'application/vnd.openxmlformats-officedocument.presentationml.presentation';
      break;
    case 'xls':
      contentType = 'application/vnd.ms-excel';
      break;
    case 'xlsx':
      contentType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      break;
    case 'doc':
      contentType = 'application/msword';
      break;
    case 'docx':
      contentType =
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      break;
    case 'csv':
      contentType = 'text/csv';
      break;
    case 'xml':
      contentType = 'application/xml';
      break;
    case 'gif':
      contentType = 'image/gif';
      break;
    case 'png':
      contentType = 'image/png';
      break;
    case 'jpeg':
      contentType = 'image/jpeg';
      break;
    case 'jpg':
      contentType = 'image/jpg';
      break;
    case 'svg':
      contentType = 'image/svg+xml';
      break;
    case 'zip':
      contentType = 'application/zip';
      break;
    default:
      break;
  }
  return contentType;
};

export const getFormatFile = (contentType) => {
  let formatFile;
  switch (contentType) {
    case 'application/pdf':
      formatFile = '.pdf';
      break;
    case 'application/vnd.ms-powerpoint':
      formatFile = '.ppt';
      break;
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      formatFile = '.pptx';
      break;
    case 'application/vnd.ms-excel':
      formatFile = '.xls';
      break;
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      formatFile = '.xlsx';
      break;
    case 'application/msword':
      formatFile = '.doc';
      break;
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      formatFile = '.docx';
      break;
    case 'text/csv':
      formatFile = '.csv';
      break;
    case 'application/xml':
      formatFile = '.xml';
      break;
    case 'image/gif':
      formatFile = '.gif';
      break;
    case 'image/png':
      formatFile = '.png';
      break;
    case 'image/jpeg':
      formatFile = '.jpeg';
      break;
    case 'image/jpg':
      formatFile = '.jpg';
      break;
    case 'image/svg+xml':
      formatFile = '.svg';
      break;
    case 'application/zip':
      formatFile = '.zip';
      break;
    default:
      break;
  }
  return formatFile;
};

const handleConvertFormatFileToContentType = (allowedFormat = '') => {
  let arr = [];
  const tempData = allowedFormat?.replace(/\./g, '')?.split(', ');
  if (!isEmpty(tempData) && isArray(tempData)) {
    arr = [...tempData]?.map((item) => getContentTypeFile(item));
  }
  return arr;
};

export const fileFormatValidator = (fileExt, allowedFormat) => {
  if (isEmpty(allowedFormat)) return false;
  const allowedFormatFile = handleConvertFormatFileToContentType(allowedFormat);
  const isValidFormat = allowedFormatFile.includes(fileExt);

  if (isValidFormat) {
    return false;
  }
  return true;
};
