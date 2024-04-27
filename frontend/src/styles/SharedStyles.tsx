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