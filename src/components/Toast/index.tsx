import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import { Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { emitter } from '../../utils'

const Toast = React.memo((): JSX.Element => {
  const [info, setInfo] = React.useState<{
    visible: boolean
    message: string
    type?: 'success' | 'info' | 'warning' | 'error'
  }>({
    visible: false,
    message: '',
  })

  React.useEffect(() => {
    emitter.on(
      'toast',
      (data: {
        message: string
        type?: 'success' | 'info' | 'warning' | 'error'
      }) => {
        setInfo({
          visible: true,
          ...data,
        })
      }
    )
  }, [info])

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setInfo((ct) => ({ ...ct, visible: false }))
  }

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        撤销
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={info.visible}
      autoHideDuration={6000}
      onClose={handleClose}
      message={info.message}
      action={action}
    />
  )
})

export default Toast
