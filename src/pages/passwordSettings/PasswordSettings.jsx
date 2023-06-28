import { useEffect, useState } from "react"
import Button from "../../components/button/Button"
import CancelButton from "../../components/button/CancelButton"
import usePassword from "./usePassword"

const PasswordSettings = () => {
    const {changePassword} = usePassword()
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        errorMessage : ""
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPasswordData((prevState) => ({
          ...prevState,
          [name]: value
        }));
    };

    useEffect(() => {
        handleCheckPassword();
      }, [passwordData.newPassword, passwordData.confirmPassword]);

    const handleCheckPassword = () => {
        const uppercaseRegex = /[A-Z]/;
        const isUppercasePresent = uppercaseRegex.test(passwordData.newPassword);

        const numberRegex = /\d/;
        const isNumberPresent = numberRegex.test(passwordData.newPassword);
        console.log("passwordbaru:",passwordData.newPassword," ", isUppercasePresent, isNumberPresent)
        if (passwordData.newPassword.length < 6) {
            setPasswordData((prevState) => ({
                ...prevState,
                errorMessage: "Password length must be at least 6 characters"
            }))
        }else if (!isUppercasePresent) {
            setPasswordData((prevState) => ({
                ...prevState,
                errorMessage: "Password should contain capital letter"
            }))
        }else if (!isNumberPresent){
            setPasswordData((prevState) => ({
                ...prevState,
                errorMessage: "Password should contain number"
            }))
        }else if (passwordData.confirmPassword !== passwordData.newPassword){
            setPasswordData((prevState) => ({
                ...prevState,
                errorMessage: "New password and confirm password should be the same value"
            }))
        }
        else{ 
            setPasswordData((prevState) => ({
                ...prevState,
                errorMessage: ""
            }))
        }
    }

    return(
        <div className="container py-5 px-5">
            <h2><b>Change Password</b></h2>
            <div className="mt-4">
                <div className="mt-3">  
                    <label htmlFor="currentPassword" className="form-label">Current Password</label>
                    <input 
                        required
                        type="password" 
                        name="currentPassword" 
                        className="form-control" 
                        id="currentPassword" 
                        placeholder="Enter your current password"
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mt-3">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input 
                        required
                        type="password" 
                        name="newPassword" 
                        className="form-control" 
                        id="newPassword" 
                        placeholder="Enter your new password"
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mt-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                    <input 
                        required
                        type="password" 
                        name="confirmPassword" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Confirm you new password"
                        onChange={handleInputChange}
                    />
                </div>

                {
                    passwordData.errorMessage ?
                    <p style={{color: "red"}}>{passwordData.errorMessage}</p> : <></>
                }

                <div className="mt-3">
                    <Button
                        title={"Save Changes"}
                        navigate={() => {
                            changePassword(passwordData.currentPassword, passwordData.confirmPassword)
                        }}
                    />
                    <CancelButton/>
                </div>
            </div>
        </div>
    )
}

export default PasswordSettings