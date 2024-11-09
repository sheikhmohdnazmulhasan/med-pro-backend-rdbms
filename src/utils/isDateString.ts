const isDateString = (str: string): boolean => !isNaN(Date.parse(str));

export default isDateString