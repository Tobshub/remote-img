export default function createUrl(options?: { isPerm?: boolean }) {
  const prefix = options?.isPerm ? "p" : "t";
  const rand = (Math.random() + 1).toString(36).substring(2);
  const url = `${prefix}_${rand}`;
  return url;
}
