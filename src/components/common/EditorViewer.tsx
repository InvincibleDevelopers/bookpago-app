import {RichText, TenTapStartKit, useEditorBridge} from '@10play/tentap-editor';

interface EditorViewerProps {
  html: string;
}

const EditorViewer = ({html}: EditorViewerProps) => {
  const editor = useEditorBridge({
    initialContent: html,
    bridgeExtensions: TenTapStartKit,
    dynamicHeight: true,
    editable: false,
  });

  return <RichText editor={editor} />;
};

export default EditorViewer;
