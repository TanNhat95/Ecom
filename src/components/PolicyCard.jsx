import React from 'react'
import PropTypes from 'prop-types'

const PolicyCard = props => {
  return (
    <div className="policy-card">
        <div className="policy-card__icon">
            <i className={`${props.icon}`}></i>
        </div>
        <div className="policy-card__info">
            <div className="policy-card__info-name">
                {props.name}
            </div>
            <div className="policy-card__info-description">
                {props.description}
            </div>
        </div>
    </div>
  )
}

PolicyCard.propTypes = {
    name : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    icon : PropTypes.string.isRequired
}

export default PolicyCard