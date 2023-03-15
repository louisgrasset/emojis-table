import {useMemo} from "react";
import {pickRandomEmoji} from "../helpers/pick-random-emoji";

export const EmptyResult = () => {
    const randomEmoji = useMemo(()=> pickRandomEmoji(), []);
    return (
        <section className="empty-result">
            <h1>{randomEmoji.emoji}</h1>
            <h2>Oops</h2>
            <p>Nothing has been found</p>
        </section>
    )
}
