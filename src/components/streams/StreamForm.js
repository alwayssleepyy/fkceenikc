import React from "react";
import { Field, reduxForm } from "redux-form";
//field is capitatalized cause its a component meanwhile reduxForm is a function
//meta iinside formprops has error info

//forrmprops includes onchange and value
class StreamForm extends React.Component {
  //render error handles only showing error in specific cases
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  //  U CAN STILL INSPECT HTML ELEMENTS IN REACT WHICH CAN HELP DEBUG
  //100% USE DESTRUCTURING BELOW INSTEAD OF FORMPROPS. EVERYWHERE
  renderInput = formProps => {
    const className = `field ${
      formProps.meta.error && formProps.meta.touched ? "error" : ""
    }`;
    return (
      <div className={className}>
        <label>{formProps.label}</label>
        <input {...formProps.input} autoComplete="off" />
        {this.renderError(formProps.meta)}
      </div>
      //input tag above iis automatically taking onchange={formprops.input.onchange} and the value equivalent through {...formprops.input}
      //rendor input is called by field so this has undefined in above unless we fix it with bind or arrow, ask ceeniuk why this bind not working tho
    );
  };
  //formprops.input adds all props of input object to input tag basically
  //component automatically calls renderinput here with formprops

  //now onsubmit will be called with all the values out of our form with the formvalues(can be named anything) object.. just console log formvalues
  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  //if the field name matches the error property name upon validation problem it gets sent to formvalues/renderinput, we defined property names in validation object accordingly. so connection is made according to field+property name
  render() {
    return (
      //semantic ui doesnt show errors unless they have the classname of error
      <form
        className="ui form error"
        //this.props.handlesubmit is provided by redux form, its callback, automatically prevents default behavior and with event object
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field name="title" component={this.renderInput} label="Enter title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter description"
        />
        <button className="ui button primary">Submit</button>
      </form>
      //redux form is automatically sending unknown props like label to the formProps object among the one it intristically has, basically sends everything
    );
  }
}

//again formvalues contain all diff values inside our form, below is our validation to make sure input is as wanted
const validate = formValues => {
  const errors = {};
  //if the object returned by validation is empty(Refer below comment), only then redux form will think our form is valid..also invalid stops us submission of empty form coz obv
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};
//form initial rendering/with literally every interaction with our form by user; validation is done

export default reduxForm({
  form: "streamForm",
  validate
})(StreamForm);

// const formWrapped = reduxForm({ form: "streamCreate", validate })(StreamForm);
//
// export default connect(
//   null
// )(formWrapped);
//reduxform adds a whole number of props to our props object
