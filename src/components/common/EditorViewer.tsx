import {RichText, TenTapStartKit, useEditorBridge} from '@10play/tentap-editor';
import {useEffect, useState} from 'react';

interface EditorViewerProps {
  html: string;
}

const EditorViewer = ({html}: EditorViewerProps) => {
  const editor = useEditorBridge({
    initialContent: html,
    bridgeExtensions: TenTapStartKit,
    dynamicHeight: true,
  });

  return <RichText editor={editor} />;
};

export default EditorViewer;
