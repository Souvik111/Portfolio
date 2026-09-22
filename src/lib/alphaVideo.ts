// Transparent (alpha-channel) video sources.
// Safari only decodes alpha from HEVC (.mov, hvc1); Chromium/Firefox decode VP9 alpha (.webm)
// but Chromium also *claims* it can play hvc1 and then renders nothing, so order matters.
export function alphaVideoSources(base: string): { src: string; type: string }[] {
  const webm = { src: `${base}.webm`, type: "video/webm" };
  const mov = { src: `${base}.mov`, type: 'video/mp4; codecs="hvc1"' };
  const isSafari =
    typeof navigator !== "undefined" &&
    /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);
  return isSafari ? [mov, webm] : [webm, mov];
}
