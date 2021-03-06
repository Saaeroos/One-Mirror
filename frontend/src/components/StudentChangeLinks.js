import React, { Component } from 'react';
import axios from 'axios';
import '../styles/StudentchangeLinks.css';
import Header from './Header';
import Footer from './Footer';

class StudentChangeLinks extends Component {
  constructor(props){
    super(props)

    this.state = {
      data: {
        githubLink: this.props.location.state.student.Github_link,
        hackerrankLink : this.props.location.state.student.hackerRank_link,
        linkedinLink: this.props.location.state.student.LinkedIn_link,
        cvLink: this.props.location.state.student.CV_link
      },
      msg : {
        giterr:'',
        hackerr: '',
        linked: '',
        cv: ''
      },
      success: null,
      student: this.props.location.state.student

  }

    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleUpdateLinks = this.handleUpdateLinks.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }
  handleLinkChange(element){

    var formData = this.state.data;
        formData[element.target.name] = element.target.value;
        this.setState({
          data : formData
        });

  }

  handleUpdateLinks(event){
    event.preventDefault();
    let _this = this;

    axios.post("http://localhost:8080/student/changelinks", {
      StudentID: this.props.location.state.student.StudentID,
      Github_link: this.state.data.githubLink,
      LinkedIn_link: this.state.data.linkedinLink,
      hackerRank_link: this.state.data.hackerrankLink,
      CV_link: this.state.data.cvLink
    }).then(function(response){
      console.log("before response");
      console.log(response.data)
      console.log("after response");
      _this.setState({
        msg: {
          giterr:'',
          hackerr: '',
          linked: '',
          cv: ''
        },
        success: 'The links has been updated successfully',
        student: response.data

      })
    }).catch(function(error){
      console.log(error);
    });
  }

  handleBackClick(){

    this.props.history.push(
      { pathname: '/student/Dashboard',
        state: {student : this.state.student}
    })
  }

  render() {
    return (
      <div>
        <Header />
      <a className="btn btn-primary changeReqBackBtn" onClick={this.handleBackClick}>Back</a>
      <h1> change them links </h1>
      <span className="text-success">{this.state.success}</span>
      <form onSubmit={this.handleUpdateLinks}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Github Link</label>
          <input onChange={this.handleLinkChange} type="text" name="githubLink" value={this.state.data.githubLink} className="form-control" id="githublinkchange"  />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">HackerRank Link</label>
          <input onChange={this.handleLinkChange} type="text" name="hackerrankLink" value={this.state.data.hackerrankLink} className="form-control" id="hackerranklinkchange"  placeholder="HackerRank Link" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">LinkedIn Link</label>
          <input onChange={this.handleLinkChange} type="text" name="linkedinLink" value={this.state.data.linkedinLink} className="form-control" id="linkedinlinkchange"  placeholder="LinkedIn Link" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">CV Link</label>
          <input onChange={this.handleLinkChange} type="text" name="cvLink" value={this.state.data.cvLink} className="form-control" id="googlecalenderlinkchange"  placeholder="Google Calender" />
        </div>

        <button type="submit" className="btn btn-primary changelinkbtn">Submit</button>

      </form>
      <Footer />
      </div>
    )
  }
}

export default StudentChangeLinks;
