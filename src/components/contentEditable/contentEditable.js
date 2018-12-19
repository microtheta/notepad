import React from 'react';
import './contentEditable.css';

export default class Editable extends React.Component {

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
    window.focus();
    this.editable.current.focus();
    this.editable.current.addEventListener("keydown", this.eventHandler, false);
  }

  eventHandler = (e) => {

    if (e.shiftKey && (e.metaKey || e.ctrlKey)) {
      switch (e.key) {
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
          this.execCommand(e, 'insertorderedlist');
          return;
        case 'i':
          this.execCommand(e, 'insertunorderedlist');
          return;
        case 'x':
          this.execCommand(e, 'strikethrough');
          return;
        default:
      }
    }

    if (e.metaKey || e.ctrlKey) {
      switch (e.key) {
        case 'p':
          this.printDoc(e);
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

  execCommand = (e, cmd = '', val=null) => {
    e.preventDefault();
    window.document.execCommand('StyleWithCSS');
    window.document.execCommand(cmd, false, val);
    this.editable.current.focus();
  }

  printDoc = (e) => {
    if (window.print) {
      e.preventDefault();
      window.document.title = "My Notes";
      window.print();
    }
    /* console.log(this.lastHtml)
    var oPrntWin = window.open("","_blank","width=960,height=600,left=200,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
    oPrntWin.document.open();
    oPrntWin.document.write("<!doctype html><html><head><title>My Notes</title></head><body onload=\"print();\">" + this.editable.current.innerHTML + "</body></html>");
    oPrntWin.document.close(); */
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