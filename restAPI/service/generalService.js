import githubSearchAPI from "../API/githubSearchAPI.js";
const SEARCHLIMIT = 1000;

class GeneralServices{

    #pastAutoCompleteSearches = [];
    #pastAutoCompleteResults = [];

    constructor(route){
        this.route = route;

        this.autoComplete = this.autoComplete.bind(this);
        this.search = this.search.bind(this);
    }

    async autoComplete(searchParams){

        let results ={
            statusText: null,
            status: null,
            data: [],
            message: null,
            incompleteResults: true,
        }

        searchParams.page = 1;

        let numResults;
        let entriesScanned=0;

        console.log(`Autocompleted services calling github API endpoint ${this.route} with the following params: `, searchParams);

        do{
  
            try{

                const response = await githubSearchAPI.get(`${this.route}`,{params:searchParams});

                if (searchParams.page === 1){
                    numResults = parseInt(response.data.total_count);
                    console.log(response.data.total_count);
                }

                entriesScanned += response.data.items.length;

                response.data.items.forEach(item =>{                  
                    try{
                        results.data.push(item.text_matches[0].fragment);
                    }catch(err){
                        console.log(err.stack);                     
                    }
                    
                })
                results.status = response.status;
                results.statusText = response.statusText;

                searchParams.page++;
    
            }catch(err){

                console.log(err);

                console.log(err.response.status);
                console.log(err.response.statusText);
                console.log(err.response.data);

                if (results.data.length === 0){

                    results.status = err.response.status;
                    results.statusText = err.response.statusText;                    
                    if (results.statusText === 'rate limit exceeded'){
                        results.message = `Sever busy, Please try again later.`;
                    }else{
                        results.data = err.response.data;
                    }
                } else if(err.response.statusText === 'rate limit exceeded'){
                    results.message = `${results.data.length}/${numResults} shown due to API rate limit exceeded.`;
                } else{
                    results.message = `${results.data.length}/${numResults} shown due to ${err.response.data.message}`;
                }
                break;
            }
        }while(entriesScanned < numResults && entriesScanned < SEARCHLIMIT) //show only first 200 results.

        //clean results
        if (results.status===200){
            results.data = results.data.map(data=>data.replace(/\s?[\-.,:;\/\\`'"=*!?#$&+^|~<>(){}[\]@]+\s?/g,' ').replace(/\s?\n\s?/,' ').trim()); //clean fragments of these symbols)
        };
        console.log(entriesScanned);

        //updates search statues for successful api call and cache the results.
        if (results.status===200 && entriesScanned === numResults){
            console.log(results.status);
            results.incompleteResults = false;
            results.message = 'search completed';
            this.#pastAutoCompleteResults.push(...results.data);
            this.#pastAutoCompleteSearches.push(searchParams.q); //cache search results
            this.#pastAutoCompleteResults = [...(new Set(this.#pastAutoCompleteResults))];
            this.#pastAutoCompleteSearches = [... (new Set(this.#pastAutoCompleteSearches))];//removes duplicate
            console.log(this.#pastAutoCompleteSearches);
            console.log('test');
        } else if (entriesScanned === 200){
            results.message = `only first ${results.data.length} results shown out of ${numResults}`;
            results.incompleteResults = false;
            this.#pastAutoCompleteResults.push(...results.data);
            this.#pastAutoCompleteSearches.push(searchParams.q); //cache search results
            this.#pastAutoCompleteResults = [...(new Set(this.#pastAutoCompleteResults))];
            this.#pastAutoCompleteSearches = [... (new Set(this.#pastAutoCompleteSearches))];//removes duplicate
            console.log('test2')
        }



        if(results.status===403 && results.statusText === 'rate limit exceeded'){
            let re = new RegExp(searchParams.q,'i');

            let cachedResults = this.#pastAutoCompleteResults.filter((result)=>re.test(result));
            if (cachedResults.length > 0){
                results.data = cachedResults;
                results.message = "cached results shown due to API rate exceeds limit";
                results.status = 200;
            }
        }

        console.log(results.data.length);
        console.log(this.#pastAutoCompleteResults);
        console.log(this.#pastAutoCompleteSearches);

        return results;

    };

    //below for own reference only   

    
    async search (searchParams){

        console.log(searchParams);

        let results ={
            statusText: null,
            status: null,
            data: null
        }

        try{

            console.log(`Calling github API with the following params: `, searchParams);
            const response = await githubSearchAPI.get('/code',{params:searchParams});

            results.data = response.data;
            results.status = response.status;
            results.statusText = response.statusText;

            return results;

        }catch(err){

            results.status = err.response.status;
            results.data = err.response.data;
            results.statusText = err.response.statusText;


            return results;

        }
    };

}

export default GeneralServices;