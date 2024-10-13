'use client'
import React from 'react'
import { AppProgressBar } from 'next-nprogress-bar'

const ProgressBar = () => {
  return (
    <AppProgressBar
      height="6px"
      color="#EB5437"
      options={{
        showSpinner: false,
        easing: 'ease',
        speed: 1500,
      }}
      shallowRouting
    />
  )
}

export default ProgressBar
