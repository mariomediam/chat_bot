import { useState, useEffect, useRef, useCallback } from "react"
import { crearChatSession, preguntarAlChatbot, obtenerChatMessages } from "../services/chatService"

export const useChat = () => {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [chatSessionId, setChatSessionId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const chatContainerRef = useRef(null)
  const userInputRef = useRef(null)

  const iniciarChat = useCallback(async () => {
    const chatSessionIdNew = await crearChatSession()
    setChatSessionId(chatSessionIdNew)
  }, [])

  useEffect(() => {
    iniciarChat()
    userInputRef.current.focus()
  }, [iniciarChat])

  const onChangeInput = useCallback((event) => {
    setInputValue(event.target.value)
  }, [])

  const onSubmitForm = useCallback((event) => {
    event.preventDefault()
    // setMessages((prevMessages) => [...prevMessages, inputValue])
    // setInputValue('')
    enviarPregunta()
  }, [inputValue])

  const mostrarUltimoMensaje = useCallback(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
  }, [])

  const enviarPregunta = useCallback(async () => {
    if (inputValue.trim() === '') {
      return
    }

    setIsLoading(true)
    const pregunta = inputValue.trim()
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: pregunta, isBot: false, isSpinner: false },
      { message: '', isBot: true, isSpinner: true },
    ])

    setTimeout(() => {
      mostrarUltimoMensaje()
      setInputValue('')
    }, 1000)

    const respuesta = await preguntarAlChatbot(chatSessionId, pregunta)
    actualizarMensajes()
    setIsLoading(false)
  }, [chatSessionId, inputValue, mostrarUltimoMensaje])

  const actualizarMensajes = useCallback(async () => {
    const mensajesDB = await obtenerChatMessages(chatSessionId)
    const mensajesFormat = []
    mensajesDB.forEach(({ chatSessionMessageQuery, chatSessionMessageResult }) => {
      mensajesFormat.push({ message: chatSessionMessageQuery, isBot: false, isSpinner: false })
      mensajesFormat.push({ message: chatSessionMessageResult, isBot: true, isSpinner: false })
    })
    setMessages(mensajesFormat)
    mostrarUltimoMensaje()
    userInputRef.current.focus()
  }, [chatSessionId, mostrarUltimoMensaje])

  const onKeyDownInput = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        enviarPregunta()
      }
    },
    [enviarPregunta]
  )

  return {
    messages,
    inputValue,
    chatSessionId,
    isLoading,
    chatContainerRef,
    userInputRef,
    onChangeInput,
    onSubmitForm,
    enviarPregunta,
    onKeyDownInput,
  }
}