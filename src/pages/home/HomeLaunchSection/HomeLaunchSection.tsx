import React, { FunctionComponent } from 'react'
import MediaQuery from 'react-responsive'
import Lottie from 'react-lottie'

import {
  RowContainer,
  Paragraph,
  SectionHeading,
  SectionSubheading,
  ColumnContainer,
  AnimationContainer,
  AnimationBackgroundImage,
  GreyBackgroundContainer,
  NoPaddingColumnContainer,
} from './HomeLaunchSection.components'
import { deviceWidth } from 'lib/commonData'
import HomeCards from '../HomeCards/HomeCards'
import { ContentContainer } from '../Home.components'
import collectionAnimation from './launch-a-collection.json'
import marketplaceAnimation from './launch-a-markteplace.json'
import campaignPlaceholder from '../../../assets/images/home/campaign-placeholder.svg'
import marketplaceBackground from '../../../assets/images/home/collect-background-test.png'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export const HomeLaunchSection: FunctionComponent<Props> = () => {
  return (
    <div id="launch-a-marketplace">
      <ContentContainer>
        <RowContainer minheight={650} reverseorderonmobile>
          <ColumnContainer md={6}>
            <div>
              <SectionHeading>Launch a Marketplace</SectionHeading>
              <SectionSubheading>Grow you Impact ecosystem</SectionSubheading>
              <Paragraph>
                Host the Earth Portal web application platform and mobile wallet
                customised for your sector and target market.
                <br />
                <br />
                Impact Creators in your ecosystem will gain powerful new
                capabilities to scale their coordination, financing, delivery,
                and verification of Outcomes.
                <br />
                <br />
                <em>The Launchpad is an example of what you can build!</em>
              </Paragraph>
            </div>
          </ColumnContainer>
          <ColumnContainer md={6}>
            <AnimationContainer size={570}>
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: marketplaceAnimation,
                }}
                height="100%"
                width="100%"
              />
              <AnimationBackgroundImage src={marketplaceBackground} />
            </AnimationContainer>
          </ColumnContainer>
        </RowContainer>
      </ContentContainer>

      <GreyBackgroundContainer>
        <ContentContainer>
          <RowContainer minheight={562}>
            <ColumnContainer md={6}>
              <AnimationContainer size={301}>
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: collectionAnimation,
                  }}
                  height="100%"
                  width="100%"
                />
              </AnimationContainer>
            </ColumnContainer>
            <ColumnContainer md={6}>
              <div>
                <SectionHeading>Launch a Collection</SectionHeading>
                <SectionSubheading>
                  Tokenise your Impact Assets
                </SectionSubheading>
                <Paragraph>
                  Impact Tokens are dynamic NFTs that digitise real-world Impact
                  Assets.
                  <br />
                  <br />
                  Impact Assets include both the means of producing Outcomes
                  (such as trees planted), as well as the certified Outcomes
                  that are produced (such as Carbon sequestered).
                  <br />
                  <br />
                  Impact Tokens can be sold directly, or traded through
                  cross-chain decentralised Impact Exchanges.
                  <br />
                  <br />
                  <em>
                    The Launchpad offers a platform for minting and trading
                    first-edition Impact Token collections.
                  </em>
                </Paragraph>
              </div>
            </ColumnContainer>
          </RowContainer>
        </ContentContainer>
      </GreyBackgroundContainer>

      <ContentContainer>
        <RowContainer minheight={650} reverseorderonmobile>
          <ColumnContainer md={6}>
            <div>
              <SectionHeading>Launch a Campaign</SectionHeading>
              <SectionSubheading>Get your Project funded</SectionSubheading>
              <Paragraph>
                Raise capital to build your marketplace and fund the growth of
                your ecosystem.
                <br />
                <br />
                Invest in the development of innovative products and services,
                such Impact Oracles, that serve the broader ecosystem.
                <br />
                <br />
                <em>
                  The Launchpad aims to connect Founders with investors,
                  developers, marketing agents, legal and regulatory compliance
                  services.
                </em>
              </Paragraph>
            </div>
          </ColumnContainer>
          <NoPaddingColumnContainer md={6}>
            <MediaQuery maxWidth={`${deviceWidth.desktop}px`}>
              <img
                src={campaignPlaceholder}
                alt="Launch a campaign placeholder"
              />
            </MediaQuery>
            <MediaQuery minWidth={`${deviceWidth.desktop}px`}>
              <HomeCards />
            </MediaQuery>
          </NoPaddingColumnContainer>
        </RowContainer>
      </ContentContainer>
    </div>
  )
}

export default HomeLaunchSection
