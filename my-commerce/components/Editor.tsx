import dynamic from 'next/dynamic';
import {useEffect, useState , useRef, Dispatch, SetStateAction} from 'react';
import { EditorProps, EditorState } from 'react-draft-wysiwyg';
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
                readOnly={readonly}
                editorState={editorState}
                toolbarHidden={readonly}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
                toolbar = {{
                    Options: ['inline', 'list', 'textAlign', 'link']
                }}
                localization={{
                    locale: 'Ko'
                }}
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