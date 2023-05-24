import React from 'react'
import TopbarComp from './topbar/TopbarComp'
import "./Panel.css"
import { Route, Routes } from 'react-router-dom'
import SourceConnection from './connection/SourceConnection'
function Panel() {
    return (
        <>
            <TopbarComp />
            <Routes>
                <Route path='source' element={<SourceConnection />} />
            </Routes>
        </>
    )
}

export default Panel