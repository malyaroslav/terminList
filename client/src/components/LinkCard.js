import React from 'react'

export const LinkCard = ({ link }) => {
    return (
        <>
            <h2>Termin mit {link.from}</h2>

            <p>WANN: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>MIT: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>WO: <a href={link.place} target="_blank" rel="noopener noreferrer">{link.place}</a></p>
            <p> Status <strong></strong></p>
            <p>CREATE: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </>
    )
}
