import { ChatMessageSpinner } from "./ChatMessageSpinner";

export const ChatMessage = ({ message, isBot, isSpinner }) => {

    if (isSpinner) {
        return (
            <ChatMessageSpinner isBot={isBot} />
        )
    }

    const lines = message.split('\n');

    return (
        <div className={`${isBot ? 'bot-message' : 'user-message'}`}>
            <p><i className={`${isBot ? 'fas fa-robot' : 'fas fa-user'}`}></i><span>&nbsp;&nbsp;</span>
                {lines.map((line, index) => (
                    <span key={index}>{line}<br /></span>
                ))}
            </p>
        </div>
    );
}
