'use strict'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Sleep, Watson } from '../../helpers'
import { setChatLoaderActive, setMessages, setOptions } from '../../store/ducks/chatbot'
import { setUserId } from '../../store/ducks/user'

import Body from '../body'
import Footer from '../footer'
import Header from '../header'

import { Container } from './style'

const Chat = () => {
  const dispatch = useDispatch()
  const { chatbot, user, watson } = useSelector(state => state)

  const firstInteraction = async () => {
    const { output, user_id: userId } = await Watson.sendMessage('oi', watson.session.id)
    dispatch(setUserId(userId))
    for (let counter = 0; counter < output.generic.length; counter++) {
      output.generic[counter].sender = 'bot'
      if (output.generic[counter].response_type === 'option') return (dispatch(setOptions(output.generic[counter].options)) && dispatch(setChatLoaderActive(false)))
      await Sleep(chatbot.loader.timer)
      dispatch(setMessages('bot', output.generic[counter]))
    }
    dispatch(setChatLoaderActive(false))
  }

  const watsonInteraction = async () => {
    if (!chatbot.messages.length) return false
    const lastInteraction = chatbot.messages[chatbot.messages.length - 1]

    if (lastInteraction.sender === 'bot') return false

    const { output } = await Watson.sendMessage(lastInteraction.content, watson.session.id)

    for (let counter = 0; counter < output.generic.length; counter++) {
      output.generic[counter].sender = 'bot'
      if (output.generic[counter].response_type === 'option') return (dispatch(setOptions(output.generic[counter].options)) && dispatch(setChatLoaderActive(false)))
      await Sleep(chatbot.loader.timer)
      dispatch(setMessages('bot', output.generic[counter]))
    }
    dispatch(setChatLoaderActive(false))
  }

  const startFlow = async () => {
    if (!user.interactions.length) return false
    if (!chatbot.active || !watson.session.id) return false
    if (user.interactions.length === 1) firstInteraction()
  }

  useEffect(() => {
    startFlow()
  }, [watson.session])

  useEffect(() => {
    watsonInteraction()
  }, [chatbot.messages])

  return (
    <Container {...chatbot}>
      <Header />
      <Body />
      <Footer />
    </Container>
  )
}

export default Chat
