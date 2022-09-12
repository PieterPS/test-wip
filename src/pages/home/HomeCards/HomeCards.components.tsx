import styled from 'styled-components'

import { deviceWidth } from '../../../lib/commonData'

export const CardsContainer = styled.div`
  :after {
    content: '';
    display: block;
  }

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  padding: 20px;

  @media (min-width: ${deviceWidth.desktop}px) {
    top: -50px;
    padding: 0;
    width: 112%;
  }
`

interface IconProps {
  iconColor: string
}

export const Card = styled.a<IconProps>`
  border-radius: 8px;
  border: 2px solid ${/* eslint-disable-line */ (props) => props.iconColor};
  background: #dcdcdc;
  width: 96px;
  height: 122px;
  margin: 0 0 8px 0;
  cursor: pointer;
  text-decoration: none;
  display: block;
  transition: all 0.5s ease;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding: 5px;
    justify-content: space-around;
    transition: all 0.5s ease;
  }

  :hover {
    text-decoration: none;

    .content {
      background: ${/* eslint-disable-line */ (props) => props.iconColor};
    }
  }

  @media (max-width: ${deviceWidth.desktopExtra}px) {
    width: 86px;
    height: 110px;
  }

  @media (max-width: ${deviceWidth.desktopLarge}px) {
    width: 71px;
    height: 95px;
  }

  @media (min-width: ${deviceWidth.tablet}px) {
    :hover {
      .sdg-tooltip {
        visibility: visible;
        opacity: 1;
      }
    }
  }
`

export const CardIcon = styled.i`
  margin-top: 30px;
  font-size: 55px;

  :before {
    color: white;
  }

  @media (max-width: ${deviceWidth.desktopExtra}px) {
    font-size: 50px;
  }

  @media (max-width: ${deviceWidth.desktopLarge}px) {
    font-size: 45px;
  }

  @media (max-width: ${deviceWidth.mobile}px) {
    margin-top: -25px;

    :before {
      font-size: 30px;
    }
  }
`

export const CardToolTip = styled.div`
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.6s linear;
  width: 340px;
  background-color: #001a27;
  font-size: 11px;
  color: white;
  text-align: center;
  padding: 5px 10px;
  bottom: 125%;
  border-radius: 10px; /* This defines tooltip text position */
  position: relative;
  z-index: 1;

  ::after {
    content: '';
    position: absolute;
    left: 48%;
    top: 100%;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid #001a27;
    clear: both;
  }
`
