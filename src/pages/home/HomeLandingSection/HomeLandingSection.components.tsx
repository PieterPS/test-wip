import { deviceWidth } from 'lib/commonData'
import styled from 'styled-components'

import wave from '../../../assets/images/home/wave.png'

export const BackgroundContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 74px);
  margin: 0;
  padding: 0;
  background-color: #000000;
  position: relative;
  overflow: hidden;

  @media (max-width: ${deviceWidth.desktop}px) {
    height: calc(100vh - 64px);
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    height: calc(100vh - 79px);
  }
`

export const InnerContainer = styled.div`
  position: relative;
  flex: 1;
  padding: 0 5%;
  background: url(${wave}) no-repeat center;
  background-size: contain;
  height: 100%;
`

export const TopContainer = styled.div`
  position: relative;
  z-index: 1;
  color: #fff;
  display: flex;
  flex-direction: column;
  margin: 0;
  font-weight: 300;
  justify-content: center;
  height: 45%;
`

export const Heading = styled.h2`
  font-size: 44px;
  font-family: ${/* eslint-disable-line */ (props) =>
    props.theme.fontRobotoCondensed};
  font-weight: 300;
  margin: 0;
  width: 100%;
  white-space: nowrap;

  @media (max-width: ${deviceWidth.tablet}px) {
    font-size: 32px;
  }

  .sentence {
    color: #83d9f2;
    margin-bottom: 1rem;
    font-size: 63px;

    @media (max-width: ${deviceWidth.tablet}px) {
      font-size: 48px;
    }
  }
`

export const TypeWriterText = styled.span`
  display: inline;
  margin-left: 0.3rem;
  color: #83d9f2;
  font-weight: 300;
`
export const TypeWriterCursor = styled.span`
  display: inline-block;
  color: #f7f7f7;
  animation: blink 1s ease-in-out 0s infinite alternate;

  @keyframes blink {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`

export const SubHeading = styled.h3`
  position: relative;
  box-sizing: border-box;
  font-size: 22px;
  line-height: 24px;
`

export const BottomContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  color: #fff;
  margin: 0;
  font-weight: 300;
  height: 55%;
  padding-bottom: 100px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;

  @media (min-width: ${deviceWidth.tablet}px) {
    justify-content: space-between;
  }
`

export const FlexWrapper = styled.div`
  display: block;

  @media (max-width: ${deviceWidth.tablet}px) {
    margin-top: 0;
  }
`

export const AppLabel = styled.p`
  width: 100%;
  font-size: 18px;
  font-weight: 300;
  line-height: 19px;
  margin-bottom: 0.5rem;
  font-family: ${/* eslint-disable-line */ (props) =>
    props.theme.fontRobotoCondensed};
`

export const GradientButton = styled.a`
  border-radius: 8px;
  padding: 7px 70px;
  color: #fff;
  box-shadow: 0 0 6px 0 rgba(157, 96, 212, 0.5);
  border: 2px solid transparent;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0)
    ),
    linear-gradient(to right, #a930fa, #6155dd, #3b9ce5, #6fcbd3);
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: 2px 1000px 1px #000 inset;
  cursor: pointer;

  :hover {
    box-shadow: 2px 1000px 1px #142547 inset;
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    text-align: center;
    width: 350px;
    height: 42px;
    padding: 7px;
    margin: 0 auto;
  }
`

export const GradientAppButton = styled(GradientButton)`
  width: 143px;
  height: 42px;
  // margin: 0 12px 0 0;

  @media (max-width: ${deviceWidth.desktop}px) {
    padding: 7px 15px;
    margin: 0 10px 0 0;
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    text-align: center;
    width: 48%;
  }
`

export const AppImg = styled.img`
  width: 115px;
  height: 100%;
`

export const NextSectionButton = styled.a`
  left: 0;
  right: 0;
  bottom: 20px;
  z-index: 2;
  width: 37px;
  height: 24px;
  margin: 0 auto;
  position: absolute;
  animation float 2s infinite;
  animation-timing-function: cubic-bezier(0.65, 0.05, 0.36, 1);
	
	@keyframes float {
		0% { 
      bottom: 20px
    }

		50% { 
      bottom: 35px 
    }

		100% { 
      bottom: 20px
    }
	}
`
