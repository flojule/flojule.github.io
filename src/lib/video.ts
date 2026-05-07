export function getVideoMimeType(videoPath: string): string {
  const extension = videoPath.split(".").pop()?.toLowerCase();
  if (extension === "webm") return 'video/webm; codecs="vp9"';
  if (extension === "ogg" || extension === "ogv") return "video/ogg";
  return "video/mp4";
}

export function getVideoSources(videoPath: string): string[] {
  const extension = videoPath.split(".").pop()?.toLowerCase();
  if (extension === "mp4") {
    const webmPath = videoPath.replace(/\.mp4$/i, ".webm");
    return [webmPath, videoPath];
  }
  return [videoPath];
}
