import React, { FunctionComponent } from 'react'
import { ContentContainer } from '../Home.components'

import {
  SectionHeading,
  CollectionContainer,
  CardsContainer,
  Card,
  CardImage,
} from './HomePartnersSection.components'
import partners from 'assets/partners/partners.json'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const renderSponsors: Function = () => {
  if (!partners.length) return null

  return partners.map((sponsor) => {
    return (
      <Card
        key={sponsor.title}
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        backgroundColor={sponsor.color}
      >
        <CardImage
          src={require(`assets/partners/${sponsor.image}`)}
          alt={sponsor.title}
        />
      </Card>
    )
  })
}

const HomePartnersSection: FunctionComponent<Props> = () => {
  return (
    <ContentContainer>
      <CollectionContainer>
        <SectionHeading>Launchpad Sponsors and Partners</SectionHeading>
        <CardsContainer>{renderSponsors()}</CardsContainer>
      </CollectionContainer>
    </ContentContainer>
  )
}

export default HomePartnersSection
