import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {
    const bg = props.backgroundColor ? 'bg-' + props.backgroundColor : 'bg-main';
    const size = props.size ? 'button-' + props.size : '';
    const animate = props.animate ? 'button-animate' : ''
  return (
    <button
        className={`button ${bg} ${size} ${animate}`}
        onClick = {props.onclickMode ? () => props.onclickMode() : null}
    >
        <span className='button__txt'>{props.children}</span>
        {
            props.icon ? (
                <span className='button__icon'>
                    <i className={`${props.icon} bx-tada`}></i>
                </span>
            ) : null
        }
    </button>
  )
}

Button.propTypes = {
    backgroundColor : PropTypes.string,
    size : PropTypes.string,
    icon : PropTypes.string,
    animate : PropTypes.bool,
    onclickMode : PropTypes.func
}

export default Button