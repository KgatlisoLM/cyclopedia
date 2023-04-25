import React, { useEffect, useRef, useState, useId } from "react";
import { getRandomUser } from "../../Utility/api";
import InstructorFunc from "./InstructorFunc";

const CycloOpediaFunc = () => {
   const [state, setState] = useState({
        instructor: undefined,
        studentList: [],
        studentCount: 0,
        hideInstructor: false,
        inputName: "",
        inputFeedback: "",
   });
  //  const [totalRender, setTotalRender] = useState(0);
   const totalRender = useRef(0);
   const prevStudentCount = useRef(0);
   const feedbackInputRef = useRef(null);
   const Id = useId();



   const [inputName, setInputName] = useState("");
   const [inputFeedback, setInputFeedback] = useState("");

   useEffect(() => {
      // setTotalRender((prevState) => prevState + 1);
      totalRender.current = totalRender.current + 1;
      console.log("render" + totalRender.current);
   });
 

   useEffect(() => {
    const getUser = async() => {
      const response = await getRandomUser();
      setState((prevState) => {
        return {
          ...prevState,
          instructor: {
            name: response.data.first_name + " " + response.data.last_name,
            email: response.data.email,
            phone: response.data.phone_number,
          },
        };
      });
    };
    if(!state.hideInstructor){
      getUser();
    }
  }, [state.hideInstructor]);


  useEffect(() => {
    const getUser = async() => {
      const response = await getRandomUser();
      setState((prevState) => {
        return {
          ...prevState,
          studentList: [
             ...prevState.studentList,
             {
              name: response.data.first_name + " " + response.data.last_name,
            },
          ] 
        };
      });
    };
  if(prevStudentCount.current < state.studentCount){
    getUser();
  }else if(prevStudentCount.current > state.studentCount){
    setState((prevState) => {
      return {...prevState, studentList:[]};
    })
  }
      
  }, [state.studentCount]);

  useEffect(() => {
    prevStudentCount.current = state.studentCount;
  }, [state.studentCount]);




  useEffect(() => {
    // console.log("This will be called on whenever value of hideInstructor changes");
  }, [inputFeedback, inputName]);

  useEffect(() => {
    feedbackInputRef.current.focus()
    // console.log("This will be called on initial/first render");
    return () => {
      // console.log("This will be called on when component will be unmounted")
    }
  }, []);


  const handleAddStudent = () => {
    setState((prevState) => {
        return {
            ...prevState,
            studentCount: prevState.studentCount + 1,
        };
    });
  }

  const handleRemoveAllStudent = () => {
    setState((prevState) => {
        return {
          ...prevState,
            studentCount: 0,
        };
    });
  }

  const handleToggleInstructor = () => {
     setState((prevState) => {
        return {
          ...prevState,
            hideInstructor: !prevState.hideInstructor,
        };
     });
  } 

    return (<>

        <div className="p-3">
            <span className="h4 text-success">Instructor</span>
            <i  
            className={`bi ${state.hideInstructor ? "bi-toggle-on" : "bi-toggle-off"}  btn btn-success btn-sm`}
            onClick={handleToggleInstructor}></i>
        </div>
        {state.hideInstructor ? (  
             <InstructorFunc instructor={state.instructor} />
        ) : null}
        <div className="p-3">Total Render: {totalRender.current}</div>
        <div className="p-3">
            <span className="h4 text-success">Feedback</span><br/>
            <input 
                type="text" 
                value={inputName}
                placeholder="Name..."
                onChange={(e) => setInputName(e.target.value)}
                id={`${Id} - inputName`}
                /> <label htmlFor={`${Id} - inputName`}>Name Value: </label> {inputName} <br/>
            <textarea 
                type="text" 
                value={inputFeedback}
                ref={feedbackInputRef}
                id={`${Id} - inputFeedback`}
                placeholder="Feedback..."
                onChange={(e) => setInputFeedback(e.target.value)}></textarea>
                <label htmlFor={`${Id} - inputFeedback`}> Feedback Value: </label>{inputFeedback}
        </div>
        <div className="p-3">
            <span className="h4 text-success">Students</span>
            <br/>
            <div>Student Count : {state.studentCount}</div>
             <button 
                className="btn btn-success btn-sm"
                onClick={() => handleAddStudent()}>Add Student</button>
             &nbsp;
             <button 
                className="btn btn-danger btn-sm"
                onClick={() => handleRemoveAllStudent()}>Remove All Student</button>

                {state.studentList.map((student, index) => {
                  return(
                    <div key={index}>- {student.name}</div>
                  )
                })}
        </div>
    </>);
  }


export default CycloOpediaFunc;
