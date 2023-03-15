export const addToHistory = (emojiToAdd: string) => {
    void chrome.storage.sync.get(['history'])
        .then(data => {
            if (!data.history.includes(emojiToAdd)) {
                const udpatedHistory = [...data.history.slice(1, 6), emojiToAdd];
                void chrome.storage.sync.set({history: udpatedHistory}).catch(err => console.error(err))
            }
        })
}
