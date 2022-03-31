import AutoCompleteSearchBar from "../components/AutoCompleteSearchBar";
import { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import './SearchPage.css';
import ConditionalTextInput from "../components/ConditionalTextInput";

const FIELDS_TO_SHOW = {
    code:['user', 'repo','org'],
    commits:[],
    issues:[],
    labels:[],
    repositories:[],
    topics:[],
    users:[],
}


function SearchPage(){
    let {id} = useParams();

    //clear fields when id changes
    useEffect(()=>{

        setUser("");
        setOrg("");
        setRepo("");
    }, [id]);;

    const[user, setUser] = useState('');
    const[org, setOrg] = useState('');
    const[repo, setRepo] = useState('');
    const[searchQualifiers, setSearchQualifiers]=useState('');
    const [searchTerm, setSearchTerm] = useState('');



    async function handleSubmit(event){

        function updateSearchTerm(){
            return new Promise((resolve)=>{
                setSearchTerm((current)=>current+searchQualifiers);
                resolve();
            })
        }

        event.preventDefault();

        if(id==="code"){
            if(searchTerm && (user || org || repo)){

                await updateSearchTerm();
                
                event.target.submit();
            }
        }else if(searchTerm){

            await updateSearchTerm();            
            event.target.submit();
        }
    }

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
    }, [user,org,repo])
    





    return(
        <div className="app-container">
            <h3>Search {id[0].toUpperCase()+id.slice(1)}</h3>
            <form onSubmit={handleSubmit}>
                <ConditionalTextInput id="user" labelText="User: " arrToMatch={FIELDS_TO_SHOW[id]} value={user} onChange={handleChange} />
                <ConditionalTextInput id="org" labelText="Organization: " arrToMatch={FIELDS_TO_SHOW[id]} value={org} onChange={handleChange} />
                <ConditionalTextInput id="repo" labelText="Repositories: " arrToMatch={FIELDS_TO_SHOW[id]} value={repo} onChange={handleChange} />
                <AutoCompleteSearchBar endpoint={id} searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchQualifiers={searchQualifiers}/>
                {id==="code" && <div>Note: *User, Organization or repositories must be filled with valid values for autocomplete to work</div>}
                <input type="submit" value="Search"></input>
            </form>
        </div>
    )
}

export default SearchPage;