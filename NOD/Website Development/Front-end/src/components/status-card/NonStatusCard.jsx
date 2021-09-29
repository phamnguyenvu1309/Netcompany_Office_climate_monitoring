import React from 'react'

import './statuscard.css'

const NonStatusCard = props => {

    return (
        <div className='status-card '>
            <div className="status-card__info">
                <h4>{props.area}</h4>
            </div>
        </div>
    )
}

export default NonStatusCard
