import React from 'react'
import TopbarComp from './topbar/TopbarComp'
import "./Panel.css"
import { Route, Routes } from 'react-router-dom'
import SourceConnection from './connection/SourceConnection'
import TargetConnection from './connection/TargetConnection'
function Panel() {
    return (
        <>
            <TopbarComp />
            <Routes>
                <Route path='source' element={<SourceConnection />} />
                <Route path='target' element={<TargetConnection />} />
            </Routes>
        </>
    )
}

export default Panel