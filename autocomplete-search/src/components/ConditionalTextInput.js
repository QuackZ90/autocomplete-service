function ConditionalTextInput({id, arrToMatch, labelText, ...props}){

    return(
        <>{
            arrToMatch.includes(id) && <><label htmlFor={id}>{labelText}</label><input type="text" id={id}{...props}></input></>
        }
        </>
    )
}

export default ConditionalTextInput;