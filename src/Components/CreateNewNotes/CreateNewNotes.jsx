import React, { useState } from 'react'
import styles from './CreateNewNotes.module.css'

function CreateNewNotes(props) {

    // for storing input groupName, color and error
    const [groupName, setGroupName] = useState('');
    const [selectedColor, setSelectedColor] = useState('')
    const [error, setError] = useState(false)

    // list of colors to be selected from
    const defaultColors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF']

    // for getting input groupName
    const getGroupName = (e) => {
        setGroupName(e.target.value)
    }
    // for getting input color
    const selectColor = (e) => {
        setSelectedColor(e.target.value)
    }

    // for handling new note creation button
    const handleCreateNote = () => {
        if (groupName.length !== 0 && selectedColor !== '') {
            // console.log(groupName, selectedColor)
            props.setCreating(false)
            setError(false)
            const groupsList = JSON.parse(localStorage.getItem('Notes'))
            // for initializing new group
            const newGroup = {
                id: groupsList.length.toString(),
                groupName: groupName,
                color: selectedColor,
                notesList: []
            }
            groupsList.unshift(newGroup)
            localStorage.setItem('Notes', JSON.stringify(groupsList))
            console.log(groupsList)
            // for selecting the created group immediately
            props.setSelected(newGroup.id)
        }
        else {
            setError(true)
        }
    }
    return (
        <div className={styles.backCover}>
            <div className={styles.createNotesPopup}>
                <p className={styles.text}>Create New Notes group</p>
                <div className={styles.groupName}>
                    <p>Group Name</p>
                    <input className={styles.groupNameInput} type="text"
                        value={groupName}
                        onChange={getGroupName}
                        placeholder='Enter your group name....'
                    />
                    {
                        error && groupName.length === 0 &&
                        <small className={styles.errorMessage}>* Required</small>
                    }
                </div>
                <div className={styles.colors}>
                    <p>Choose colour</p>
                    <div className={styles.colorsContainer}>
                        {
                            defaultColors.map((col) =>
                                <button key={col} className={styles.circle}
                                    style={{
                                        backgroundColor: col,
                                        transform: selectedColor === col && 'scale(1.2)',
                                        boxShadow: selectedColor === col && '0 0 5px 0px',
                                        border: selectedColor === col && '2px solid white'
                                    }}
                                    value={col}
                                    onClick={selectColor} >
                                </button>
                            )
                        }
                    </div>
                    {
                        error && selectedColor === '' &&
                        <small className={styles.errorMessage}>* Required</small>
                    }
                </div>
                <button className={styles.createButton} onClick={handleCreateNote}>Create</button>
            </div>
        </div>
    )
}

export default CreateNewNotes