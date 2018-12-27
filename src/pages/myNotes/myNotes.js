import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';
import cuid from 'cuid';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

export default class MyNotes extends React.Component {
  constructor(props) {
    super(props);
    const myNotes = JSON.parse(localStorage.getItem('myNotes'));
    const allNotes = Object.keys(myNotes).map((noteId) => {
      const note = myNotes[noteId];
      note.noteId = noteId;
      return note;
    });
    allNotes.sort((a, b) => {
      if (moment(a.lastUpdated).isBefore(b.lastUpdated)) {
        return 1;
      } else if (moment(a.lastUpdated).isAfter(b.lastUpdated)) {
        return -1;
      }
      return 0;
    })
    this.state = {
      myNotes: [...allNotes],
      sortedNotes: allNotes,
      view: localStorage.getItem('preferredView') || 'grid',
      searchText: localStorage.getItem('searchText') || '',
    }
    if (window.gtag) {
      window.gtag('config', 'UA-72768481-3');
    }
  }

  setView = (view) => {
    this.setState({
      view
    });
    localStorage.setItem('preferredView', view);
  }

  handleSearch = (e) => {
    const searchText = e.target.value;
    const {myNotes} = this.state;
    const sortedNotes = myNotes.filter((note) => {
      return (note.note.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
    });
    sortedNotes.sort((a, b) => {
      if (moment(a.lastUpdated).isBefore(b.lastUpdated)) {
        return 1;
      } else if (moment(a.lastUpdated).isAfter(b.lastUpdated)) {
        return -1;
      }
      return 0;
    })
    this.setState({
      searchText,
      sortedNotes
    });
    localStorage.setItem('searchText', searchText);
  }

  handleDelete = (noteId) => {
    const cnf = window.confirm('This can not be undone! Are you sure?');
    if (cnf) {
      const { myNotes } = this.state;
      delete myNotes[noteId];
      this.setState({
        myNotes
      })
      localStorage.setItem('myNotes', JSON.stringify(myNotes))
    }
  }

  render() {
    const { sortedNotes, /* view, */ searchText } = this.state;
    if (!sortedNotes) {
      return (
        <Redirect to={{ pathname: "/1" }} />
      )
    }

    return (
      <div className="container">
        <div className="row sticky-top">

          <div className="container bg-white pt-3 mb-1 ">
            <h2 className="float-left text-dark">My Notes</h2>
            <Link to={'/' + cuid.slug()} className="btn btn-outline-primary float-right">Create New</Link>
            <div className="clearfix" />
            <div className="form-group row mb-1 mt-4">
              <div className="col row m-0">
                <input type="text" className="form-control col" value={searchText} onChange={this.handleSearch} placeholder="Search..." />

                {/* <div className="btn-group col-4 col-sm-2 pr-0" role="group" aria-label="Basic example">
                  
                <button type="button" 
                  onClick={() => this.setView('grid')}
                  className={"btn btn-outline-secondary grid-view-menu " + (view === 'grid' ? 'active' : '')}>
                    <span href="" className="grid-icon grid-icon--line2">
                      <span className="layer layer--primary">
                        <span></span><span></span>
                      </span>
                      <span className="layer layer--secondary">
                        <span></span><span></span>
                      </span>
                    </span>
                  </button>
                  
                  <button type="button"
                    onClick={() => this.setView('list')}
                    className={"btn btn-outline-secondary list-view-menu " + (view === 'list' ? 'active' : '')}>
                    <span className="text-center ">
                      <span className="menu-bar" />
                      <span className="menu-bar" />
                      <span className="menu-bar" />
                    </span>
                  </button>
                  
                </div>
                 */}
              </div>
            </div>
          </div>

        </div>
        <div className="row">
          <TransitionGroup enter component={null}>
            {
              sortedNotes.map((note) => (
                <CSSTransition
                  key={note.noteId}
                  timeout={500}
                  classNames="fade"
                >
                  <div className="col-6 col-sm-4 col-md-3 my-3" key={note.noteId}>
                    <div className="card h-100">
                      <div className="card-body p-0" style={{ height: 150, overflow: 'hidden' }}>
                        <Link to={'/' + note.noteId} className="list-group-item p-2 list-group-item-action border-0 h-100">
                          <div dangerouslySetInnerHTML={{ __html: note.note }} style={{ transform: 'scale(0.5)', transformOrigin: '10px 10px', width: '200%' }} />
                        </Link>
                      </div>
                      <div className="card-footer bg-white text-dark px-2 py-1">
                        <small title="Last updated">{moment(note.lastUpdated).format('MMM DD, YYYY hh:MM A')}</small>
                        <img title="Delete note" onClick={() => this.handleDelete(note.noteId)} alt="Delete" src="/images/article.svg" style={{ height: 16, cursor: 'pointer', marginTop: 3 }} className="float-right" />
                      </div>
                    </div>
                  </div>
                </CSSTransition>
              ))
            }
          </TransitionGroup>
        </div>
      </div>
    )
  }
}