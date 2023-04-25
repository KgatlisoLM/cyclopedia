import React from "react";
import { getRandomUser } from "../../Utility/api";
import Instructor from "./Instructor";

class CycloOpedia extends React.Component {
  constructor(props) {
    super(props);
    this.state =  JSON.parse(localStorage.getItem("cyclopedia")) || {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
      inputName: "",
      inputFeedback: "",
    };
  }

  componentDidMount = async () => {
    // console.log("Component Did Mount");
    if(JSON.parse(localStorage.getItem("cyclopedia"))){
    //    this.setState(JSON.parse(localStorage.getItem("cyclopedia"))) 
    }else {
        const response = await getRandomUser();
        console.log(response);
        this.setState((prevState) => {
          return {
            instructor: {
              name: response.data.first_name + " " + response.data.last_name,
              email: response.data.email,
              phone: response.data.phone_number,
            },
          };
        });
    }
   
  };

  componentDidUpdate = async (prevProps, prevState) => {
    // console.log("Component Did Update");
    localStorage.setItem("cyclopedia", JSON.stringify(this.state));
    // console.log("Old State - " + prevState.studentCount);
    // console.log("New State -" + this.state.studentCount);
    if(prevState.studentCount < this.state.studentCount){
       const response = await getRandomUser();
       this.setState((prevState) => {
         return {
           studentList: [
              ...prevState.studentList,{
                name: response.data.first_name + " " + response.data.last_name,
              }
           ]
         }
       });

    }else if(prevState.studentCount > this.state.studentCount){
      const response = await getRandomUser();
      this.setState((prevState) => {
        return {
          studentList: [],
        }
      });
    }
  }

  componentWillUnmount() {
    // console.log("Component Will UnMount");
  }

  handleAddStudent = () => {
    this.setState((prevState) => {
        return {
            studentCount: prevState.studentCount + 1,
        };
    });
  }

  handleRemoveAllStudent = () => {
    this.setState((prevState) => {
        return {
            studentCount: 0,
        };
    });
  }

  handleToggleInstructor = () => {
     this.setState((prevState) => {
        return {
            hideInstructor: !prevState.hideInstructor,
        };
     });
  } 


  render() {
    // console.log("Render Component");
    return (<>

        <div className="p-3">
            <span className="h4 text-success">Instructor</span>
            <i  
            className={`bi ${this.state.hideInstructor ? "bi-toggle-on" : "bi-toggle-off"}  btn btn-success btn-sm`}
            onClick={this.handleToggleInstructor}></i>
        </div>
        {this.state.hideInstructor ? (  
             <Instructor instructor={this.state.instructor} />
        ) : null}
        <div className="p-3">
            <span className="h4 text-success">Feedback</span><br/>
            <input 
                type="text" 
                value={this.state.inputName}
                placeholder="Name..."
                onChange={(e) => this.setState({
                    inputName: e.target.value
                })}
                /> Value: {this.state.inputName} <br/>
            <textarea 
                type="text" 
                placeholder="Feedback..."
                onChange={(e) => this.setState({
                    inputFeedback: e.target.value
                })}></textarea>Text: {this.state.inputFeedback}
        </div>
        <div className="p-3">
            <span className="h4 text-success">Students</span>
            <br/>
            <div>Student Count : {this.state.studentCount}</div>
             <button 
                className="btn btn-success btn-sm"
                onClick={() => this.handleAddStudent()}>Add Student</button>
             &nbsp;
             <button 
                className="btn btn-danger btn-sm"
                onClick={() => this.handleRemoveAllStudent()}>Remove All Student</button>

                {this.state.studentList.map((student, index) => {
                  return(
                    <div key={index}>- {student.name}</div>
                  )
                })}
        </div>
    </>);
  }
}

export default CycloOpedia;
