import React from 'react'
import styles from './DisplayName.module.css'

function DisplayName(props) {

    // for applying custom styles
    const customStyles = {
        backgroundColor: props.color
    }

    // for checking if the groupName is selected
    const selected = props.isSelected === props.id

    return (
        <div id={props.id} className={styles.Name} style={{ backgroundColor: selected && '#F7ECDC', cursor: 'pointer' }} >
            <span style={customStyles} className={styles.icon}>
                {props.groupName.slice(0,2).toUpperCase()}
            </span>
            {props.groupName}
        </div>
    )
}

export default DisplayName