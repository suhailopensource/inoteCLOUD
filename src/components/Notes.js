import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes()
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }
  const handleClick = (e) => {
    console.log("updating the note", note)
    editNote(note.id, note.etitle, note.edescription, note.tag);
    refClose.current.click();
    props.showAlert("Note Updated Successfully", "info")
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" value={note.etag} className="form-control" id="etag" name="etag" onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Your Note</h2>
        <div className='container'>
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes
