import AutoCompleteSearchBar from "../components/AutoCompleteSearchBar";
import { useState } from "react";
import {useParams} from 'react-router-dom';
import './SearchPage.css';

function SearchPage(){
    let {id} = useParams();
    const [searchTerm, setSearchTerm] = useState('');

    function handleSubmit(event){
        event.preventDefault();
        event.target.submit();
    }


    return(
        <div className="app-container">
            <h3>Search {id[0].toUpperCase()+id.slice(1)}</h3>
            <form onSubmit={handleSubmit}>
                <AutoCompleteSearchBar endpoint={id} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                <input type="submit" value="Search"></input>
            </form>
        </div>
    )
}

export default SearchPage;