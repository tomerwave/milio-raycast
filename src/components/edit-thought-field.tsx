import { Form } from "@raycast/api";

interface Props {
  content: string;
  error?: string;
  onChange: () => void;
}

export function EditThoughtField({ content, error, onChange }: Props) {
  return (
    <Form.TextArea
      id="content"
      title="Thought"
      defaultValue={content}
      autoFocus
      error={error}
      onChange={onChange}
    />
  );
}
