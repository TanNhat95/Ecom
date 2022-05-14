import React, { useRef } from 'react'
import PropTypes from 'prop-types'

const CheckBox = props => {

    const inputRef = useRef(null);

    const onChangeCheckBox = () => {
        if(props.onChange){
            props.onChange(inputRef.current)
        }
    }
  return (
    <label className='custom-checkbox'>
        <input type='checkbox' ref={inputRef} checked={props.checked} onChange={onChangeCheckBox}/>
        <span className="custom-checkbox__checkmark">
            <i className="bx bx-check"></i>
        </span>
        {props.label}
    </label>
  )
}

CheckBox.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool
}

export default CheckBox