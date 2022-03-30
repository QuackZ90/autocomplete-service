import axios from 'axios';

export default axios.create({
    baseURL:"https://api.github.com/search",
    headers: {'Accept': 'application/vnd.github.v3.text-match+json'},

})