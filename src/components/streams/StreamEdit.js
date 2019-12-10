import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";
//with React router each component needs to  be designed to work in isolation(fetch its own data)
//which is why this component fetches the individual stream just in case user directly goes there instead of through main page
class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
    //IMPORTANT:
    //Formvalues/Edit changes here should ONLY contain what is actually being changed
    //example:if im chaing title and description i should only pass title and description not the ID too which isnt actually being changed
    //we only want to push values that change, nothing else here
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading..</div>;
    }
    return (
      <div>
        <h3>Edit a stream</h3>
        <StreamForm
          onSubmit={this.onSubmit}
          initialValues={_.pick(this.props.stream, "title", "description")}
          //here we are pulling out the list of all the different properties that we actually want to pass down to initial values instead of everything in stream
          //also above creates new object
        />
      </div>
      //initial values is a special property name, it does what u wud expect which is to give initial field values
      //stream form is wrapped by redux form and it will see the initial values
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream: editStream }
  //using both syntaxes above to send action creators into our component
)(StreamEdit);
//streamedit is being rendered by route, react router dom will automatically will pass down a bunch of props
//because we added a param value of id(can be named anything), it is passed down as a prop with whatever is the value
