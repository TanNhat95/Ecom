import React from 'react'
import PropTypes from 'prop-types'

const Grid = props => {

    const style ={
        gap: props.gap ? `${props.gap}px` : '0'
    }

    const col = props.col ? `grid-col-${props.col}` : ''
    const mdcol = props.mdcol ? `grid-col-md-${props.mdcol}` : ''
    const smcol = props.smcol ? `grid-col-sm-${props.smcol}` : ''

    return (
        <div className={`grid ${col} ${mdcol} ${smcol}`} style={style}>
            {props.children}
        </div>
  )
}


Grid.propTypes = {
    col: PropTypes.number.isRequired,
    mdcol: PropTypes.number,
    smcol: PropTypes.number,
    gap: PropTypes.number
}

export default Grid