import React from "react";

class Instructor extends React.Component {
    constructor(props){
        super(props);

    }

    componentDidUpdate() {
        // console.log("update - instructor");
    }

    componentDidMount() {
        // console.log("Mounted - instructor");
    }

    componentDidUnMount() {
        // console.log("UnMount - instructor");
    }


    render() {
        // console.log("Render - Instructor");
        return (
            <div>
               Name: {this.props.instructor.name}
               <br/>
               Email: {this.props.instructor.email}
               <br/>
               Phone: {this.props.instructor.phone}
            </div>
        )
    }


}

export default Instructor;