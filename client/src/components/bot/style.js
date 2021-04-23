import styled from 'styled-components'
import ImageBot from '../../images/bot.png'

export const Balloon = styled.div`
  background: #fffcf1;
  border: 1px solid #e8c33b;
  border-radius: 10px;
  border-top-left-radius: 0;
  margin: 36px 0 0;
  padding: 8px;
`

export const Image = styled.img.attrs(() => ({
  src: ImageBot
}))`
    height: 40px;
    width: auto;
`

export const Content = styled.div`
  display: flex;
  flex-flow: row nowrap;
`
export const Icon = styled.div`
  height: 44px;
  margin: 0 8px 0 0;
  width: 44px;
`

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 16px;
`
