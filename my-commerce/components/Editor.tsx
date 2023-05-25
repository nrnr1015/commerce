import dynamic from 'next/dynamic';
import {useEffect, useState , useRef, Dispatch, SetStateAction} from 'react';
import { Editor, EditorProps, EditorState } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styled from 'styled-components';
import Button from './Button';

const Editor = dynamic<EditorProps>(
    () => import('react-draft-wysiwyg')
    .then((module) => module.Editor),
    {
        ssr:false
    }
)
export default function CustomEditor({
    editorState, 
    readonly = false,
    onEditorStateChange,
    onSave,
}: {
    editorState: EditorState, 
    readonly?: boolean,
    onSave?: () => void
    onEditorStateChange?: Dispatch<SetStateAction<EditorState | undefined>>
}) {
    
    return (
        <Wrapper>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
            />
            {
            !readonly && <Button onClick={onSave}>Save</Button>
            }
        </Wrapper>
    )
}
const Wrapper = styled.div`
    padding: 10px
`