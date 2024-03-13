export default function urlContainsJsApi(url: string): boolean {
  if (!url) {
    return false;
  }

  return url.split('?').pop().includes('enablejsapi=1');
}
