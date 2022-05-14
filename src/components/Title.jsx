import React ,{useEffect} from 'react'
import PropTypes from 'prop-types'

const Title = props => {

    useEffect(() => {
      window.scrollTo(0,0)
    }, [])
    

    document.title = 'NhatShop - ' + props.title
    return (
        <div>{props.children}</div>
  )
}

Title.propTypes = {
    title:PropTypes.string.isRequired
}

export default Title