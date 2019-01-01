import React from 'react';
import { Link } from 'react-router-dom';
import Editable from '../../components/contentEditable/contentEditable';
import Sidebar from '../../components/sidebar/sidebar';
import moment from 'moment';


class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.editable = React.createRef();
    this.state = {
      html: '',
      noteId: props.match.params.noteId,
      isOpen: false,
      darkMode: window.localStorage.getItem('darkMode') || false
    }
    if (window) {
      const myNotes = JSON.parse(window.localStorage.getItem('myNotes')) || { [props.match.params.noteId]: {} };
      const notes = myNotes[props.match.params.noteId] ? myNotes[props.match.params.noteId].note : ''
      if (notes) {
        this.state.html = notes;
      }
    }
    this.sendEvent = this.sendEvent.bind(this);
    if (window.gtag) {
      window.gtag('config', 'UA-72768481-3');
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (state.noteId !== props.match.params.noteId) {
      const myNotes = JSON.parse(window.localStorage.getItem('myNotes')) || { [props.match.params.noteId]: {} };
      const notes = myNotes[props.match.params.noteId] ? (myNotes[props.match.params.noteId].note || '') : ''
      return {
        html: notes,
        noteId: props.match.params.noteId
      }
    }
    return null
  }

  handleOpenClose = (e) => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  sendEvent = (e) => {
    this.editable.current.eventHandler(e);
  }

  toggleMode = () => {
    this.setState({
      darkMode: !this.state.darkMode
    }, () => {
      if(this.state.darkMode) {
        localStorage.setItem('darkMode', true)
      } else {
        localStorage.removeItem('darkMode')
      }
    })
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
      <div className={"container-fluid min-vh-100 " + (this.state.darkMode ? 'darkmode' : '' )}>
        <Link to={'/'} className="myNotesMenu">
          <span className="menu-bar" />
          <span className="menu-bar" />
          <span className="menu-bar" />
        </Link>
        <div className="container min-vh-100">
          <div className="row min-vh-100">
            <div className={"col main-page " + (this.state.isOpen ? 'opened-sidebar' : '')}>
              <Editable
                {...this.props}
                ref={this.editable}
                html={this.state.html}
                onChange={this.handleChange}
                toggleMode={this.toggleMode}
                onSideBar={this.handleOpenClose} />
            </div>
          </div>
        </div>
        <Sidebar
          darkMode={this.state.darkMode}
          sendEvent={this.sendEvent}
          onSideBar={this.handleOpenClose}
          isOpen={this.state.isOpen} />
      </div>
    )
  }
}

export default IndexPage