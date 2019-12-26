const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const dupNote =  findNote(notes, title)

    // debugger

    if (dupNote === undefined) {
        // or if (!dupNote)
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.bold('New note added!'))
     } else {
        // console.log(chalk.red('Note title "' + title + '" taken, title must be unique'))
        // better option is to append to existing note body...
        const addBody = dupNote.body + ' \n' + body
        const cleanNotes =  notes.filter(note => (note.title !== title))
        cleanNotes.push({
            title: title,
            body: addBody
        })
        saveNotes(cleanNotes)
        console.log(chalk.green.bold('Note title "' + title + '" taken, body text has been appended.'))
 
    }    
}

const removeNote = (title) => {
    const notes = loadNotes()
    const cleanNotes =  notes.filter(note => (note.title !== title))
    // how would this look using splice instead?
 
    if (cleanNotes.length < notes.length) {
        saveNotes(cleanNotes)
        console.log(chalk.green.bold('Note removed!'))
    } else {
        console.log(chalk.red('Note title "'+ title + '" not found. Unable to remove'))
    }    
}


const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

const loadNotes = () => {
    try {
        const dataBuffer =fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)   
    } catch (e) {
        return []
    }
    
}

const findNote = (notes, title) => {
    return notes.find((note) => (note.title === title))
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.green.bold.underline('Your notes:'))
    notes.forEach((note) => {
        console.log(note.title)})
}

const readNote = (title) => {
    const notes = loadNotes()
    const myNote =  findNote(notes, title)
 
    if (myNote) {
        console.log(chalk.green.bold.underline(title + ':'))
        console.log(chalk.green(myNote.body))
    } else {
        console.log(chalk.red('Note title "'+ title + '" not found. Unable to read'))
    }    
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote,
    listNotes: listNotes
}