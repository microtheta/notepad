import React from 'react';

export default class About extends React.Component {
  render() {
    return (
      <div id="editable" placeholder="Type here..." data-gramm_editor="false" style={{minHeight: '100%', outline: '0px', padding: '20px'}}>
				<h1 style={{textAlign: 'center'}}>Welcome to MicroTheta Notepad</h1>
				<div style={{textAlign: 'center'}}>This is a simple yet powerful notepad.<br /></div>
				<div style={{textAlign: 'center'}}>
					<div style={{}}><br /></div>
					<div style={{}}>This notepad stores all your data in your browser only and it works offline too!</div>
					<div style={{}}>So, anything you write in this notepad gets backed up to your browser, and it’s always there even if you restart your browser or if it happens to crash.</div>
					<div style={{}}><span style={{textAlign: 'left'}}>No login required or sign up required.</span><br /></div>
					<div style={{}}><br /></div>
					<h3 style={{}}>Select {' '}<b>
						<span className="d-none d-sm-inline">Create A Note </span>
						<span className="d-inline d-sm-none"> + </span> {' '}
						</b>
						 at top right corner of the page to to start taking notes.</h3>
					<h3 style={{}}>&nbsp; &nbsp;</h3>
					<h1 style={{}}>FAQs</h1>
					<div><br /></div>
					<h3>Q: Where is my data stored?</h3>
					<p style={{}}>Your data is stored in your browser's local storage, and it doesn't go out of control!</p>
					<p style={{}}><br /></p>
					<h3>Q: Can you read my notes?</h3>
					<p>Absolutely Not! We can't access your data (neither want to!). As Data privacy is the core of this app and your data is not sent to any remote server. Your data's access is limited to you only.</p>
					<p><br /></p>
					<h3>Q: Can I format my notes?</h3>
					<p>Yeah! This notepad has got rich text editing support. You can format your notes using predefined keyboard shortcuts or by clicking an item from sidebar menu. You can access this sidebar and text formatting related help by selecting "?" at top right corner of the page when you are editing a note.</p>
					<h3><br className="Apple-interchange-newline" />Q: How do you charge for this? What are your pricing plans?</h3>
					<p>Free! There are no pricing involved (direct or indirect) to use this app. It's free and always will be.</p>
					<h3><br className="Apple-interchange-newline" />Q: I found an issue / I want to request a feature / I want to give feedback.</h3>
					<p>Sure! We would love to know about that. Your feedback is most valuable to us. You can write us at:&nbsp; mahesh@microtheta.com</p>
					<p><br /></p>
				</div>
			</div>
    )
  }
}
