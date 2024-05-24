import { Typography } from "@mui/material"
import styled from "styled-components"

export const Title = styled(Typography)({
  fontWeight: 'bold !important',
})

export const TopCenterTitle = styled(Typography)<{ height: number }>((props) => ({
  fontWeight: 'bold !important',
  position: 'fixed',
  top: `${props.height}%`,
  left: '50%',
  transform: `translate(-50%, -${props.height}%)`
}))

export const Subtitle = styled(Typography)({
  fontWeight: 'bold !important',
  maxWidth: '35vw'
})

export const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: '0.5em 0.5em 1em rgb(74 72 72 / 60%)',
  align: 'center',
  p: 4,
}