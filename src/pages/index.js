import React from 'react';
import Editable from '../components/contentEditable/contentEditable';

class IndexPage extends React.Component {

  state = {
    html: ''
  }

  componentDidMount() {
    if (window) {
      const notes = window.localStorage.getItem('notes') || '';
      if (notes) {
        this.setState({
          html: notes
        })
      }
    }
  }

  handleChange = (event) => {
    const { value } = event.target;
    localStorage.setItem('notes', value);
    this.setState({ html: value });
  }

  render() {
    return (
      <div className="container h-100">
        <div className="row h-100">
          <div className="col h-100">
            <Editable html={this.state.html} onChange={this.handleChange} />
          </div>
        </div>
      </div>
    )
  }
}

export default IndexPage