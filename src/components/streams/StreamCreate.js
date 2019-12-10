import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  onSubmit = formValues => {
    this.props.createStream(formValues);
  };
  //IMPORTANT
  //when we call reduxForm on our components they get wrapped with the reduxForm component
  //the above means we can pass special named props like initialValues
  render() {
    return (
      <div>
        <h3>Create a stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

//form initial rendering/with literally every interaction with our form by user; validation is done

export default connect(
  null,
  { createStream }
)(StreamCreate);
//reduxform adds a whole number of props to our props object
