const fs = require('fs')
const chalk = require('chalk')
const { Console } = require('console')

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bgGreen('Your notes'))
    notes.forEach(note => {
        console.log('title: ' + note.title)
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteFound = notes.find((note) => note.title === title)
    if(noteFound){
        console.log(chalk.bgGreen('Title: ' + noteFound.title))
        console.log(noteFound.body)
    } else {
        console.log(chalk.bgRed('No note found!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if(notesToKeep.length === notes.length){
        console.log(chalk.bgRed('No note found!'))
    } else {
        saveNotes(notesToKeep)
        console.log(chalk.bgGreen('Note removed!'))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote)
    {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added'))
    }
    else
    {
        console.log(chalk.bgRed('Note title taken!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}