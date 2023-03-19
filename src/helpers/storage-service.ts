export const storageService = () => {
    const DEFAULT_HISTORY = ["🔥", "🌸", "🌱", "🍣", "🍋", "🐔"];

    // Clear previous extension history
    void chrome.storage.local.clear();

    // Initialize storage
    chrome.storage.sync.get(['history']).then(data => {
        if (!data.history || data.history.length !== 6) {
            void chrome.storage.sync.set({history: DEFAULT_HISTORY})
        }
    })
}
