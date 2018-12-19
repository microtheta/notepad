import React from 'react';
import Editable from '../components/contentEditable/contentEditable';
import Sidebar from '../components/sidebar/sidebar';



class IndexPage extends React.Component {

  state = {
    html: '',
    isOpen: false
  }

  handleOpenClose = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
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
      <React.Fragment>
        <div className="container h-100">
          <div className="row h-100">
            <div className={"col shadow-sm mt-md-1 mb-md-2 main-page " +(this.state.isOpen? 'opened-sidebar': '')}>
              <Editable html={this.state.html} onChange={this.handleChange} />
            </div>
          </div>
        </div>
        <Sidebar onSideBar={this.handleOpenClose} isOpen={this.state.isOpen} />
      </React.Fragment>
    )
  }
}

export default IndexPage