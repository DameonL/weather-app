import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

export default function CurrentWeather() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:7071/api/CurrentWeather?name=Test");
      const body = await response.json();
      setMessage(JSON.stringify(body, null, 1));
    })();
  }, []);

  return <div>{message}</div>;
}
