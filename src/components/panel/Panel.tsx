import React from 'react'
import TopbarComp from './topbar/TopbarComp'
import "./Panel.css"
import { Route, Routes } from 'react-router-dom'
import SourceConnection from './connection/SourceConnection'
import TargetConnection from './connection/TargetConnection'
import MappingTemplate from './default/MappingTemplate'
import DefaultSetting from './default/DefaultSetting'
function Panel() {
    return (
        <>
            <TopbarComp />
            <Routes>
                <Route path='source' element={<SourceConnection />} />
                <Route path='target' element={<TargetConnection />} />
                <Route path='mapping' element={<MappingTemplate />} />
                <Route path='setting' element={<DefaultSetting />} />
            </Routes>
        </>
    )
}

export default Panel