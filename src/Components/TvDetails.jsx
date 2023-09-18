import React from 'react'
import { useParams } from 'react-router-dom'

const TvDetails = () => {
  const { id } = useParams()
  console.log(id)
  return (
    <div>TvDetails</div>
  )
}

export default TvDetails