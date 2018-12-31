import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';
import cuid from 'cuid';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import './myNotes.scss';


export default class MyNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedNotes: this.getSortedSearchNotes(localStorage.getItem('searchText') || ''),
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
    const sortedNotes = this.getSortedSearchNotes(searchText);
    this.setState({
      searchText,
      sortedNotes
    });
    localStorage.setItem('searchText', searchText);
  }

  handleDelete = (noteId) => {
    const cnf = window.confirm('This can not be undone! Are you sure?');
    if (cnf) {
      const myNotes = JSON.parse(localStorage.getItem('myNotes')) || {};
      delete myNotes[noteId];
      localStorage.setItem('myNotes', JSON.stringify(myNotes));
      const sortedNotes = this.getSortedSearchNotes();
      this.setState({
        sortedNotes
      });
    }
  }

  getSortedSearchNotes = (searchText=this.state.searchText) => {
    const myNotes = JSON.parse(localStorage.getItem('myNotes'));
    if(!myNotes) {
      return [];
    }
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
    
    const filteredNotes = allNotes.filter((note) => {
      return (note.note.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
    });
    return filteredNotes;
  }

  render() {
    const { sortedNotes, /* view, */ searchText } = this.state;
    if (!sortedNotes.length && !searchText) {
      return (
        <Redirect to={{ pathname: "/1" }} />
      )
    }

    return (
      <div className="container">
        <div className="row sticky-top bg-white pt-3 pb-1 mb-2">
          <div className="col-sm-2 col-4 d-none d-md-flex">
            <h2 className="text-dark m-0">My Notes</h2>
          </div>
              
              <div className="col pr-0">
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
              <div className="col-sm-3 col-md-2 col-4">
                <Link to={'/' + cuid.slug()} className="btn btn-outline-primary float-right">
                <span className="d-none d-sm-inline">Create </span>
                <span className="d-inline d-sm-none"> + </span>
                New</Link>
              </div>
            

        </div>
        
        <div className="row">
          <TransitionGroup enter component={null}>
            {
              sortedNotes.map((note) => (
                <CSSTransition
                  key={note.noteId}
                  timeout={300}
                  classNames="fade"
                >
                  <div className="col-6 col-sm-4 col-md-3 my-3" key={note.noteId}>
                    <div className="card h-100">
                      <div className="card-body p-0" style={{ height: 150, overflow: 'hidden' }}>
                        <Link to={'/' + note.noteId} className="list-group-item p-2 list-group-item-action border-0 h-100">
                          <div dangerouslySetInnerHTML={{ __html: note.note }} className="notes-container"/>
                        </Link>
                      </div>
                      <div className="card-footer bg-white text-dark px-2 py-1">
                      <div className="row m-0">
                        <small className="col p-0 text-truncate" title="Last updated" style={{lineHeight: '160%'}}>{moment(note.lastUpdated).format('MMM DD, YYYY hh:MM A')}</small>
                        <div className="col-1 p-0">
                          <img  title="Delete note" onClick={() => this.handleDelete(note.noteId)} alt="Delete" src={require("../../images/article.svg")} style={{ height: 16, cursor: 'pointer', marginTop: -3 }} />
                        </div>
                        </div>
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