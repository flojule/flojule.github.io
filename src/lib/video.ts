// Every video asset is VP9-in-WebM. The type hint lets a browser that cannot
// decode it skip the download and fall through to the element's fallback text.
export const VIDEO_MIME_TYPE = 'video/webm; codecs="vp9"';
