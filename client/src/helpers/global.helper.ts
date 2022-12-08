export const removeObjectProps = <TData extends { [k: string]: unknown }, TRes = TData>(
  obj: TData,
  props: string[] = [],
): TRes => {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => !props.includes(key))) as TRes;
};

export const getImgStringfromBase64Data = (base64ImageData: string) => `data:image/png;base64,${base64ImageData}`;

/**
 * Convert image URI to uploadable blob
 * const file = dataURIToBlob(image_uri);
 */
export const dataURIToBlob = (dataURI: string) => {
  const splitDataURI = dataURI.split(',');
  const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

  return new Blob([ia], { type: mimeString });
};
