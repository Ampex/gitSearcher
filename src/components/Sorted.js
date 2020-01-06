import React from 'react'

const Sorted = props => {
  const { value, sorted, list } = props
  return value ? sorted : list
}
export default Sorted
