const acceptableQualifiers ={
    code:{
        in:['file','path','file,path'],
        user:"",
        org:"",
        repo:"",
        path:"",
        language:"",
        size:"",
        filename:"",
        extension:"",
    },
    commits:{
        author:"",
        committer:"",
        "author-name":"",
        "committer-name":"",
        "author-email":"",
        "committer-email":"",
        "author-date":"",
        "committer-date":"",
        merge:['true','false'],
        hash:"",
        parent:"",
        tree:"",
        user:"",
        org:"",
        repo:"",
        is:"",
    },
    issues:{
        type:["pr","issue"],
        is:"",
        in:["title","body","comments"],
        user:"",
        org:"",
        repo:"",
        state:["open","closed"],
        author:"",
        assignee:"",
        mentions:"",
        team:"",
        commenter:"",
        involves:"",
        linked:["pr","issue"],
        "-linked":["pr","issue"],
        label:"",
        milestone:"",
        project:"",
        status:["pending", "success", "failure"],
        head:"",
        base:"",
        language:"",
        comments:"",
        interactions:"",
        reactions:"",
        draft:['true','false'],
        review:["none", "required","approved","changes_requested"],
        "reviewed-by": "",
        "review-requested":"",
        "user-review-requested":"",
        "team-review-requested":"",
        created:"",
        updated:"",
        closed:"",
        merged:"",
        archived:["true","false"],
        no:"",
    },
    labels:{},
    repositories:{
        in:"",
        repo:"",
        user:"",
        org:"",
        size:"",
        followers:"",
        forks:"",
        stars:"",
        created:"",
        pushed:"",
        language:"",
        topic:"",
        topics:"",
        license:"",
        is:"",
        mirror:[true,false],
        archived:[true,false],
        "good-first-issues":"",
        "help-wanted-issues":"",
        has:["funding-file"],
    }




}

function buildQualifiers(qualifiers, endpoint){
    let qualifier = ""
    for ([key,value] in Object.entries(obj)){
        if (acceptableQualifiers[endpoint][key]===undefined){
            continue;
        }else if (typeof acceptableQualifiers[endpoint][key]==="string"){
            qualifier+=`+${String(key)}:${String(value)}`;
        }else if(acceptableQualifiers[endpoint][key].includes(string(value))){
            qualifier+=`+${String(key)}:${String(value)}`;
        }
    }

    return qualifier;
}

export default buildQualifiers;
