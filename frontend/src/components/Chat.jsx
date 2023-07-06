import { ChatMessage } from "./ChatMessage"
import { useChat } from "../hooks/useChat"

export const Chat = () => {
  const {
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
  } = useChat()

  return (
    <>
      <h1 className="center">ChatBot - Municipalidad Provincial de Piura</h1>
      <div className="chat-container" id="chatContainer" ref={chatContainerRef}>
        <ChatMessage
          message="¡Hola! Soy el chatbot de la Municipalidad Provincial de Piura, y estoy aquí para brindarte información sobre los servicios que ofrece la municipalidad de acuerdo al TUPA (Texto Único de Procedimientos Administrativos). ¿En qué puedo ayudarte hoy?"
          isBot={true}
        />

        {messages.map(({ message, isBot, isSpinner }, index) => (
          <ChatMessage key={index} message={message} isBot={isBot} isSpinner={isSpinner} />
        ))}
      </div>
      <div className="input-container">
        <form onSubmit={onSubmitForm}>
          <input
            type="text"
            id="userInput"
            placeholder="Ingrese su consulta..."
            onChange={onChangeInput}
            value={inputValue}
            disabled={isLoading}
            ref={userInputRef}
            onKeyDown={onKeyDownInput}
          />
          <button type="submit" disabled={isLoading}>
            Send
          </button>
        </form>
      </div>
    </>
  )
}