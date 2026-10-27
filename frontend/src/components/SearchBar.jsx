import { useState } from "react";

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm.trim());
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search beauty products..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
            />

            <button type="submit">
                Search
            </button>
        </form>
    );
}

export default SearchBar;