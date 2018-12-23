import React from 'react';
import './contentEditable.scss';
import cuid from 'cuid';

class Editable extends React.Component {

  constructor(props) {
    super(props);
    this.editable = React.createRef();
  }

  shouldComponentUpdate = (nextProps) => {
    return nextProps.html !== this.editable.current.innerHTML;
  }

  emitChange = () => {
    var html = this.editable.current.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {

      this.props.onChange({
        target: {
          value: html
        }
      });
    }
    this.lastHtml = html;
  }

  componentDidMount() {
    this.setEndOfContenteditable();
    //this.editable.current.addEventListener("keydown", this.eventHandler, false);
    window.document.addEventListener("keydown", this.eventHandler, false);
  }

  componentWillUnmount() {
    window.document.removeEventListener("keydown", this.eventHandler)
  }

  eventHandler = (e) => {
    if (e.altKey && (e.metaKey || e.ctrlKey)) {
      switch (e.keyCode) {
        case 48 || (48+48): 
          this.execCommand(e, 'formatblock', 'div');
          return;
        case 49 || (49+48): 
          this.execCommand(e, 'formatblock', 'h1');
          return;
        case 50 || (50+48): 
          this.execCommand(e, 'formatblock', 'h2');
          return;
        case 51 || (51+48): 
          this.execCommand(e, 'formatblock', 'h3');
          return;
        case 52 || (52+48): 
          this.execCommand(e, 'formatblock', 'h4');
          return;
        case 53 || (53+48): 
          this.execCommand(e, 'formatblock', 'h5');
          return;
        case 54 || (54+48): 
          this.execCommand(e, 'formatblock', 'h6');
          return;
        default: 

      }
    }
    if (e.shiftKey && (e.metaKey || e.ctrlKey) && !e.altKey) {
      switch (e.key.toLowerCase()) {
        case 'c':
          this.execCommand(e, 'justifycenter');
          return;
        case 'l':
          this.execCommand(e, 'justifyleft');
          return;
        case 'r':
          this.execCommand(e, 'justifyright');
          return;
        case 'a':
          this.execCommand(e, 'removeFormat');
          return;
        case 'o':
          this.execCommand(e, 'insertunorderedlist');
          return;
        case 'i':
          this.execCommand(e, 'insertorderedlist');
          return;
        case 'x':
          this.execCommand(e, 'strikethrough');
          return;
        default:
      }
    }

    if (!e.shiftKey && (e.metaKey || e.ctrlKey) && !e.altKey) {
      switch (e.key) {
        case 'p':
          this.printDoc(e);
          return;
        case 'o':
          this.goToMyNotes(e);
          return;
        case 'k':
          this.createNew(e);
          return;
        case 'h':
          e.preventDefault();
          this.props.onSideBar(e);
          return;
        case 'b':
          this.execCommand(e, 'bold');
          return;
        case 'i':
          this.execCommand(e, 'italic');
          return;
        case 'u':
          this.execCommand(e, 'underline');
          return;
        case 'z':
          this.execCommand(e, 'undo');
          return;
        case 'y':
          this.execCommand(e, 'redo');
          return;
        default:
      }
    }

    if (e.shiftKey) {
      switch (e.key) {
        case 'Tab':
          this.execCommand(e, 'outdent');
          return;
        default:
      }
    }

    switch (e.key) {
      case 'Tab':
        this.execCommand(e, 'indent');
        return;
      default:
    }

  }

  setEndOfContenteditable = () => {
    const contentEditableElement = this.editable.current;
    var range, selection;
    if (document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
      range = document.createRange();//Create a range (a range is a like the selection but invisible)
      range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
      range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
      selection = window.getSelection();//get the selection object (allows you to change selection)
      selection.removeAllRanges();//remove any selections already made
      selection.addRange(range);//make the range you have just created the visible selection
    }
    else if (document.selection)//IE 8 and lower
    {
      range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
      range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
      range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
      range.select();//Select the range (make it the visible selection
    }
  }


  execCommand = (e, cmd = '', val = null) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    window.document.execCommand('StyleWithCSS');
    window.document.execCommand(cmd, false, val);
    // this.editable.current.focus();
    // this.setEndOfContenteditable();
  }

  printDoc = (e) => {
    if (window.print) {
      e.preventDefault();
      /* window.document.title = "My Notes";
      window.print(); */
      const oPrntWin = window.open("", "_blank", "width=960,height=600,left=200,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
      if(oPrntWin) {
        oPrntWin.document.open();
        oPrntWin.document.write("<!doctype html><html><head><title>My Notes</title></head><body onload=\"print();\">" + this.editable.current.innerHTML + "</body></html>");
        oPrntWin.document.close();
      }
    }
  }

  goToMyNotes = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }

  createNew = (e) => {
    e.preventDefault();
    this.props.history.push('/'+cuid.slug());
  }

  render() {
    return (
      <div
        ref={this.editable}
        id="editable"
        placeholder="Type here..."
        style={{ minHeight: '100%', outline: 0, padding: 20 }}
        onInput={this.emitChange}
        onBlur={this.emitChange}
        contentEditable="true"
        data-gramm_editor="false"
        dangerouslySetInnerHTML={{ __html: this.props.html }}></div>
    )
  }
}

export default Editable;