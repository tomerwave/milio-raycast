import { useEffect, useState } from "react";
import { nextCaptureTitle } from "../content/capture-titles";

export function useCaptureTitle(): string {
  const [title, setTitle] = useState("Catch That Thought");

  useEffect(() => {
    void nextCaptureTitle().then(setTitle);
  }, []);

  return title;
}
