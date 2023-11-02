import React, { useEffect, useState } from 'react'
import styles from './DisplayNotes.module.css'

import defaultImage from '../../assets/defaultImage.png'
import lockImage from '../../assets/lockIcon.svg'
import enterIcon from '../../assets/enterIcon.svg'
import goBackIcon from '../../assets/goBackIcon.svg'
import DisplayName from '../DisplayName/DisplayName'

function DisplayNotes(props) {

    // for storing new note to be added
    const [newNote, setNewNote] = useState('');

    // for storing old notes list of a groupName
    const [oldNotes, setOldNotes] = useState([])
    useEffect(() => {
        if (props.selected) {
            const notes = JSON.parse(localStorage.getItem('Notes')).filter(note => note.id === props.selected)[0].notesList
            setOldNotes(notes)
        }
    }, [props.selected])

    // for storing complete "Notes" from local storage
    const completenotes = JSON.parse(localStorage.getItem('Notes'))
    // for storing current selected notes group
    const currentGroup = completenotes ? completenotes.filter(note => note.id === props.selected)[0] : {}

    // for storing month names
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // for getting the current time
    const getTime = () => {
        const time = new Date()
        let hour = time.getHours()
        const minute = time.getMinutes()
        const ampm = hour < 12 ? 'AM' : 'PM'
        hour = hour === 0 ? '12' : hour > 12 ? hour % 12 : hour
        return hour + ":" + minute + " " + ampm
    }
    // for getting current date
    const getDate = () => {
        const time = new Date()
        return time.getDate() + " " + monthNames[time.getMonth()] + " " + time.getFullYear()
    }

    // for getting new input note
    const handleInput = (e) => {
        setNewNote(e.target.value)
    }

    // for handling submission new note
    const handleSubmit = () => {
        if (newNote.trim().length === 0) {
            return
        }
        const time = getTime()
        const date = getDate()
        let newnotesList = [...oldNotes]
        const newernote = {
            date: date,
            time: time,
            content: newNote
        }
        // newnotesList.unshift(newernote)
        newnotesList.push(newernote)

        setOldNotes(newnotesList)
        setNewNote('')
        const updatedGroup = [
            {
                ...currentGroup,
                notesList: newnotesList
            }
        ]
        const newcompletenotes = completenotes.filter(group => group.id !== props.selected)
        localStorage.setItem('Notes', JSON.stringify(updatedGroup.concat(newcompletenotes)))
        // setting updated status as updated group id
        props.setUpdated(props.selected)
    }

    // for going back to name list
    const handleGoBack = () => {
        props.setSelected('')
    }

    return (
        <div className={styles.NotesDisplay} style={{ right: props.selected && '0' }}>
            {
                !props.selected &&
                <div className={styles.defaultContainer}>
                    <img src={defaultImage} alt="" />
                    <h1>Pocket Notes</h1>
                    <p>Send and receive messages without keeping your phone online.
                        Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
                    <div className={styles.footer}>
                        <img src={lockImage} alt="" />
                        <p>end-to-end encrypted</p>
                    </div>
                </div>
            }

            {
                props.selected &&
                <div className={styles.notesContainer}>
                    <div className={styles.header} >
                        <img className={styles.goBackIcon} src={goBackIcon} alt='go back' onClick={handleGoBack} />
                        <DisplayName {...currentGroup} />
                    </div>
                    <div className={styles.notesList}>
                        {
                            oldNotes &&
                            oldNotes.map((item, idx) =>
                                <div key={idx} className={styles.note}>
                                    <div className={styles.timeAndDate}>
                                        <p className={styles.time}>
                                            {item.time}
                                        </p>
                                        <p className={styles.date}>
                                            {item.date}
                                        </p>
                                    </div>
                                    <p className={styles.noteContent}>
                                        {item.content}
                                    </p>
                                </div>
                            )
                        }
                    </div>
                    <div className={styles.notesInputContainer}>
                        <textarea className={styles.notesInput}
                            value={newNote}
                            onChange={handleInput}
                            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { handleSubmit(); e.preventDefault() } }}
                            name="" id="" cols="30" rows="10" placeholder='Enter your text here...........'></textarea>
                        <img src={enterIcon} className={styles.enterImage} alt="" onClick={handleSubmit} />
                    </div>
                </div>
            }
        </div >
    )
}

export default DisplayNotes