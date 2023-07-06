export const ChatMessageSpinner = ({ isBot }) => {

    return (
        <div className={`${isBot ? 'bot-message' : 'user-message'}`}>
            <p><i className={`${isBot ? 'fas fa-robot' : 'fas fa-user'}`}></i><span>&nbsp;&nbsp;</span>
                <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>
            </p>
        </div>
    );
}
