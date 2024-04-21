export const truncateString = (str: string, maxLength: number): string => {
  if (!str) return ""

  if (str.length <= maxLength) {
    return str
  }

  return str.substring(0, maxLength) + "..."
}

export const generateAcronym = (text) => {
  // Split the text into words
  const words = text.split(' ');

  // Extract the first letter of each word and concatenate them
  return words.map(word => word[0]).join('');
};


export const mentionRegex =  /\[([^\]]+)\]\(mention:([^\s]+)\s"([^"]+)"\)\s(.+)/;
