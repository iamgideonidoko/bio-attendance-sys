export const removeObjectProps = <TData extends { [k: string]: unknown }, TRes = TData>(
  obj: TData,
  props: string[] = [],
): TRes => {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => !props.includes(key))) as TRes;
};

export const getImgStringfromBase64Data = (base64ImageData: string) => `data:image/png;base64,${base64ImageData}`;
