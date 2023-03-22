import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Note Added Successfully", "primary")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="my-3 container">
            <h2 className='mt-0'>Add Note</h2>
            <form>
                <div className="mb-2">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title"
                        value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-2">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" value={note.description} id="description" name="description" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-2">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" value={note.tag} className="form-control" id="tag" name="tag" onChange={onChange} />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
            </form>
        </div>
    )
}

export default AddNote
