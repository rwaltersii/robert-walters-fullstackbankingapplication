// Imported React Modules
import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../App"

// Imported Styles
import "./CreateAccount.css"

const CreateAccount = () => {
  //List of form variables to control their state values
  const [fullName, setFullName] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [passwordValue, setPasswordValue] = useState("")

  //This is the array of objects for the users; default value is from users from App.js
  const [users, setUsers] = useState([])

  //This controls whetherr the input form or the Add Another message is being shown
  const [show, setShow] = useState(true)

  //Controls the redirection
  const navigate = useNavigate()

  //Function that controls the form submission-
  const submitHandler = async (event) => {
    event.preventDefault()

    //Checks all the input fields for errors, blank, password length, etc.
    if (!fullName) {
      alert("Full Name field cannot be blank. Please try again.")
      return
    } else if (!emailAddress) {
      alert("Email field cannot be blank. Please try again.")
      return
    } else if (passwordValue.length < 8) {
      alert("Password must be at least 8 characters long. Please try again.")
      return
    } else {
      //Write to data base here
      console.log("Writing to the Database...")
      try {
        const body = { fullName, emailAddress, passwordValue }
        const response = await fetch("/createaccount", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }).then(() => {
          console.log("Write Complete")
        })
      } catch (err) {
        console.log(err.message)
      }
    }
    setShow(false)
  }

  //Function to reset all the input fields back to their defaults
  const resetFields = () => {
    setTimeout(() => {
      window.location.reload()
    }, 1000)
    setFullName("")
    setEmailAddress("")
    setPasswordValue("")
    setShow(true)
    navigate("/")
  }

  //Function controls the Full Name user input-
  const handleFullNameChange = (event) => {
    setFullName(event.target.value)
  }

  //Function controls the Email Address user input-
  const handleEmailAddressChange = (event) => {
    setEmailAddress(event.target.value)
  }

  //Function controls the Password user input-
  const handlePasswordValueChange = (event) => {
    setPasswordValue(event.target.value)
  }

  //Function returns the user to the login screen-
  const handleCancel = (event) => {
    console.log("Canceled")
    navigate("/")
  }

  return (
    <div>
      {show ? (
        <div className="container">
          <div className="card" style={{ maxWidth: 540 + "px" }}>
            <div className="card-header">Create Account</div>

            <form className="card-body ">
              <div className="mb-3">
                <label htmlFor="exampleInputName1" className="form-label">
                  Full Name:
                </label>
                <input
                  style={{ maxWidth: 250 + "px" }}
                  type="text"
                  className="form-control"
                  id="exampleInputName1"
                  aria-describedby="nameHelp"
                  onChange={handleFullNameChange}
                  value={fullName}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email address:</label>
                <input
                  style={{ maxWidth: 250 + "px" }}
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={handleEmailAddressChange}
                  value={emailAddress}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input
                  style={{ maxWidth: 125 + "px" }}
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={handlePasswordValueChange}
                  value={passwordValue}
                />
              </div>

              <button
                type="submit"
                className="btn btn-secondary"
                //The create account button is desabled if all the fields are empty
                disabled={!fullName && !emailAddress && !passwordValue}
                onClick={submitHandler}
              >
                Create Account
              </button>
              <button
                type="submit"
                className="btn btn-secondary cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="card" style={{ maxWidth: 540 + "px" }}>
            <div className="card-header">Create Account</div>
            <p className="card-text mt-3">
              Congratulations! New account was created successfully.
            </p>
            <form className="card-body ">
              <button
                type="submit"
                className="btn btn-secondary"
                onClick={resetFields}
              >
                Return to Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateAccount
