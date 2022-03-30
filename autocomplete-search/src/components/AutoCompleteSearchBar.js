import {useState, useEffect, useRef} from 'react';
import { useLocation } from 'react-router-dom';
import searchAPI from '../API/searchAPI.js';
import './AutoCompleteSearchBar.css';


function AutoCompleteSearchBar(props){

    const {endpoint} = props; //props accept end points to perform the search (required)
    const {searchQualifiers} = props; //props accepts an string of search qualifier as per Github search documentation (Optional) to refine suggested search terms.
    const{searchTerm, setSearchTerm} = props;

    const location = useLocation();
    //const [searchTerm, setSearchTerm] = useState('');
    const [previousSearchResults, setPreviousSearchResults] = useState({
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

                if (res.data.results.data.length>0){
                    // save results to previous search results and remove duplicates
                    setPreviousSearchResults(current=>{
                        let previousResults = {...current};
                        previousResults[endpoint].push(...res.data.results.data);
                        previousResults[endpoint] = [...(new Set(previousResults[endpoint]))]; //removes duplicate
                        return previousResults;
                    });
                };

                if(res.data.results.data.length>=200 || !res.data.results.incompleteResults){ //log query if current API returns complete results.
                    console.log('test');
                    previousSearches.current[endpoint].push(endpoint+query);
                }
            }).catch(err=>{

                    console.log(err.response);

            })

        };

        //kick start first call to build up local search database. Do not search again if term previously searched.
        if (searchTerm.length===3 && !previousSearches.current[endpoint].includes(endpoint+query) && !selected){

            updateSearchFromAPI(endpoint,query);
           
        }else if (searchTerm.length>0 && !previousSearches.current[endpoint].includes(endpoint+query)&& !selected){

            //subsequent calls to update database only when no change to input field in 1000ms
            const timeoutHandler = setTimeout(()=>{updateSearchFromAPI(endpoint,query)},1000)

            return(()=>clearTimeout(timeoutHandler));
        }
    }, [searchTerm, selected, endpoint,searchQualifiers]);

    //update suggested
    useEffect(()=>{

        if (searchTerm.length>0 && !selected){

            let re;

                re=searchTerm.replace(/\s?[\-.,:;\/\\`'"=*!?#$&+^|~<>(){}[\]@]+\s?/g,' ');
                re +='[a-z]*\\s?[a-z]+';
                re = new RegExp(re,'i');

                console.log(previousSearchResults);
                console.log(previousSearches.current);
                let filteredResults = previousSearchResults[endpoint].filter(result=>re.test(result));
                console.log(filteredResults);
                if(filteredResults.length!==0){
                    let matches = filteredResults.map(result=>result.match(re)[0].toLowerCase().trim());
                    // remove duplicates
                    let uniqueMatches = [...(new Set(matches))];
                    setSuggested(uniqueMatches);
                }else{
                    setSuggested(['No Suggestion at the moment...'])
                }
        } else{
            setSuggested([]);
        }
    },[searchTerm, previousSearchResults,selected,endpoint]);


    return(
        <div className='container'>
            {/* <form onSubmit={handleSubmit}> */}
                <label htmlFor='q'>Search Term: </label><input type='text' value={searchTerm} id='q' name="q" onChange={handleInputChange} onKeyDown={()=>setSelected(false)}></input>
            {/* </form> */}
            <div>
                {suggested.length >0
                    ?<div id="suggested-drop-down">
                {suggested.sort().slice(0,20).map(entry=>{
                    if (entry==='No Suggestion at the moment...'){
                        return <div key={entry} id="suggested-entry">{entry}</div>
                    }else{
                        return <div key={entry} id="suggested-entry" onClick={()=>{
                            setSearchTerm(entry);
                            setSelected(true)}}>{entry}</div>
                    }})
                }</div>: null
                }</div>
        </div>
    )

}

export default AutoCompleteSearchBar;