import {useState, useEffect, useRef} from 'react';
import { useLocation } from 'react-router-dom';
import searchAPI from '../API/searchAPI.js';
import './AutoCompleteSearchBar.css';

const CACHE_ON = true;


function AutoCompleteSearchBar(props){

    const {endpoint} = props; //props accept end points to perform the search (required)
    const {searchQualifiers} = props; //props accepts an string of search qualifier as per Github search documentation (Optional) to refine suggested search terms.
    const{searchTerm, setSearchTerm} = props;
    const inputRef = useRef(null);

    const location = useLocation();
    //const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState({
        code:[],
        commits:[],
        issues:[],
        labels:[],
        repositories:[],
        topics:[],
        users:[],
    });
    const [suggested, setSuggested] = useState([]);
    const [selected, setSelected] = useState(false);
    const [limitHit, setLimitHit] = useState(false);

    const previousSearches = useRef({
        code:[],
        commits:[],
        issues:[],
        labels:[],
        repositories:[],
        topics:[],
        users:[],
    });


    function handleInputChange(event){
        setSearchTerm(event.target.value);
    };

    //clear input when location changes
    useEffect(()=>{
        setSearchTerm('');
    },[location, setSearchTerm]);

    //retrive search results from backend and update local search results
    useEffect(()=>{

        let query;
        if(searchQualifiers){
            query = searchTerm+searchQualifiers;
        }else{
            query =searchTerm
        }

            //update local search results from API
        function updateSearchFromAPI(endpoint, query){

            searchAPI.get('/autocomplete/'+endpoint, {params:{q:query}}).then(res=>{

                console.log(res);

                if (res.data.results.message === "cached results shown due to API rate exceeds limit"){
                    setLimitHit ((prev)=>true);
                }

                else{
                    setLimitHit((prev)=>false);
                }

                if (res.data.results.data.length>0){
                    // save results to previous search results and remove duplicates
                    setSearchResults(current=>{
                        let results
                        if(CACHE_ON){
                            results = {...current};
                        }
                        results[endpoint].push(...res.data.results.data);
                        results[endpoint] = [...(new Set(results[endpoint]))]; //removes duplicate
                        return results;
                    });
                };

                if(res.data.results.data.length>=200 || !res.data.results.incompleteResults){ //log query if current API returns complete results.
                    console.log('test');
                    previousSearches.current[endpoint].push(endpoint+query);
                }
                console.log(limitHit)
            }).catch(err=>{

                console.log(err.response);
                    
                if (err.response.data.results.statusText === 'rate limit exceeded'){
                    setLimitHit((prev)=>true);
                } else{
                    setLimitHit((prev)=>false);
                }
                console.log(limitHit);
            })

        };

        //kick start first call to build up local search database. Do not search again if term previously searched.
        if (searchTerm.length===3 && !selected){ //&& !previousSearches.current[endpoint].includes(endpoint+query)

            updateSearchFromAPI(endpoint,query);
           
        }else if (searchTerm.length>0 && !selected){ //&& !previousSearches.current[endpoint].includes(endpoint+query)

            //subsequent calls to update database only when no change to input field in 1000ms
            const timeoutHandler = setTimeout(()=>{updateSearchFromAPI(endpoint,query)},1000)

            return(()=>clearTimeout(timeoutHandler));
        }
    }, [searchTerm, selected, endpoint,searchQualifiers]);

    //update suggested
    useEffect(()=>{

        if (searchTerm.length>0 && !selected){

            let re;

                re=searchTerm.replace(/\s?[-.,:;/\\`'"=*!?#$&+^|~<>(){}[\]@]+\s?/g,' ');
                re +='[a-z0-9]*\\s?[a-z0-9]+';
                re = new RegExp(re,'i');

                console.log(searchResults);
                console.log(previousSearches.current);
                let filteredResults = searchResults[endpoint].filter(result=>re.test(result));
                console.log(filteredResults);
                if(filteredResults.length!==0){
                    let matches = filteredResults.map(result=>result.match(re)[0].toLowerCase().trim());
                    // remove duplicates
                    let uniqueMatches = [...(new Set(matches))];
                    console.log(uniqueMatches);
                    setSuggested(uniqueMatches);
                }else{
                    setSuggested(['No Suggestion at the moment...'])
                }
        } else{
            setSuggested([]);
        }
    },[searchTerm, searchResults,selected,endpoint]);


    return(
        <div className='container'>

            {limitHit&&searchTerm?<div>Cached results shown due to API exceeded limit</div>:null}
            {/* <form onSubmit={handleSubmit}> */}
                <label htmlFor='q'>Search Term: </label><input type='text' value={searchTerm} id='q' name="q" onChange={handleInputChange} onKeyDown={()=>setSelected(false)} ref={inputRef}></input>
            {/* </form> */}
            <div>
                {suggested.length >0
                    ?<div id="suggested-drop-down">
                {suggested.sort().slice(0,20).map(entry=>{
                    if (entry==='No Suggestion at the moment...' || entry === 'Rate Limit exceed. Please try again later.'){
                        return <div key={entry} id="suggested-entry">{entry}</div>
                    }else{
                        return <div key={entry} id="suggested-entry" onClick={()=>{
                            setSearchTerm(entry);
                            setSelected(true);
                            inputRef.current.focus();
                        }}>{entry}</div>
                    }})
                }</div>: null
                }</div>
        </div>
    )

}

export default AutoCompleteSearchBar;