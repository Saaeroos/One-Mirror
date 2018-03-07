import React, { Component } from 'react';
import axios from 'axios';
import '../styles/AdminStReg.css';
import AdminNav from './AdminNav';

class AdminStReg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                firstName: '',
                lastName: '',
                password: '',
                dateOfBirth: '',
                email: '',
                shortDescription: '',
                status: '',
                video: '',
                ID: '',
                photo: null,
                linkedinLink: '',
                githubLink: '',
                hackerRankLink: '',
                CVlink: ''
            },
            error: {
                firstName: '',
                lastName: '',
                password: '',
                dateOfBirth: '',
                email: '',
                shortDescription: '',
                status: '',
                ID: '',
                photo: '',
            },
            success: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePhotoChange = this.handlePhotoChange.bind(this);
        this.generateID = this.generateID.bind(this);
        this.generatePassword = this.generatePassword.bind(this);
        //  this.addBadges = this.addBadges.bind(this);
    }

    handlePhotoChange(event) {
        var formData = this.state.data;
        formData[event.target.name] = event.target.files[0]
        this.setState({ data: formData })

    }
    handleChange(element) {
        var formData = this.state.data;
        formData[element.target.name] = element.target.value;
        this.setState({
            data: formData
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        let _this = this;

        let formData = new FormData();
        formData.append('firstName', this.state.data.firstName);
        formData.append('lastName', this.state.data.lastName);
        formData.append('password', this.state.data.password);
        formData.append('dateOfBirth', this.state.data.dateOfBirth);
        formData.append('email', this.state.data.email);
        formData.append('shortDescription', this.state.data.shortDescription);
        formData.append('status', this.state.data.status);
        formData.append('video', this.state.data.video);
        formData.append('ID', this.state.data.ID);
        formData.append('photo', this.state.data.photo);
        formData.append('linkedinLink', this.state.data.linkedinLink);
        formData.append('githubLink', this.state.data.githubLink);
        formData.append('hackerRankLink', this.state.data.hackerRankLink);
        formData.append('CVlink', this.state.data.CVlink);
        formData.append('StudentClass', this.state.data.StudentClass);

        axios.post("http://localhost:8080/api/student/register", formData)
            .then(res => {
                console.log(res.data);
                if (res.data.errors) {
                    let mainErr = res.data.errors;
                    let errMsg = {
                        firstName: mainErr.firstName ? mainErr.firstName.msg : '',
                        lastName: mainErr.lastName ? mainErr.lastName.msg : '',
                        password: mainErr.password ? mainErr.password.msg : '',
                        dateOfBirth: mainErr.dateOfBirth ? mainErr.dateOfBirth.msg : '',
                        email: mainErr.email ? mainErr.email.msg : '',
                        shortDescription: mainErr.shortDescription ? mainErr.shortDescription.msg : '',
                        status: mainErr.status ? mainErr.status.msg : '',
                        ID: mainErr.ID ? mainErr.ID.msg : '',
                        photo: mainErr.photo ? mainErr.photo.msg : ''
                    };
                    _this.setState({
                        error: errMsg
                    });
                } else {
                    _this.setState({
                        data: {
                            firstName: '',
                            lastName: '',
                            password: '',
                            dateOfBirth: '',
                            email: '',
                            shortDescription: '',
                            status: '',
                            video: '',
                            ID: '',
                            linkedinLink: '',
                            githubLink: '',
                            hackerRankLink: '',
                            CVlink: '',
                            studentClasses :"",
                        },
                        error: {
                            firstName: '',
                            lastName: '',
                            password: '',
                            dateOfBirth: '',
                            email: '',
                            shortDescription: '',
                            status: '',
                            ID: '',
                            photo: '',
                        },
                        success: 'Student Registered successfully'
                    })
                }
            })
            .catch(error => console.log(error))
    }
    generateID(event) {
        event.preventDefault();

        let newData = this.state.data;
        newData.ID = "ID" + Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);

        this.setState({ data: newData });
    }
    generatePassword(event){
        event.preventDefault();
        let length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            pass = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        pass += charset.charAt(Math.floor(Math.random() * n));
    }
        let newData = this.state.data;
        newData.password = pass;
        this.setState({ data: newData })
    }
    // addBadges(event){
    //   event.preventDefault();
    //   axios.post("http://localhost:8080/api/student/addbadge",this.state.data.
    // }

    componentDidMount(){
        let _this = this;
        axios.get("http://localhost:8080/api/admin/student/class/list")
            .then((response) => {
                console.log(response);
                if (response.data.error) {
                    _this.setState({ loading: false })
                } else {
                    _this.setState({ studentClasses: response.data, loading: false })
                }
            })
            .catch((error) => {
                console.log(error)
            })

    }
    render() {
        return (
            <div className="register-std">

                <AdminNav />

                <h1>Student Register</h1>


                {this.state.success && <p>{this.state.success}</p>
                }





                <div>
                    <form onSubmit={this.handleSubmit} className="register-form">
                        <div className="left-side">
                            <div className="form-group">
                                <label htmlFor="exampleInputFirstName">First Name</label>
                                <input type="text" name="firstName" value={this.state.data.firstName} onChange={this.handleChange} className="form-control" id="exampleInputFirstName" placeholder="First Name" />
                            </div>
                            <p className="text-danger">{this.state.error.firstName}</p>
                            <div className="form-group">
                                <label htmlFor="exampleInputLastName">Last Name</label>
                                <input type="text" name="lastName" value={this.state.data.lastName} onChange={this.handleChange} className="form-control" id="exampleInputLastName" placeholder="Last Name" />
                            </div>
                            <p className="text-danger">{this.state.error.lastName}</p>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword"></label>
                                <button className="btn btn-success" onClick={this.generatePassword}>Generate Password</button>
                                <input type="text"  value={this.state.data.password} onChange={this.handleChange} className="form-control" id="exampleInputPassword" placeholder="Password" />
                            </div>
                            <p className="text-danger">{this.state.error.password}</p>

                            <div className="form-group">
                                <label htmlFor="exampleInputDateOfBirth">Date of Birth</label>
                                <input type="date" name="dateOfBirth" value={this.state.dateOfBirth} onChange={this.handleChange} className="form-control" id="exampleInputDateOfBirth" />
                            </div>
                            <p className="text-danger">{this.state.error.dateOfBirth}</p>

                            <div className="form-group">
                                <label htmlFor="exampleInputEmail">Student Email</label>
                                <input type="email" name="email" value={this.state.data.email} onChange={this.handleChange} className="form-control" id="exampleInputEmail" placeholder="Student Email" />
                            </div>
                            <p className="text-danger">{this.state.error.email}</p>
                            <div className="form-group">
                                <label htmlFor="exampleInputShortDescription">Short Description</label>
                                <textarea type="text" name="shortDescription" value={this.state.data.shortDescription} onChange={this.handleChange} className="form-control" id="exampleInputShortDescription" placeholder="Description"></textarea>
                            </div>
                            <p className="text-danger">{this.state.error.shortDescription}</p>


                            <div className="form-group">
                                <label htmlFor="exampleInputStatus">Status</label>
                                <select className="form-control" name="status" id="exampleInputStatus" onChange={this.handleChange} value={this.state.data.status}>
                                    <option key={1} value='on probation'>on probation</option>
                                    <option key={2} value='graduated'>graduated</option>
                                    <option key={3} value='dropout'>dropout</option>
                                </select>
                                
                                <p className="text-danger">{this.state.error.status}</p>

                            </div>

                        </div>
                        <div className="right-side">
                            <div className="form-group">
                                <label htmlFor="exampleInputPhoto">Profile Photo</label>
                                <input type="file" name="photo" accept="image/*" onChange={this.handlePhotoChange} className="form-control" id="exampleInputPhoto" placeholder="Photo" />
                            </div>
                            <p className="text-danger">{this.state.error.photo}</p>
                            <div className="form-group">
                                <label htmlFor="exampleInputVideo">Video Link</label>
                                <input type="text" name="video" value={this.state.video} onChange={this.handleChange} className="form-control" id="exampleInputVideo" placeholder="Personal Video Link" />
                            </div>
                            <p className="text-danger">{this.state.error.video}</p>
                            <div className="form-group">
                                <label htmlFor="exampleInputID"></label>
                                <button className="btn btn-success" onClick={this.generateID}>Generate ID</button>
                                <input type="text" value={this.state.data.ID} onChange={this.handleChange} className="form-control" id="exampleInputID" placeholder="StudentID" />
                            </div>
                            <p className="text-danger">{this.state.error.ID}</p>
                            <div className="form-group">
                                <label htmlFor="exampleInputLindeinLink">Linkedin Link</label>
                                <input type="text" name="linkedinLink" value={this.state.data.linkedinLink} onChange={this.handleChange} className="form-control" id="exampleInputLindeinLink" placeholder="Student Linkedin (optinal)" />
                            </div>
                            <p></p>
                            <div className="form-group">
                                <label htmlFor="exampleInputGithubLink">Github Link</label>
                                <input type="text" name="githubLink" value={this.state.data.githubLink} onChange={this.handleChange} className="form-control" id="exampleInputGithubLink" placeholder="Github Link (optinal)" />
                            </div>
                            <p></p>
                            <div className="form-group">
                                <label htmlFor="exampleInputhackerRankLink">HackerRank Link</label>
                                <input type="text" name="hackerRankLink" value={this.state.data.hackerRankLink} onChange={this.handleChange} className="form-control" id="exampleInputhackerRankLink" placeholder="Hacker Rank Link (optinal)" />
                            </div>
                            <p></p>
                            <div className="form-group">
                                <label htmlFor="exampleInputCVlink">CV Link</label>
                                <input type="text" name="CVlink" value={this.state.data.CVlink} onChange={this.handleChange} className="form-control" id="exampleInputCVlink" placeholder="CV Link (optinal)" />
                            </div>
                            <p></p>

                        </div>
                        <p className="text-success">{this.state.success}</p>

                        <div className="form-group">
                            <label htmlFor="StudentClass">Student class</label>

                            <select name="StudentClass" id="StudentClass" onChange={this.handleChange} value={this.state.data.StudentClass}>
                                {/* <option key={1} value='on probation'>on probation</option> */}
                                {this.state.studentClasses && this.state.studentClasses.map(function (studentClass) {
                                    return (
                                        <option key={studentClass._id} value={studentClass._id}>{studentClass.name}</option>
                                    )
                                })}

                            </select>
                            <p className="text-danger">{this.state.error.status}</p>

                        </div>

                        <button type="submit" className="btn btn-primary subbut">Submit</button>


                    </form>
                </div>

                <br />
                <br />

            </div>
        );
    }
}

export default AdminStReg;
