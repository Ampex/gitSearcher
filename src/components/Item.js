import React from 'react'
import { Grow, Paper, Typography, Link, Divider, Chip } from '@material-ui/core'

const Item = props => {
  const { url, name, description, tag } = props
  return (
    <div className='item'>
      <Grow in>
        <Paper>
          <Link href={url}>
            <Typography style={{ padding: 15 }} variant='h5' component='h3'>
              {name}
            </Typography>
          </Link>
          <Divider />
          <Typography
            style={{ padding: '8px 15px', flexWrap: 'nowrap' }}
            component='p'
          >
            {description}
          </Typography>
          {tag ? (
            <React.Fragment>
              <Divider />
              <Typography style={{ padding: 15 }} component='div'>
                <Chip size='small' label={tag} />
              </Typography>
            </React.Fragment>
          ) : (
            false
          )}
        </Paper>
      </Grow>
    </div>
  )
}
export default Item
