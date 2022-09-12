import React, { FunctionComponent } from 'react'
import MediaQuery from 'react-responsive'

import { deviceWidth } from '../../../lib/commonData'
import { SDG_ICONS } from './HomeCards.data'
import {
  CardsContainer,
  Card,
  CardIcon,
  CardToolTip,
} from './HomeCards.components'

const renderIcons = SDG_ICONS.map((icon) => {
  return (
    <Card
      key={icon.class}
      iconColor={icon.bgColor}
      href={icon.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="content">
        <CardIcon className={'icon-sdg-' + icon.class} />
        {/* Not present in designs - uncomment if needed */}
        {/* <p className="hover-text">{icon.title}</p> */}
        {icon.tooltip && (
          <MediaQuery minWidth={`${deviceWidth.tablet}px`}>
            <CardToolTip className="sdg-tooltip">{icon.tooltip}</CardToolTip>
          </MediaQuery>
        )}
      </div>
    </Card>
  )
})

export const HomeCards: FunctionComponent = (props) => {
  return <CardsContainer>{renderIcons}</CardsContainer>
}

export default HomeCards
