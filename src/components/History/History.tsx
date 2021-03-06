import './History.scss';

interface HistoryProps {
    // list of last emojis copied 
    history: { emojis: string[] },
    // onClick handler
    copyEmoji: Function
}
export function History({ history, copyEmoji }: HistoryProps) {
    return (
        <div className="emojis-list--emojis-history">
            {
                history.emojis?.map((emoji, key) => (
                    <div className={'emojis-list__item'} key={key} onClick={() => copyEmoji(emoji)}>
                        {emoji}
                    </div>
                ))
            }
        </div>
    )
}

