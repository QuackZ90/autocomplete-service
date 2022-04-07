import TestComponent from "../AutoCompleteSearchBar";
import searchAPI from "../../API/searchAPI";
jest.mock('../../API/searchAPI',()=>{return{get:()=>jest.fn(Promise.resolve({data:{}}))}});
jest.mock('react-router-dom');
import {act} from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import {render, screen, unmount, waitFor, getAllByText} from '@testing-library/react';

afterEach(()=>{
    jest.clearAllMocks();
    jest.useRealTimers();
})


describe("Tests for AutoComplete Search Bar", ()=>{

    let container = null;
    let endpoint = 'code';
    let searchTerm = '';
    let setSearchTerm= jest.fn();
    let searchQualifiers = '';
    // beforeEach(()=>{
    //     //setup a DOM element as a render target
    //     container = document.createElement("div");
    //     document.body.appendChild(container);
    // });
    



    test("Test 1: There should be no drop down when the input is empty.",()=>{

        const {unmount}=render(<TestComponent endpoint={endpoint} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>);


        expect(document.getElementById("suggested-drop-down")).toBe(null);
        unmount();

    });

    test("Test 2: should search immediately when input has more than 3 characters.",async ()=>{

        const spy = jest.spyOn(searchAPI, "get").mockResolvedValue({data:{
            results:{
                data:["test API", "test results"]}}});


        const {container, unmount, rerender} = render(<TestComponent endpoint={endpoint} searchTerm="tes" setSearchTerm={setSearchTerm}/>);
        expect(spy).toHaveBeenCalledWith("/autocomplete/code",{params:{q:"tes"}});

        expect(document.getElementById("suggested-drop-down")).not.toBe(null);

        await waitFor(()=>{
            expect(screen.getByText("test api")).toBeInTheDocument();
            expect(screen.getByText("test results")).toBeInTheDocument();
        });

        unmount();

    });



    test("Test 3: should wait for 1000ms before initiating a search when not 3 characters.",async ()=>{
        //jest.useFakeTimers();
        const spy = jest.spyOn(searchAPI, "get").mockResolvedValue({data:{
            results:{
                data:["test API", "test results"]}}});
        
        const {container, unmount, rerender} = render(<TestComponent endpoint={endpoint} searchTerm="test" setSearchTerm={setSearchTerm}/>);

        expect(spy).not.toHaveBeenCalled();

        //jest.advanceTimersByTime(900);

        expect(spy).not.toHaveBeenCalled();

        //jest.runOnlyPendingTimers();

        await setTimeout(()=>{expect(spy).toHaveBeenCalledWith("/autocomplete/code",{params:{q:"test"}})},1000);

        await waitFor(()=>{
            expect(screen.getByText("test api")).toBeInTheDocument();
            expect(screen.getByText("test results")).toBeInTheDocument();
        },{timeout:1500});

        unmount();

    });

    test("Test 4: expect suggested search results to be clickable.", async ()=>{

        const spy = jest.spyOn(searchAPI, "get").mockResolvedValue({data:{
            results:{
                data:["test API", "test results"]
            }
        }});
        


        const {container, unmount, rerender} = render(<TestComponent endpoint={endpoint} searchTerm="tes" setSearchTerm={setSearchTerm}/>);

        expect(document.getElementById("suggested-drop-down")).not.toBe(null);

        await waitFor(()=>{
            expect(screen.getByText("test api")).toBeInTheDocument();
            expect(screen.getByText("test results")).toBeInTheDocument();
        });

        userEvent.click(screen.getByText("test api"));
        expect(setSearchTerm).toBeCalled();

        unmount();

    });


})