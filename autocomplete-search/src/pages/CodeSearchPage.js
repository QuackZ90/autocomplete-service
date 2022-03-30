import AutoCompleteSearchBar from "../components/AutoCompleteSearchBar";
import { useEffect, useState } from "react";
import './SearchPage.css';
import { useLocation } from "react-router-dom";

const FIELDS_TO_SHOW = {
    code:['name', 'repo','org']
}

function CodeSearchPage(){

    const[user, setUser] = useState('');
    const[org, setOrg] = useState('');
    const[repo, setRepo] = useState('');
    const[searchQualifiers, setSearchQualifiers]=useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();

    console.log(location.pathname.slice(1));


    function handleChange(event){
        switch(event.target.id){
            case("user"):
                setUser(event.target.value);
                break;
            case("org"):
                setOrg(event.target.value);
                break;
            case("repo"):
                setRepo(event.target.value);
                break;
            default:
                break;
        }
    }

    async function handleSubmit(event){
        function updateSearchTerm(){
            return new Promise((resolve)=>{
                setSearchTerm((current)=>current+searchQualifiers);
                resolve();
            })
        }
        event.preventDefault();

        if(searchTerm && (user || org || repo)){

            await updateSearchTerm();
            
            event.target.submit();
        }
    }

    useEffect(()=>{
        let qualifier="";
        if(user){
            qualifier+='+user:'+user;
        }
        if(org){
            qualifier+='+org:'+org;
        }
        if(repo){
            qualifier+='+repo:'+repo;
        }

        console.log(qualifier)
        setSearchQualifiers(qualifier);
    }, [user,org,repo]);


    return(
        <div className="app-container">

            <h3>Search Code</h3>

            <form onSubmit={handleSubmit} method='get'>
                <label htmlFor="user">User: </label><input type='text' value={user} id="user" onChange={handleChange}></input>
                <label htmlFor="org">Organization: </label><input type='text' id="org" value={org} onChange={handleChange}></input>
                <label htmlFor="repo">Repositories: </label><input type='text' id="repo" value={repo} onChange={handleChange}></input>
                <AutoCompleteSearchBar endpoint={"code"} searchQualifiers={searchQualifiers} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                <div>Note: *User, Organization or repositories must be filled with valid values for autocomplete to work</div>
                <input type="submit" value="Search"></input>
            </form>
        </div>
    )
}

export default CodeSearchPage;