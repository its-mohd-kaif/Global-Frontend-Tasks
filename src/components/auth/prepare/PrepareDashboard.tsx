import { FlexLayout, Progressbar, TextStyles } from '@cedcommerce/ounce-ui'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BigGreenCheck from '../../../assets/images/svg/BigGreenCheck';
import "./PrepareDashboard.css"
function PrepareDashboard() {
    const [percentage, setPercentage] = useState<number>(0);
    const navigate = useNavigate();
    const user_id = useSelector((redux: any) => redux.redux.user_id)
    useEffect(() => {
        let cal = setInterval(() => {
            setPercentage((val) => val + 1.5625)
        }, 31.25)
        if (percentage === 100) {
            clearInterval(cal)
        }
    }, [])
    /**
     * when 100 percentage in 2 sec completed we navigate to dashboard component 
     */
    useEffect(() => {
        if (percentage === 100) {
            navigate(`/panel/${user_id}/dashboard`)
        }
    }, [percentage])
    return (
        <div className='prepareDashboard'>
            <FlexLayout valign='center' direction='vertical'>
                <BigGreenCheck />
                <TextStyles fontweight='bold' type='Heading'>You have successfully onboarded</TextStyles>
            </FlexLayout>
            <div className='prepareDashboard__bar'>
                <div className='prepareDashboard__bar__title'>
                    <TextStyles alignment='center'>Setting up your account..</TextStyles>
                </div>
                <Progressbar
                    percentage={percentage}
                    progessThickness="thin"
                />
            </div>
        </div>
    )
}

export default PrepareDashboard