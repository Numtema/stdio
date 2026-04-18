export function extractYouTubeId(url: string) {
  const patterns = [/(?:v=)([^&]+)/, /(?:youtu\.be\/)([^?&/]+)/, /(?:embed\/)([^?&/]+)/];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return "";
}
