import React, { FunctionComponent } from 'react'

import HomeLandingSection from './HomeLandingSection/HomeLandingSection'
// import HomeLaunchSection from './HomeLaunchSection/HomeLaunchSection'
// import HomeFeaturesSection from './HomeFeaturesSection/HomeFeaturesSection'
// import HomePartnersSection from './HomePartnersSection/HomePartnersSection'
import { Container } from './Home.components'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export const Home: FunctionComponent<Props> = () => {
  return (
    <Container>
      <HomeLandingSection />
      {/* <HomeLaunchSection />
      <HomeFeaturesSection />
      <HomePartnersSection /> */}
    </Container>
  )
}

export default Home
