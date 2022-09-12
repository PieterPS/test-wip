import React, { FunctionComponent, useEffect, useState } from 'react'

import doubleArrow from '../../../assets/images/home/doublearrow.svg'
import googlePlay from '../../../assets/images/home/GooglePlay.svg'
import appleStore from '../../../assets/images/home/AppStore.svg'

import {
  BackgroundContainer,
  InnerContainer,
  AppImg,
  TopContainer,
  Heading,
  TypeWriterText,
  FlexWrapper,
  SubHeading,
  BottomContainer,
  GradientButton,
  GradientAppButton,
  NextSectionButton,
  AppLabel,
  TypeWriterCursor,
} from './HomeLandingSection.components'

interface TypeWriterProps {
  text: string | string[]
  typingSpeed: number
  typingDelay: number
  eraseSpeed: number
  eraseDelay: number
  showCursor?: boolean
}

const TypeWriter: FunctionComponent<TypeWriterProps> = ({
  text,
  typingSpeed,
  eraseSpeed,
  typingDelay,
  eraseDelay,
  showCursor = false,
}) => {
  const [currentText, setCurrentText] = useState('')
  const [timeoutId, setTimeoutId] = useState(null)
  const [isTyping, setIsTyping] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  const getRawText = (): string[] => {
    return typeof text === 'string' ? [text] : [...text]
  }

  const type = (): void => {
    const rawText = getRawText()[currentIndex]

    if (currentText.length < rawText.length) {
      const displayText = rawText.substring(0, currentText.length + 1)

      setCurrentText(displayText)
    }
  }

  const startTyping = (): void => {
    setTimeoutId(setTimeout(type, typingSpeed))
  }

  const erase = (): void => {
    if (currentText.length !== 0) {
      const displayText = currentText.substring(
        -currentText.length,
        currentText.length - 1,
      )

      setCurrentText(displayText)
    } else {
      const textArray = getRawText()
      const index = currentIndex + 1 === textArray.length ? 0 : currentIndex + 1

      setCurrentIndex(index)
    }
  }

  useEffect(() => {
    startTyping()

    return (): void => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    const rawText = getRawText()[currentIndex]

    if (isTyping) {
      if (currentText.length < rawText.length) {
        setTimeoutId(setTimeout(type, typingSpeed))
      } else {
        setIsTyping(false)
        setTimeoutId(setTimeout(erase, eraseDelay))
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
        setTimeoutId(setTimeout(erase, eraseSpeed))
      }
    }

    return (): void => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [currentText])

  useEffect(() => {
    if (!isTyping) {
      setIsTyping(true)
      startTyping()
    }

    return (): void => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [currentIndex])

  return (
    <>
      <TypeWriterText>{currentText}</TypeWriterText>
      {showCursor && <TypeWriterCursor>|</TypeWriterCursor>}
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const HomeLandingSection: FunctionComponent<Props> = () => {
  return (
    <BackgroundContainer>
      <InnerContainer>
        <TopContainer>
          <Heading>
            Impact{' '}
            <TypeWriter
              text={[
                'Exchange',
                'Project',
                'Token',
                'DAO',
                'Investment',
                'Oracle',
              ]}
              typingSpeed={110}
              eraseSpeed={90}
              typingDelay={100}
              eraseDelay={2000}
              showCursor
            />
            <div className="sentence">LAUNCHPAD</div>
          </Heading>
          <SubHeading>Bring Web3 to Life</SubHeading>
        </TopContainer>
        <BottomContainer className="row">
          <GradientButton>PREPARE TO LAUNCH</GradientButton>
          <div>
            <AppLabel>
              Get your <strong>Earth X</strong> Mobile Wallet
            </AppLabel>
            <FlexWrapper>
              <GradientAppButton
                href="https://play.google.com/store/apps/details?id=com.ixo&hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AppImg src={googlePlay} alt="Get it on Google Play" />
              </GradientAppButton>
              <GradientAppButton
                href="https://itunes.apple.com/za/app/ixo/id1441394401?mt=8"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AppImg src={appleStore} alt="Download on the App Store" />
              </GradientAppButton>
            </FlexWrapper>
          </div>
        </BottomContainer>
        <NextSectionButton href="#launch-a-marketplace">
          <img src={doubleArrow} />
        </NextSectionButton>
      </InnerContainer>
    </BackgroundContainer>
  )
}

export default HomeLandingSection

// TODO: update fonts to Roboto and check font-sizes
// TODO: responsive mobile styling
