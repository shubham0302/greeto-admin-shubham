import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { FC, useCallback } from "react";

const config = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "|",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "undo",
    "redo",
  ],
};

type SFTextEditorProps = {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
};

const SFTextEditor: FC<SFTextEditorProps> = (props) => {
  const { value, onChange, disabled = false } = props;

  const onChangeText = useCallback(
    (_: any, editor: ClassicEditor) => {
      const data = editor.getData();
      onChange(data);
    },
    [onChange]
  );

  return (
    <CKEditor
      editor={ClassicEditor}
      config={config}
      data={value}
      onChange={onChangeText}
      disabled={disabled}
    />
  );
};
export default SFTextEditor;
