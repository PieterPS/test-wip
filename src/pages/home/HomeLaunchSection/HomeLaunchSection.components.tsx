import styled from 'styled-components'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { deviceWidth } from 'lib/commonData'

export const GreyBackgroundContainer = styled.div`
  width: 100vw;
  background-color: #f6f6f6;
`

interface RowContainerProps {
  minheight?: number
  reverseorderonmobile?: boolean
}

export const RowContainer = styled(Row)<RowContainerProps>`
  padding: 0;
  background-size: cover;
  background-position: center;
  color: #282828;
  max-width: 1250px;

  @media (min-width: ${deviceWidth.desktop}px) {
    min-height: ${/* eslint-disable-line */ (props) => props.minheight || 0}px;
  }

  @media (min-width: ${deviceWidth.tablet}px) {
    margin: 0 0 84px;
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    padding: 20px 0 40px;
    ${/* eslint-disable-line */ (props) =>
      !props.reverseorderonmobile ? '' : `flex-direction: column-reverse;`}
  }
`

export const ColumnContainer = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const NoPaddingColumnContainer = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`

export const SectionHeading = styled.h2`
  font-size: 47px;
  font-family: ${/* eslint-disable-line */ (props) =>
    props.theme.fontRobotoCondensed};
  margin-bottom: 0;
  width: 100%;
  color: #282828;
  line-height: 45px;

  @media (max-width: ${deviceWidth.desktop}px) {
    font-size: 42px;
  }
  @media (max-width: ${deviceWidth.tablet}px) {
    font-size: 40px;
  }
`

export const SectionSubheading = styled.h5`
  font-size: 22px;
  font-weight: normal;
  padding-top: 15px;
  color: #83d9f2;
  padding-bottom: 30px;

  @media (max-width: 1024px) {
    padding-top: 15px;
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    padding-top: 15px;
    font-size: 20px;
  }
`

export const Paragraph = styled.p`
  margin-bottom: 25px;
  position: relative;
  box-sizing: border-box;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;

  @media (max-width: ${deviceWidth.tablet}px) {
    padding-right: 0;
    margin-top: 20px;
    font-size: 16px;
  }
`

interface AnimationContainerProps {
  size: number
}

export const AnimationContainer = styled.div<AnimationContainerProps>`
  position: relative;
  margin: 10px 0 20px;

  @media (min-width: ${deviceWidth.tablet}px) {
    height: ${/* eslint-disable-line */ (props) => props.size}px;
    width: ${/* eslint-disable-line */ (props) => props.size}px;
    margin: 0;
  }
`

export const AnimationBackgroundImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  border-radius: 50%;
  object-fit: cover;
  z-index: -1;
  height: 360px;
  width: 360px;

  @media (max-width: ${deviceWidth.desktopExtra}px) {
    height: 330px;
    width: 330px;
  }
  @media (max-width: ${deviceWidth.desktopLarge}px) {
    height: 270px;
    width: 270px;
  }
  @media (max-width: ${deviceWidth.desktop}px) {
    height: 200px;
    width: 200px;
  }
  @media (max-width: ${deviceWidth.tablet}px) {
    height: 320px;
    width: 320px;
  }
  @media (max-width: ${deviceWidth.mobile}px) {
    height: 55vw;
    width: 55vw;
  }
`
