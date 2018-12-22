import React from 'react';
import Editable from '../../components/contentEditable/contentEditable';
import Sidebar from '../../components/sidebar/sidebar';
import moment from 'moment';


class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      html: '',
      isOpen: false
    }
    if (window) {
      const myNotes = JSON.parse(window.localStorage.getItem('myNotes')) || {[props.match.params.noteId]: {}};
      const notes = myNotes[props.match.params.noteId]? myNotes[props.match.params.noteId].note : ''
      if (notes) {
        this.state.html = notes;
      }
    }
  }

  handleOpenClose = (e) => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  componentDidMount() {
    
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ html: value });
    const myNotes = JSON.parse(window.localStorage.getItem('myNotes')) || {};
    myNotes[this.props.match.params.noteId] = {
      note: value,
      lastUpdated: moment()
    }
    localStorage.setItem('myNotes', JSON.stringify(myNotes));
  }

  render() {
    return (
      <React.Fragment>
        <div className="container h-100">
          <div className="row h-100">
            <div className={"col main-page " +(this.state.isOpen? 'opened-sidebar': '')}>
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