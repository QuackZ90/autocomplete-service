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
            <form onSubmit={handleSubmit}>
                <AutoCompleteSearchBar endpoint={id} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                <input type="submit" value="Search"></input>
            </form>
        </div>
    )
}

export default SearchPage;