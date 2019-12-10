import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";
//with React router each component needs to  be designed to work in isolation(fetch its own data)
class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;

    return (
      //we pass down jsx to our modal component through actions
      //refer below for why we used react fragment, or lecture 276
      //react fragment can alternatively be written as <>"this is how it is"</>

      //in the button for delete if we did it as //onClick={deleteStream(cant arguement) or deleteStream(id)}
      //it will get autoinvoked, arrow function wrapping the function prevents that
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }
    return `Are you sure you want to delete this stream with title: ${this.props.stream.title}`;
  }

  render() {
    //wrapping model with a div down here is pointless because react portal
    //is making it so that anything inside model goes directly under our div in index.html
    return (
      <Modal
        title="Delete stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream, deleteStream: deleteStream }
)(StreamDelete);

// //the div below is throwing styling off because div "actions" has another div inside then the buttons
//basically div>div>then the buttons and we cant just make two buttons because adjacent elememnts need to be wrapped in a div
//also if we just put two buttons inside we are trying to assign two jsx tags to actions instead of one enclosing one
// <div>
//   <button className="ui button negative">Delete</button>
//   <button className="ui button">Cancel</button>
// </div>
// WE FIX THIS WITH REACT FRAGMENT WHICH IS BASICALLY AN INVISIBLE ELEMEMNT WHICH HAS NO IMPACT ON DOM
