import React, {useEffect} from "react";

const InstructorFunc = (props)  =>{

    useEffect(() => {
        return () => {
            // console.log("Instructor - Unmounted");
        }
    }, []);
  
    // componentDidMount() {
    //     console.log("Mounted - instructor");
    // }

    // componentDidUnMount() {
    //     console.log("UnMount - instructor");
    // }

    return (
        <div>
            Name: {props.instructor.name}
               <br/>
            Email: {props.instructor.email}
               <br/>
            Phone: {props.instructor.phone}
        </div>
    )

}

export default InstructorFunc;