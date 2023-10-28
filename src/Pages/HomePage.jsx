import React, { useState } from 'react'
import styles from './HomePage.module.css'

import NamesList from '../Components/NameList/NamesList'
import CreateNewNotes from '../Components/CreateNewNotes/CreateNewNotes';
import DisplayNotes from '../Components/DisplayNotes/DisplayNotes'

function HomePage() {

    // for status of whether creating new note
    const [creating, setCreating] = useState(false);

    // for storing selected groupName
    const [selected, setSelected] = useState('');

    // for status of notes updation, passed to namesList for re-render purpose
    const [updated, setUpdated] = useState()

    return (
        <>
            <div className={styles.HomePage} >
                <NamesList setCreating={setCreating} selected={selected} setSelected={setSelected} updated={updated} />
                <DisplayNotes selected={selected} setSelected={setSelected} setUpdated={setUpdated} />
            </div>
            {
                creating &&
                <CreateNewNotes setCreating={setCreating} setSelected={setSelected} />
            }
        </>
    )
}

export default HomePage