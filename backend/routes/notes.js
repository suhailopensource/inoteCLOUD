const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Note = require("../models/Note");


// route 1 : get all the notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        res.status(500).send("internal server error");
    }
})

// route 2 : new note add POST login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid name').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, tag } = req.body;

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote)
    } catch (error) {
        res.status(500).send("internal server error");
    }
})

// route 3 : update existing  note and post login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        
        // create a new note
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag };
    
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
    
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }
    
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        res.status(500).send("internal server error");
    }
})


// route 4 deleting an exisiting note login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
        // only allow deletion if user owns this Note 
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "success": "note deleted", note: note });
    } catch (error) {
        res.status(500).send("internal server error");
    }
})

module.exports = router