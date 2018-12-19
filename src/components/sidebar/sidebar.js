import React from 'react';

import './sidebar.scss';

export default class Sidebar extends React.Component {


  render() {
    const {isOpen, onSideBar} = this.props;
    let cmKey = 'ctrl';
    if(window.navigator && window.navigator.userAgent.indexOf("Mac") > -1 ) {
      cmKey = 'cmd';
    }
    return (
      <div className="sidebar">
        <div onClick={onSideBar} className={"opener icon-text " + (isOpen ? 'close': '')}> ? </div> 
        
        <div className={"sidebar-container " + (isOpen ? 'open': '')}>

          <ul className="list-group list-group-flush">
            

            <li className="list-group-item list-group-item-action py-2 bg-light sticky-top">
              <span>Quick Edit</span>
              <div className="float-right icon-text close-icon" onClick={onSideBar}>&times;</div>
            </li>

            <li className="list-group-item list-group-item-action py-2">
              <kbd><kbd>{cmKey}</kbd>+<kbd>b</kbd></kbd>
              <b className="float-right">Bold</b>
            </li>
            <li className="list-group-item list-group-item-action py-2">
              <kbd><kbd>{cmKey}</kbd>+<kbd>i</kbd></kbd>
              <i className="float-right">Italics</i>
            </li>
            <li className="list-group-item list-group-item-action py-2">
              <kbd><kbd>{cmKey}</kbd>+<kbd>u</kbd></kbd>
              <u className="float-right">Underline</u>
            </li>
            <li className="list-group-item list-group-item-action py-2">
              <kbd><kbd>{cmKey}</kbd>+<kbd>shift</kbd>+<kbd>x</kbd></kbd>
              <div style={{textDecorationLine: 'line-through'}}className="float-right">Strikethrough</div>
            </li>

            <li className="list-group-item list-group-item-action py-2">
              <kbd><kbd>{cmKey}</kbd>+<kbd>shift</kbd>+<kbd>l</kbd></kbd>
              <div className="float-right">Left Align</div>
            </li>
            <li className="list-group-item list-group-item-action py-2">
              <kbd><kbd>{cmKey}</kbd>+<kbd>shift</kbd>+<kbd>c</kbd></kbd>
              <div className="float-right">Center Align</div>
            </li>
            <li className="list-group-item list-group-item-action py-2">
              <kbd><kbd>{cmKey}</kbd>+<kbd>shift</kbd>+<kbd>r</kbd></kbd>
              <div className="float-right">Right Align</div>
            </li>

            <li className="list-group-item list-group-item-action py-2">
              <kbd><kbd>tab</kbd></kbd>
              <div className="float-right">Indent</div>
            </li>
            <li className="list-group-item list-group-item-action py-2">
              <kbd><kbd>shift</kbd>+<kbd>tab</kbd></kbd>
              <div className="float-right">Outdent</div>
            </li>
            
            <li className="list-group-item list-group-item-action py-2">
              <kbd><kbd>{cmKey}</kbd>+<kbd>shift</kbd>+<kbd>o</kbd></kbd>
              <div className="float-right">Bulleted List</div>
            </li>
            <li className="list-group-item list-group-item-action py-2">
              <kbd><kbd>{cmKey}</kbd>+<kbd>shift</kbd>+<kbd>i</kbd></kbd>
              <div className="float-right">Numbered List</div>
            </li>


            <li className="list-group-item list-group-item-action py-2">
              <kbd><kbd>{cmKey}</kbd>+<kbd>p</kbd></kbd>
              <div className="float-right">Print</div>
            </li>
            <li className="list-group-item list-group-item-action py-2">
              <kbd><kbd>{cmKey}</kbd>+<kbd>z</kbd></kbd>
              <div className="float-right">Undo</div>
            </li>
            <li className="list-group-item list-group-item-action py-2">
              <kbd><kbd>{cmKey}</kbd>+<kbd>y</kbd></kbd>
              <div className="float-right">Redo</div>
            </li>

          </ul>

        </div>
      </div>
    )
  }
}