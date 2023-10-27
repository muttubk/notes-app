import React, { useState } from 'react'
import styles from './HomePage.module.css'

import NamesList from '../Components/NameList/NamesList'
import CreateNewNotes from '../Components/CreateNewNotes/CreateNewNotes';

function HomePage() {

    // for status of whether creating new note
    const [creating, setCreating] = useState(false);

    // for storing selected groupName
    const [selected, setSelected] = useState('');

    return (
        <>
            <div className={styles.HomePage} >
                <NamesList setCreating={setCreating} selected={selected} setSelected={setSelected} />
            </div>
            {
                creating &&
                <CreateNewNotes setCreating={setCreating} />
            }
        </>
    )
}

export default HomePage