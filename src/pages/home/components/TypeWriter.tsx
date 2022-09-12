// /* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, FunctionComponent } from 'react'

interface Props {
  speed: number
  eraseSpeed: number
  typingDelay: number
  eraseDelay: number
  cursor?: string
  text: string | string[]
}

const Typewriter: FunctionComponent<Props> = ({
  text,
  speed = 500,
  eraseSpeed = 400,
  cursor = '|',
  typingDelay = 2500,
  eraseDelay = 5000,
  ...otherProps
}) => {
  const [currentText, setCurrentText] = useState<string>('')
  const [__timeout, set__Timeout] = useState<null | number>(null)
  const [isTyping, setIsTyping] = useState<boolean>(true)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  function getRawText(): string[] {
    return typeof text === 'string' ? [text] : [...text]
  }

  function type(): void {
    const rawText = getRawText()[currentIndex]

    if (currentText.length < rawText.length) {
      const displayText = rawText.substr(0, currentText.length + 1)
      setCurrentText(displayText)
    }
  }

  function erase(): void {
    let index = currentIndex
    if (currentText.length !== 0) {
      const displayText = currentText.substr(
        -currentText.length,
        currentText.length - 1,
      )
      setCurrentText(displayText)
    } else {
      const textArray = getRawText()
      index = index + 1 === textArray.length ? 0 : index + 1
      setCurrentIndex(index)
    }
  }

  function startTyping(): void {
    set__Timeout(
      setTimeout(() => {
        type()
      }, speed),
    )
  }

  useEffect(() => {
    startTyping()

    return () => {
      __timeout && clearTimeout(__timeout)
    }
  }, [])

  useEffect(() => {
    const rawText = getRawText()[currentIndex]
    if (isTyping) {
      if (currentText.length < rawText.length) {
        set__Timeout(setTimeout(type, speed))
      } else {
        setIsTyping(false)
        set__Timeout(setTimeout(erase, eraseDelay))
      }
    } else {
      if (currentText.length === 0) {
        const textArray = getRawText()
        const index =
          currentIndex + 1 === textArray.length ? 0 : currentIndex + 1
        if (index === currentIndex) {
          setIsTyping(true)
          setTimeout(startTyping, typingDelay)
        } else {
          setTimeout(() => setCurrentIndex(index), typingDelay)
        }
      } else {
        set__Timeout(setTimeout(erase, eraseSpeed))
      }
    }
    return () => {
      __timeout && clearTimeout(__timeout)
    }
  }, [currentText])

  useEffect(() => {
    if (!isTyping) {
      setIsTyping(true)
      startTyping()
    }
    return () => {
      __timeout && clearTimeout(__timeout)
    }
  }, [currentIndex])

  return (
    <div className="Typewriter" {...otherProps}>
      <span className="Typewriter__text">{currentText}</span>
      <span className="Typewriter__cursor">{cursor}</span>
    </div>
  )
}

export default Typewriter
