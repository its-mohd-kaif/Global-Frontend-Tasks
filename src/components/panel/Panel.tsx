import React from 'react'
import TopbarComp from './topbar/TopbarComp'
import "./Panel.css"
import { Route, Routes } from 'react-router-dom'
import Onboarding from './onboarding/Onboarding'

function Panel() {
    return (
        <>
            <TopbarComp />
            <Routes>
                <Route path='onboarding' element={<Onboarding />} />
                {/* <Route path='source' element={<SourceConnection />} />
                <Route path='target' element={<TargetConnection />} />
                <Route path='mapping' element={<MappingTemplate />} />
                <Route path='setting' element={<DefaultSetting />} /> */}
            </Routes>
        </>
    )
}

export default Panel