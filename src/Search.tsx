import { SetStateAction } from "react";

interface SearchProps {
    // search value
    search: string,
    // handle search value change
    setSearch: SetStateAction<any>
    // placeholder value
    placeholder: string
}
function Search({ search, setSearch, placeholder }: SearchProps) {
    return (
        <div className="emojis-search">
            <input autoFocus type="text" placeholder={placeholder} value={search} onChange={(e) => setSearch(e.target.value.trim().toLowerCase())} />
        </div>
    )
}
export default Search;