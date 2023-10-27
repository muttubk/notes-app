import React, { useEffect } from 'react'
import styles from './NamesList.module.css'

import DisplayName from '../DisplayName/DisplayName'

function NamesList(props) {

    // for setting selected groupName
    const handleSelection = (e) => {
        props.setSelected(e.target.id)
    }

    // for setting creating status to true
    const createNewNote = () => {
        props.setCreating(true)
    }

    // for setting new Notes item in local storage if already not present
    useEffect(() => {
        const notesSaved = localStorage.getItem('Notes')
        if (!notesSaved) {
            const newNotes = []
            localStorage.setItem('Notes', JSON.stringify(newNotes))
        }
    }, [])

    // for storing notes from local storage
    const notes = JSON.parse(localStorage.getItem('Notes'))

    return (
        <div className={styles.NamesList}>
            <h1 className={styles.appName}>Pocket Notes</h1>
            <div className={styles.container}>
                <button className={styles.createNotesButton} onClick={createNewNote} >
                    <span className={styles.plusIcon}>+</span> Create Notes group
                </button>
                <div className={styles.listContainer} onClick={handleSelection} >
                    {
                        notes &&
                        notes.map((note) =>
                            <DisplayName key={note.id} {...note} isSelected={props.selected} />
                        )
                    }
                    {/* <Name color={'blue'} groupName={'Cuvette Notes'} isSelected={selected} /> */}
                </div>
            </div>
        </div>
    )
}

export default NamesList