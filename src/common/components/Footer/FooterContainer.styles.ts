import { deviceWidth } from 'lib/commonData'
import styled from 'styled-components'

export const BottomBar = styled.footer`
  && {
    padding: 20px 90px 20px 50px;
    overflow: hidden;
    z-index: 3;
    background: black;

    @media (max-width: ${deviceWidth.mobile}px) {
      padding: 20px 50px;
    }
  }
`
