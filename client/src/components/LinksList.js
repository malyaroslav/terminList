import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";

export const LinksList = ({ links }) => {
    const {token} = useContext(AuthContext)
    const {request} = useHttp()

    const linkId = useParams().id

    const getLink = useCallback(async () => {
        try {
            await request(`/api/links/del/${linkId}`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            })

        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if (!links.length) {
        return <p className="center">Kein Treffen</p>
    }

    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Mit wem</th>
                <th>Zeit</th>
                <th>Ort</th>
                <th>Mehr</th>
            </tr>
            </thead>

            <tbody>
            { links.map((link, index) => {
                return (

                    <tr key={link._id}>
                        <td>{index + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td>{link.place}</td>
                        <td>
                            <Link to={`/detail/${link._id}`}>Open</Link>
                            <Link to={`/links/del/${link._id}`}>Del</Link>

                        </td>
                    </tr>
                )
            }) }
            </tbody>
        </table>
    )
}
