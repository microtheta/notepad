import React from 'react';
import { Link } from 'react-router-dom';
import Editable from '../../components/contentEditable/contentEditable';
import Sidebar from '../../components/sidebar/sidebar';
import cuid from 'cuid';
import moment from 'moment';
import About from '../About'

class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.editable = React.createRef();
    this.state = {
      html: '',
      noteId: props.match.params.noteId,
      isOpen: false,
      darkMode: window.localStorage.getItem('darkMode') === 'true'
    }
    if (window) {
      const myNotes = JSON.parse(window.localStorage.getItem('myNotes')) || { [props.match.params.noteId]: {} };
      const notes = myNotes[props.match.params.noteId] ? myNotes[props.match.params.noteId].note : ''
      if (notes) {
        this.state.html = notes;
			}
			this.state.hasNotes = Object.keys(myNotes).length;
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
		if(this.editable.current) {
			this.editable.current.eventHandler(e);
		}
  }

  toggleMode = () => {
    this.setState({
      darkMode: !this.state.darkMode
    }, () => {
      localStorage.setItem('darkMode', this.state.darkMode)
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
		const noteId = this.props.match.params.noteId;
    return (
      <div className={"container-fluid min-vh-100 " + (this.state.darkMode ? 'darkmode' : '' )}>

				{noteId === 'about' ?
				<>
					<div className="sidebar">
						<Link to={'/' + cuid.slug()} className={"opener d-block btn float-right btn-outline-"+ (this.state.darkMode ? 'light' : 'primary' )}>
							<span className="d-none d-sm-inline">Create A Note </span>
							<span className="d-inline d-sm-none"> + </span>
						</Link>
					</div>
					{!!this.state.hasNotes &&
						<Link to={'/'} className="myNotesMenu d-none d-sm-inline">
							<span className={"opener d-block btn float-right btn-outline-"+ (this.state.darkMode ? 'light' : 'primary' )}>
								{' '}&nbsp;&nbsp;&nbsp;&nbsp;My Notes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
							</span>
						</Link>
					}
					</>
				:
					<Link to={'/'} className="myNotesMenu">
						<span className="menu-bar" />
						<span className="menu-bar" />
						<span className="menu-bar" />
					</Link>
				}

        <div className="container min-vh-100">
          <div id="page-row" className="row min-vh-100">
            <div className={"col main-page " + (this.state.isOpen && noteId !== 'about' ? 'opened-sidebar' : '')}>
							{noteId === 'about' ?
							<About /> :

							<Editable
                {...this.props}
                ref={this.editable}
                html={this.state.html}
                onChange={this.handleChange}
                toggleMode={this.toggleMode}
                onSideBar={this.handleOpenClose} />
							}
            </div>
          </div>
        </div>
				{noteId !== 'about' &&
        	<Sidebar
						darkMode={this.state.darkMode}
						sendEvent={this.sendEvent}
						onSideBar={this.handleOpenClose}
						isOpen={this.state.isOpen} />
				}
      </div>
    )
  }
}

export default IndexPage
