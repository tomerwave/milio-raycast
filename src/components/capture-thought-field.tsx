import { Form } from "@raycast/api";

interface Props {
  title: string;
  error?: string;
  onChange: () => void;
}

export function CaptureThoughtField({ title, error, onChange }: Props) {
  return (
    <Form.TextField
      id="content"
      title={title}
      placeholder="What do you want to remember?"
      autoFocus
      error={error}
      onChange={onChange}
    />
  );
}
