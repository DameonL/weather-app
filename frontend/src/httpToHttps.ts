export default function httpToHttps(location: string) {
  return location.replace(/http:\/\//i, "https://");
}
