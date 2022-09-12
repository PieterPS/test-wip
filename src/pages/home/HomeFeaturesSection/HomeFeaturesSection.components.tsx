import styled from 'styled-components'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { deviceWidth } from 'lib/commonData'

export const RadialBackgroundContainer = styled.div`
  background-color: rgba(0, 0, 0, 1);
  background: radial-gradient(
    100% 100% at 50% 100%,
    rgba(111, 203, 211) 0%,
    rgba(59, 156, 229) 17.71%,
    rgba(97, 85, 221) 35.42%,
    rgb(0, 0, 0) 83.85%
  );
  width: 100vw;
  left: 0;
  right: 0;
  position: relative;

  :before {
    content: '';
    width: 100vw;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
  }
`

export const RowContainer = styled(Row)`
  color: #fff;
  padding-bottom: 40px;

  @media (max-width: ${deviceWidth.tablet}px) {
    padding: 5% 30px;
  }
`

export const SectionHeading = styled.h2`
  font-size: 47px;
  font-family: ${/* eslint-disable-line */ (props) =>
    props.theme.fontRobotoCondensed};
  margin: 70px 15px 10px;
  width: 100%;
  color: #fff;
  line-height: 45px;
  z-index: 1;

  @media (max-width: ${deviceWidth.mobile}px) {
    font-size: 40px;
  }
`

export const FeaturesLeft = styled(Col)`
  @media (max-width: ${deviceWidth.desktop}px) {
    // mobile view
  }
`

export const TabsContainer = styled.ul`
  list-style: none;
  padding-left: 0;
`

export const Tab = styled.div`
  padding: 20px 35px;
  margin: 15px 0;
  cursor: pointer;
  border-radius: 8px;
  border: 2px solid transparent;

  &.active {
    border: 2px solid #a931fa;
    background: #142547;
    position: relative;
  }

  :hover {
    border: 2px solid #a931fa;
  }

  @media (max-width: ${deviceWidth.desktopExtra}px) {
    padding: 19px 33px;
    margin: 14px 0;
  }

  @media (max-width: ${deviceWidth.desktopLarge}px) {
    padding: 16px 28px;
    margin: 12px 0;
  }

  @media (max-width: ${deviceWidth.desktop}px) {
    margin: 10px 55px;
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    margin: 10px 35px;
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    margin: 10px 25px;
  }
`

export const TabTitle = styled.h4`
  font-size: 22px;
  font-weight: 400;
  margin-bottom: 5px;

  @media (max-width: ${deviceWidth.desktopExtra}px) {
    font-size: 21px;
  }

  @media (max-width: ${deviceWidth.desktopLarge}px) {
    font-size: 19px;
  }
`

export const TabDescription = styled.p`
  font-size: 18px;
  font-weight: 300;
  margin: 0;

  @media (max-width: ${deviceWidth.desktopExtra}px) {
    font-size: 17px;
  }

  @media (max-width: ${deviceWidth.desktopLarge}px) {
    font-size: 16px;
  }
`

export const FeaturesRight = styled(Col)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .slide-enter {
    transform: translateX(100%);
  }
  .slide-enter-active {
    transform: translateX(0%);
    transition: transform 500ms ease-in-out;
  }
  .slide-exit {
    transform: translate(0%, -100%);
  }
  .slide-exit-active {
    transform: translate(-100%, -100%);
    transition: transform 500ms ease-in-out;
  }

  /*  not sure how to style this so that i can transition divs nicely*/
  .slide-group {
    /* display: flex;
    flex-wrap: nowrap; */
  }
`

interface TabCardProps {
  colors: string[]
}

export const TabCard = styled.div<TabCardProps>`
  display: flex;
  width: 230px;
  height: 230px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  text-align: center;
  margin: 0 8px 16px;
  border-radius: 8px;
  font-weight: 400;
  transition: all 500s ease-in-out;
  background: ${/* eslint-disable-line */ (props) =>
    props.colors[0] || '#5075E1'};
  background-image: linear-gradient(
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0)
    ),
    linear-gradient(
      to right,
      ${/* eslint-disable-line */ (props) => props.colors.join(', ')}
    );

  &.animate {
    transform: rotateY(90deg);
  }

  @media (max-width: ${deviceWidth.desktopExtra}px) {
    width: 220px;
    height: 220px;
  }

  @media (max-width: ${deviceWidth.desktopLarge}px) {
    width: 190px;
    height: 190px;
    margin: 0 7px 14px;
  }

  @media (max-width: ${deviceWidth.mobile}px) {
    width: 90%;
    padding: 10px;
  }
`

export const CardIcon = styled.img`
  color: #fff;
  height: 80px;
  width: 80px;
  padding-bottom: 15px;

  @media (max-width: ${deviceWidth.desktopExtra}px) {
    height: 78px;
    width: 78px;
  }

  @media (max-width: ${deviceWidth.desktopLarge}px) {
    height: 75px;
    width: 75px;
  }
`

export const CardText = styled.p`
  font-size: 18px;

  @media (max-width: ${deviceWidth.desktopExtra}px) {
    font-size: 17px;
  }

  @media (max-width: ${deviceWidth.desktopLarge}px) {
    font-size: 16px;
  }
`
