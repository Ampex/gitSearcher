import React from 'react'
import {
  Paper,
  IconButton,
  CircularProgress,
  InputBase
} from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish'
import CheckIcon from '@material-ui/icons/Check'

const Results = props => {
  const { handleLoad, isDisabled, isLoaded, handleChange, value } = props

  return (
    <Paper>
      <IconButton
        onClick={handleLoad}
        disabled={isDisabled}
        aria-label='menu'
        style={{ margin: '0 5px' }}
      >
        {isLoaded ? <CheckIcon color='primary' /> : <PublishIcon />}
        {isDisabled && <CircularProgress style={{ position: 'absolute' }} />}
      </IconButton>
      <InputBase
        disabled={isLoaded ? false : true}
        onChange={handleChange}
        type='text'
        value={value}
        placeholder={
          isLoaded ? 'Search for projects' : 'Fetch for projects first'
        }
      />
    </Paper>
  )
}
export default Results
