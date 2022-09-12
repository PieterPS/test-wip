import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { deviceWidth } from 'lib/commonData'

import marketplacePlaceholder from '../../assets/images/home/marketplace-placeholder.svg'

const CountsContainer = styled.div`
  padding: 40px 60px 0;
  background-size: cover;
  background-position: center;
  color: white;

  @media (min-width: ${deviceWidth.tablet}px) {
    margin: 0 0 84px;
  }

  @media (max-width: ${deviceWidth.mobile}px) {
    padding: 0 20px 40px;
  }
`
const SideContainer = styled.div`
  color: #282828;
`
const SectionHeading = styled.h2`
  font-size: 47px;
  font-family: ${/* eslint-disable-line */ (props) =>
    props.theme.fontRobotoCondensed};
  margin-bottom: 0;
  width: 100%;
  color: #282828;
  line-height: 45px;

  @media (max-width: ${deviceWidth.mobile}px) {
    font-size: 50px;
  }
`
const SectionSubheading = styled.h5`
  font-size: 22px;
  font-weight: normal;
  padding-top: 15px;
  padding-bottom: 30px;

  @media (max-width: 1024px) {
    padding-top: 15px;
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    padding-top: 15px;
  }
`
const Paragraph = styled.p`
  margin-bottom: 25px;
  position: relative;
  box-sizing: border-box;
  font-weight: 300;

  @media (max-width: ${deviceWidth.tablet}px) {
    padding-right: 0;
    margin-top: 20px;
  }
`
const HeaderLink = styled.a`
  border-radius: 8px;
  padding: 7px 60px;
  color: #282828;
  font-weight: 400;
  text-transform: uppercase;
  box-shadow: 0 0 6px 0 rgba(157, 96, 212, 0.5);
  border: 2px solid transparent;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0)
    ),
    linear-gradient(to right, #a930fa, #6155dd, #3b9ce5, #6fcbd3);
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: 2px 1000px 1px #fff inset;
  font-size: 15px;
  margin: 0 0 20px 0;
  cursor: pointer;
  font-family: ${/* eslint-disable-line */ (props) =>
    props.theme.fontRobotoCondensed};

  :hover {
    text-decoration: none;
  }
`

interface Props {}

export const HomeLaunchMarketplaceSection: FunctionComponent<Props> = () => {
  return (
      <div id="launch-a-marketplace" className="container">
        <CountsContainer className="row">
          <SideContainer className="col-md-6 col-sm-12">
              <SectionHeading>Launch a Marketplace</SectionHeading>
              <SectionSubheading>Host your own Earth Portal Ecosystem Platform</SectionSubheading>
              <Paragraph>
                Connect Impact Creators in your ecosystem to coordinate,
                finance, deliver, and verify
                <br />
                <ul>
                  <li>Manage Impact Agents</li>
                  <li>Form Impact DAOs</li>
                  <li>Implement Impact Projects</li>
                  <li>Issue outcomes-based Impact Investments</li>
                  <li>Mint and trade Impact Assets</li>
                  <li>Deliver or employ Impact Oracles</li>
                  <li>Create and Implement Impact Protocols</li>
                </ul>
                <br />
                <em>This Launchpad is an example of what you can build!</em>
              </Paragraph>
              <HeaderLink
                target="_blank"
                href="https://ixo.foundation/count_what_matters"
              >
                LEARN MORE
              </HeaderLink>
          </SideContainer>
          <SideContainer className="col-md-6 col-sm-12">
              <img src={marketplacePlaceholder} alt="" />
          </SideContainer>
        </CountsContainer>
      </div>
  )
}

export default HomeLaunchMarketplaceSection
