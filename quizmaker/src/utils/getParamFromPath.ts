export default function getParamFromPath(s: String) {
  const parts = s.split("/");
  const lastPart = parts[parts.length - 1];
  return lastPart;
}
