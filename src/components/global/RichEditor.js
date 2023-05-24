import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
        [{ header: ['1' , '2' , '3' , '4' , '5' , '6'] }, , { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
        ],
        ['link'],
        // ['link', 'image'],
        ['clean'],
    ],
    clipboard: {
        matchVisual: false,
    },
}

const RichEditor = ({ content , setContent}) => {

    return (
        <div className='pb-8'>
            <ReactQuill 
            theme="snow" 
            value={content} 
            onChange={setContent}
            modules={modules}
            className='h-[250px]'
            />
        </div>
    )
}

export default RichEditor;
