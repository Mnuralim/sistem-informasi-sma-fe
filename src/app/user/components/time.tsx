'use client'
import React, { useState, useEffect } from 'react'

const Time = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    }
    return date.toLocaleTimeString(undefined, options)
  }

  return (
    <div className="text-white text-sm">
      <p>{formatTime(time)}</p>
    </div>
  )
}

export default Time
