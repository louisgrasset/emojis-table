import {useCallback, useEffect, useMemo, useState} from 'react';
import {History} from './components/history'
import emojidb from './data/emojidb.json';
import {Emoji} from "./types/Emoji";
import './styles/app.scss'
import {EmptyResult} from "./components/empty-result";
import {pickRandomEmoji} from "./helpers/pick-random-emoji";
import {EmojiGroup} from "./components/emoji-group";
import {Notification} from "./components/notification";


function App() {
    const randomEmoji = useMemo(() => pickRandomEmoji(), []);
    const [searchQuery, setSearchQuery] = useState("");
    const [showNotification, setShowNotification] = useState(false);
    const groups = useMemo(() => emojidb as unknown as Record<string, Emoji[]>, [emojidb]);
    const filteredGroups = useMemo(() => {
        return Object.entries(groups).map(([group, data]) =>
            [
                group,
                searchQuery.length > 0 ? data.filter(emojiData => emojiData.description.some(description => description.includes(searchQuery))) : data
            ] as [string, Emoji[]])

    }, [searchQuery]);

    const isResultEmpty = useMemo<boolean>(() => {
        if (searchQuery.length === 0) {
            return false;
        }

        return filteredGroups.reduce((nonEmptyGroupsCount, [group, data]) => {
            return data.length === 0 ? nonEmptyGroupsCount : nonEmptyGroupsCount + 1
        }, 0) === 0
    }, [searchQuery, filteredGroups]);

    const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState(0)

    const triggerNotificationHandler = useCallback(() => {
        setShowNotification(false)
        setTimeout(() => setShowNotification(true), 50)
    }, [])

    const triggerUpdateHandler = useCallback(() => {
        setLastUpdateTimestamp(Date.now());
        triggerNotificationHandler();
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => setShowNotification(false), 1000);
        return () => {
            clearTimeout(timeout)
        }
    }, [showNotification])

    return (
        <div className="app">
            <section className="section-search">
                <input autoFocus={true} type="text" placeholder={randomEmoji.description[0].toLowerCase()}
                       onChange={(e) => setSearchQuery(e.target.value)}/>
            </section>
            <History triggerNotification={triggerNotificationHandler} lastUpdateTimestamp={lastUpdateTimestamp}/>
            <section className="section-list">
                {
                    isResultEmpty
                        ? <EmptyResult/>
                        : (
                            filteredGroups.map(([group, data]) => (
                                data.length ?
                                    <EmojiGroup  key={group} group={group} data={data} triggerUpdate={triggerUpdateHandler}/>
                                    : null

                            ))
                        )
                }
            </section>
            {
                showNotification
                    ? <Notification/>
                    : null
            }
        </div>
    )

}

export default App
