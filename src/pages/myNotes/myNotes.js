import React from 'react';
import { Redirect, Link } from 'react-router-dom'; 
import moment from 'moment';
import cuid from 'cuid';

export default class MyNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myNotes: JSON.parse(localStorage.getItem('myNotes'))
    }
  }

  handleDelete = (noteId) => {
    const cnf = window.confirm('This can not be undone! Are you sure?');
    if(cnf) {
      const {myNotes} = this.state;
      delete myNotes[noteId];
      this.setState({
        myNotes
      })
      localStorage.setItem('myNotes', JSON.stringify(myNotes))
    }
  }

  render() {
    const {myNotes} = this.state;
    if(!myNotes) {
      return(
        <Redirect to={{ pathname: "/1"}} />
      )
    }
    const allNotes = Object.keys(myNotes).map((noteId) => {
        const note = myNotes[noteId];
        note.noteId = noteId;
        return note;
    });
    allNotes.sort((a, b) => {
      if(moment(a.lastUpdated).isBefore(b.lastUpdated)) {
        return 1;
      } else if(moment(a.lastUpdated).isAfter(b.lastUpdated)){
        return -1;
      }
      return 0;
    })
    return(
      <div className="container">
        <div className="row">
          <div className="container bg-white pt-3 mb-2 fixed-top">
            <h2 className="float-left text-secondary">My Notes</h2>
              <Link to={'/'+cuid.slug()} className="btn btn-outline-primary float-right">Create New</Link>
            <div className="clearfix" />
            <hr className="mb-0" />
          </div> 

          <div className="col bg-white pt-3 mb-2">
            <h2 className="float-left text-secondary">My Notes</h2>
              <Link to={'/'+cuid.slug()} className="btn btn-outline-primary float-right">Create New</Link>
            <div className="clearfix" />
            <hr className="mb-0" />
          </div> 


        </div>
        <div className="row">
          {
            allNotes.map((note) => (
              <div className="col-6 col-sm-4 col-md-3 my-3" key={note.noteId}>
                <div className="card h-100">
                  <div className="card-body p-0" style={{height: 150, overflow:'hidden'}}>
                    <Link to={'/'+note.noteId} className="list-group-item p-2 list-group-item-action border-0 h-100">
                      <div dangerouslySetInnerHTML={{__html:note.note}} style={{transform: 'scale(0.5)', transformOrigin: '10px 10px', width: '200%'}}/>
                    </Link>
                  </div>
                  <div  className="card-footer bg-transparent text-secondary px-2 py-1">
                    <small title="Last updated">{moment(note.lastUpdated).format('MMM DD,YYYY hh:MM A')}</small>
                    <img title="Delete note" onClick={() => this.handleDelete(note.noteId)} alt="Delete" src="/images/article.svg" style={{height: 20, cursor: 'pointer', marginTop: 4}} className="float-right" />
                  </div>
                </div>
              </div>
            ))
          }
          
        </div>
      </div>
    )
  }
}