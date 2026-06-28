export const toIsoString = (
  dateValue: string | Date | undefined | null
): string => {
  if (!dateValue) return "";
  
  const date = new Date(dateValue);
  
  if (isNaN(date.getTime())) return "";
  
  return date.toISOString();
};
