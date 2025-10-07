import { useState } from "react";

export default function SearchBar(props){
    const onSearch = props.onSearch;
    const placeholder = props.placeholder || "Enter your city";

    const [value, setValue] = useState("");

    function handleSubmit(e){         // 'e'= Handling Event like submit button etc 
        e.preventDefault();           // Prevents page from Reloading
        const city = value;
        if(city) onSearch(city);     // Checks if the variable city has a value
    }
    return(
        <form onSubmit={handleSubmit} className="Search">
            <input
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            placeholder={placeholder}/>
            <button type="submit">Search</button>
        </form>
    );
}
