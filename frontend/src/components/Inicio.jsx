import { useState } from "react"
import { Mensaje } from "./Mensage"
import { Chat } from "./Chat"

export const Inicio = () => {
    const [irAChat, setIrAChat] = useState(false)

    if (irAChat) {
        return (
            <Chat />
        )
    }

    return (
        <Mensaje setIrAChat={setIrAChat} />
    )
}