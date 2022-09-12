import React, { FunctionComponent, useState } from 'react'
import MediaQuery from 'react-responsive'
import Carousel from 'react-bootstrap/Carousel'
import Col from 'react-bootstrap/Col'

import { deviceWidth } from '../../../lib/commonData'
import { TAB_CONTENT } from './HomeFeaturesSection.data'
import chevronLeft from '../../../assets/images/home/chevron-left.svg'
import chevronRight from '../../../assets/images/home/chevron-right.svg'

import {
  RadialBackgroundContainer,
  RowContainer,
  FeaturesLeft,
  FeaturesRight,
  TabCard,
  SectionHeading,
  TabsContainer,
  Tab,
  TabTitle,
  TabDescription,
  CardIcon,
  CardText,
} from './HomeFeaturesSection.components'
import { ContentContainer } from '../Home.components'

// export interface ParentProps {}

export interface Card {
  icon: string
  text: string
  colors: string[]
}

export interface Header {
  title: string
  desc: string
}

const HomeFeatures: FunctionComponent = (props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const handleTabChange: Function = (tabIndex: number) => {
    return (): void => setActiveTabIndex(tabIndex)
  }

  const handleMobileTabChange: (
    eventKey: number,
    direction: 'left' | 'right',
  ) => void = (eventKey) => {
    setActiveTabIndex(eventKey)
  }

  const renderMobileTabHeader: Function = () => {
    return (
      <Carousel
        indicators={false}
        keyboard
        interval={null}
        onSlid={handleMobileTabChange}
      >
        {TAB_CONTENT.map((header, index) => {
          return (
            <Carousel.Item key={index}>
              <Tab key={index} className={activeTabIndex === index && 'active'}>
                <TabTitle>{header.title}</TabTitle>
                <TabDescription>{header.desc}</TabDescription>
              </Tab>
            </Carousel.Item>
          )
        })}
      </Carousel>
    )
  }

  const renderTabHeader: Function = () => {
    return TAB_CONTENT.map((header, index) => {
      return (
        <Tab
          key={index}
          className={activeTabIndex === index && 'active'}
          onClick={handleTabChange(index)}
        >
          <TabTitle>{header.title}</TabTitle>
          <TabDescription>{header.desc}</TabDescription>
        </Tab>
      )
    })
  }

  const renderCards: Function = () => {
    const cards: Card[] = TAB_CONTENT[activeTabIndex].cards

    return cards.map(function (card: Card, index: number) {
      return (
        <TabCard key={index} className="fadeIn" colors={card.colors}>
          <CardIcon src={card.icon} />
          <CardText>{card.text}</CardText>
        </TabCard>
      )
    })
  }

  return (
    <RadialBackgroundContainer>
      <ContentContainer>
        <RowContainer>
          <SectionHeading>Features</SectionHeading>
        </RowContainer>
        <RowContainer>
          <FeaturesLeft lg={6}>
            <MediaQuery minWidth={`${deviceWidth.desktop + 1}px`}>
              {renderTabHeader()}
            </MediaQuery>
            <MediaQuery maxWidth={`${deviceWidth.desktop}px`}>
              {renderMobileTabHeader()}
              <br />
            </MediaQuery>
          </FeaturesLeft>
          <Col lg={6}>
            <FeaturesRight>{renderCards()}</FeaturesRight>
          </Col>
        </RowContainer>
      </ContentContainer>
    </RadialBackgroundContainer>
  )
}

export default HomeFeatures
