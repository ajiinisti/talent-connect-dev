import Button from "../../components/button/Button"
import CancelButton from "../../components/button/CancelButton"

const PasswordSettings = () => {
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
                        // onChange={handleInputChange}
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
                        // onChange={handleInputChange}
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
                        // onChange={handleInputChange}
                    />
                </div>

                <div className="mt-3">
                    <Button
                        title={"Save Changes"}
                    />
                    <CancelButton/>
                </div>
            </div>
        </div>
    )
}

export default PasswordSettings