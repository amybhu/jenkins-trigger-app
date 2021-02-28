import '../static/styles/UserJob.css'
import axios from 'axios'
import { useState } from 'react'

// UserJob Component which displays four cards dynamically with props
function UserJob({ profileImage, jobname, jobdesc, endpoint_url }) {

    /* displayMessage is a state variable which displays if build trigger 
       status is Success, Failed or Not Yet Build */
    const [displayMessage, setDisplayMessage] = useState("Not Build Yet")

    // handleClick() builds the specific job which is given in that card
    const handleClick = () => {

        // endpoint_url is dynamically passed in as property from App.js to UserJob.js
        axios.post(endpoint_url, {},
            {
                auth: {
                    username:process.env.REACT_APP_JENKINS_UNAME,
                    password: process.env.REACT_APP_JENKINS_PASS
                }
            })
            .then(() => {
                console.log(`Build Trigger Successful : ${jobname}`)
                setDisplayMessage("Success")
            })
            .catch((err) => {
                console.log("Error occured. Error : " + err)
                setDisplayMessage("Failed")
            })
    }

    return (
        <div className="card">
            <img className="card-img-top" src={profileImage} alt=""></img>
            <div className="card-body">
                <h5 className="card-title">{jobname}</h5>
                <hr/>
                <div className="card-text" style={{fontSize: "15px", color:"rgb(77,77,77)"}}>
                    <div className="jobdesc">{jobdesc}</div> <br /><hr />
                    <button type="button" className="btn btn-md btn-info" onClick={handleClick}>Build Now</button>
                </div>
                <hr />
                <div className="card-text" style={{fontSize: "15px", color:"darkgray"}}>Build Trigger <br/>Latest Status : {displayMessage}</div>
            </div>
        </div>
    )
}

export default UserJob