import React from 'react';

import './sidebar.scss';

export default class Sidebar extends React.Component {

  sendEvent(key, ctrlKey, shiftKey, altKey, keyCode) {
    const eve = {
      preventDefault: () => {},
      key,
      keyCode,
      shiftKey,
      metaKey: ctrlKey,
      ctrlKey,
      altKey
    };
    this.props.sendEvent(eve);
  }

  preventDefault = (e) => {
    e.preventDefault();
  }

  render() {
    const { isOpen, onSideBar } = this.props;
    let cmKey = 'ctrl';
    if (window.navigator && window.navigator.userAgent.indexOf("Mac") > -1) {
      cmKey = 'cmd';
    }
    return (
      <div className="sidebar">
        <div
          onMouseDown={this.preventDefault}
          onClick={onSideBar} className={"opener icon-text " + (isOpen ? 'close' : '')}> ? </div>

        <div className={"sidebar-container " + (isOpen ? 'open' : '')}>

          <ul className="list-group list-group-flush">


            <li className={"list-group-item list-group-item-action sticky-top py-2 "+ (this.props.darkMode ? 'text-light bg-dark' : 'bg-light')}>
              <span>Quick Edit</span>
              <div 
                className="float-right icon-text close-icon"
                onMouseDown={this.preventDefault}
                onClick={onSideBar}>&times;</div>
            </li>

            <li 
              onClick={() => {this.sendEvent('h', true, false, false, 72)}}
              className={"list-group-item list-group-item-action py-2 pointer " +(this.props.darkMode ? 'darkmode' : '')}>
              <small className="d-block">
                <kbd><kbd>{cmKey}</kbd>+<kbd>h</kbd></kbd>
                <div className="float-right">Quick Edit Panel</div>
              </small>
            </li>

            <li 
              onClick={() => {this.sendEvent('o', true, false, false, 79)}}
              className={"list-group-item list-group-item-action py-2 pointer " +(this.props.darkMode ? 'darkmode' : '')}>
              <small className="d-block">
                <kbd><kbd>{cmKey}</kbd>+<kbd>o</kbd></kbd>
                <div className="float-right">My Notes</div>
              </small>
            </li>
            
            <li 
              onClick={() => {this.sendEvent('k', true, false, false, 75)}}
              className={"list-group-item list-group-item-action py-2 pointer " +(this.props.darkMode ? 'darkmode' : '')}>
              <small className="d-block">
                <kbd><kbd>{cmKey}</kbd>+<kbd>k</kbd></kbd>
                <div className="float-right">Create New</div>
              </small>
            </li>
            
            
            
            <li
              onMouseDown={this.preventDefault}
              onClick={() => {this.sendEvent('b', true, false, false, 66)}}
              className={"list-group-item list-group-item-action py-2 pointer " +(this.props.darkMode ? 'darkmode' : '')}>
              <small className="d-block">
                <kbd><kbd>{cmKey}</kbd>+<kbd>b</kbd></kbd>
                <b className="float-right">Bold</b>
              </small>
            </li>
            <li
              onMouseDown={this.preventDefault}
              onClick={() => {this.sendEvent('i', true, false, false, 73)}}
              className={"list-group-item list-group-item-action py-2 pointer " +(this.props.darkMode ? 'darkmode' : '')}>
              <small className="d-block">
                <kbd><kbd>{cmKey}</kbd>+<kbd>i</kbd></kbd>
                <i className="float-right">Italics</i>
              </small>
            </li>
            <li
              onMouseDown={this.preventDefault}
              onClick={() => {this.sendEvent('u', true, false, false, 85)}}
              className={"list-group-item list-group-item-action py-2 pointer " +(this.props.darkMode ? 'darkmode' : '')}>
              <small className="d-block">
                <kbd><kbd>{cmKey}</kbd>+<kbd>u</kbd></kbd>
                <u className="float-right">Underline</u>
              </small>
            </li>
            <li
              onMouseDown={this.preventDefault}
              onClick={() => {this.sendEvent('x', true, true, false, 88)}}
              className={"list-group-item list-group-item-action py-2 pointer " +(this.props.darkMode ? 'darkmode' : '')}>
              <small className="d-block">
                <kbd><kbd>{cmKey}</kbd>+<kbd>shift</kbd>+<kbd>x</kbd></kbd>
                <div style={{ textDecorationLine: 'line-through' }} className="float-right">Strikethrough</div>
              </small>
            </li>

            <li
              onMouseDown={this.preventDefault}
              onClick={() => {this.sendEvent('l', true, true, false, 76)}}
              className={"list-group-item list-group-item-action py-2 pointer " +(this.props.darkMode ? 'darkmode' : '')}>
              <small className="d-block">
                <kbd><kbd>{cmKey}</kbd>+<kbd>shift</kbd>+<kbd>l</kbd></kbd>
                <div className="float-right">Left Align</div>
              </small>
            </li>
            <li
              onMouseDown={this.preventDefault}
              onClick={() => {this.sendEvent('c', true, true, false, 67)}}
              className={"list-group-item list-group-item-action py-2 pointer " +(this.props.darkMode ? 'darkmode' : '')}>
              <small className="d-block">
                <kbd><kbd>{cmKey}</kbd>+<kbd>shift</kbd>+<kbd>c</kbd></kbd>
                <div className="float-right">Center Align</div>
              </small>
            </li>
            <li
              onMouseDown={this.preventDefault}
              onClick={() => {this.sendEvent('r', true, true, false, 82)}}
              className={"list-group-item list-group-item-action py-2 pointer " +(this.props.darkMode ? 'darkmode' : '')}>
              <small className="d-block">
                <kbd><kbd>{cmKey}</kbd>+<kbd>shift</kbd>+<kbd>r</kbd></kbd>
                <div className="float-right">Right Align</div>
              </small>
            </li>

            

            <li
              onMouseDown={this.preventDefault}
              onClick={() => {this.sendEvent('o', true, true, false, 79)}}
              className={"list-group-item list-group-item-action py-2 pointer " +(this.props.darkMode ? 'darkmode' : '')}>
              <small className="d-block">
                <kbd><kbd>{cmKey}</kbd>+<kbd>shift</kbd>+<kbd>o</kbd></kbd>
                <div className="float-right">Bulleted List</div>
              </small>
            </li>
            <li
              onMouseDown={this.preventDefault}
              onClick={() => {this.sendEvent('i', true, true, false, 73)}}
              className={"list-group-item list-group-item-action py-2 pointer " +(this.props.darkMode ? 'darkmode' : '')}>
              <small className="d-block">
                <kbd><kbd>{cmKey}</kbd>+<kbd>shift</kbd>+<kbd>i</kbd></kbd>
                <div className="float-right">Numbered List</div>
              </small>
            </li>

            <li
              onMouseDown={this.preventDefault}
              onClick={() => {this.sendEvent('', true, false, true, 49)}}
              className={"list-group-item list-group-item-action py-2 pointer " +(this.props.darkMode ? 'darkmode' : '')}>
              <small className="d-block">
                <kbd><kbd>{cmKey}</kbd>+<kbd>alt</kbd>+<kbd>1...6</kbd></kbd>
                <div className="float-right">Header 1...6</div>
              </small>
            </li>
            <li
              onMouseDown={this.preventDefault}
              onClick={() => {this.sendEvent('', true, false, true, 48)}}
              className={"list-group-item list-group-item-action py-2 pointer " +(this.props.darkMode ? 'darkmode' : '')}>
              <small className="d-block">
                <kbd><kbd>{cmKey}</kbd>+<kbd>alt</kbd>+<kbd>0</kbd></kbd>
                <div className="float-right">Normal Text</div>
              </small>
            </li>

            <li
              onMouseDown={this.preventDefault}
              onClick={() => {this.sendEvent('Tab', false, false, false, 9)}}
              className={"list-group-item list-group-item-action py-2 pointer " +(this.props.darkMode ? 'darkmode' : '')}>
              <small className="d-block">
                <kbd><kbd>tab</kbd></kbd>
                <div className="float-right">Indent</div>
              </small>
            </li>
            <li
              onMouseDown={this.preventDefault}
              onClick={() => {this.sendEvent('Tab', false, true, false, 9)}}
              className={"list-group-item list-group-item-action py-2 pointer " +(this.props.darkMode ? 'darkmode' : '')}>
              <small className="d-block">
                <kbd><kbd>shift</kbd>+<kbd>tab</kbd></kbd>
                <div className="float-right">Outdent</div>
              </small>
            </li>

            <li
              onMouseDown={this.preventDefault}
              onClick={() => {this.sendEvent('p', true, false, false, 80)}}
              className={"list-group-item list-group-item-action py-2 pointer " +(this.props.darkMode ? 'darkmode' : '')}>
              <small className="d-block">
                <kbd><kbd>{cmKey}</kbd>+<kbd>p</kbd></kbd>
                <div className="float-right">Print</div>
              </small>
            </li>
            <li 
              onMouseDown={this.preventDefault}
              onClick={() => {this.sendEvent('z', true, false, false, 90)}}
              className={"list-group-item list-group-item-action py-2 pointer " +(this.props.darkMode ? 'darkmode' : '')}>
              <small className="d-block">
                <kbd><kbd>{cmKey}</kbd>+<kbd>z</kbd></kbd>
                <div className="float-right">Undo</div>
              </small>
            </li>
            <li 
              onMouseDown={this.preventDefault}
              onClick={() => {this.sendEvent('y', true, false, false, 89)}}
              className={"list-group-item list-group-item-action py-2 pointer " +(this.props.darkMode ? 'darkmode' : '')}>
              <small className="d-block">
                <kbd><kbd>{cmKey}</kbd>+<kbd>y</kbd></kbd>
                <div className="float-right">Redo</div>
              </small>
            </li>

            <li 
              onMouseDown={this.preventDefault}
              onClick={() => {this.sendEvent('v', true, false, true, 86)}}
              className={"list-group-item list-group-item-action py-2 pointer " +(this.props.darkMode ? 'darkmode' : '')}>
              <small className="d-block">
                <kbd><kbd>{cmKey}</kbd>+<kbd>alt</kbd>+<kbd>v</kbd></kbd>
                <div className="float-right">Toggle visibility mode</div>
              </small>
            </li>

            <li 
              onMouseDown={this.preventDefault}
              className={"list-group-item list-group-item-action py-2 pointer " +(this.props.darkMode ? 'darkmode' : '')}>
              <a href="mailTo:mahesh@microtheta.com">
                <small className="d-block">
                  <kbd>mahesh@microtheta.com</kbd>
                  <div className="float-right">Feedback</div>
                </small>
              </a>
            </li>

          </ul>

        </div>
      </div>
    )
  }
}