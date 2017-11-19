import React, { Component } from 'react';
import { Form, Text } from 'react-form';
// import fire from '../firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Form onSubmit={submittedValues => this.setState({ submittedValues })}>
          { formApi => (
            <div>
              <button
                onClick={() => formApi.addValue('siblings', '')}
                type="button"
                className="mb-4 mr-4 btn btn-success"
              >
                Add Option
              </button>
              <form onSubmit={formApi.submitForm} id="form2">
                <label htmlFor="firstName">
                  Title
                  <Text field="firstName" id="firstName" />
                </label>
                { formApi.values.siblings && formApi.values.siblings.map((sibling, i) => (
                  <div key={`sibling${i}`}>
                    <label htmlFor={`sibling-name-${i}`}>
                      Option
                      <Text field={['siblings', i]} id={`sibling-name-${i}`} />
                    </label>
                    <button
                      onClick={() => formApi.removeValue('siblings', i)}
                      type="button"
                      className="mb-4 btn btn-danger"
                    >
                    Remove
                    </button>
                  </div>
                ))}
                <button type="submit" className="mb-4 btn btn-primary">Submit</button>
              </form>
            </div>
         )}
        </Form>
        <button
          onClick={() => console.log(this.state)}
          type="button"
          className="mb-4 mr-4 btn btn-success"
        >
          Add Option
        </button>
      </div>
    );
  }
}

export default App;
