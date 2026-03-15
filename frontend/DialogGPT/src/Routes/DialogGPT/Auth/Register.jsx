import React, { useState } from 'react'; // Added { useState }
import './AuthPages.css';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import axios from 'axios'; // 2. Import axios

export default function Register() {
    // Now these will work perfectly
    const [preview, setPreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate(); // 3. Initialize navigate
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        full_name: "",
        profile_image: "default_avatar.png", // Passing a string as requested
        password: "",
        login_provider: "credentials" // Defaulting to credentials
    });
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file); // Store the actual file for the backend
            setPreview(URL.createObjectURL(file)); // Store the URL for the UI
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            // 4. Perform the actual request
            const response = await axios.post('http://127.0.0.1:8000/DialogGPT/users', formData);

            if (response.status === 200 || response.status === 201) {
                console.log("Success:", response.data);
                // 5. Redirect to login after successful registration
                navigate('/DialogGPT/login');
            }
        } catch (error) {
            console.error("Submission error:", error.response?.data || error.message);
            alert("Registration failed. Check console for details.");
        }
    };
    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="tech-tag">USER_ENROLLMENT_V3</div>
                <br/>
                <div className="image-upload-wrapper">
                        <div className="image-preview-box" onClick={() => document.getElementById('file-input').click()}>
                            {preview ? (
                                <img src={preview} alt="Preview" className="profile-preview-img" />
                            ) : (
                                <div className="upload-placeholder">
                                    <span className="upload-icon">+</span>
                                    <span>UPLOAD_IMG</span>
                                </div>
                            )}
                        </div>
                        <input
                            id="file-input"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            hidden
                        />
                </div>
                <h2 className="auth-title">Register</h2>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>USERNAME</label>
                        <input type="text" placeholder="Assign ID..." value={formData.username} onChange={handleInputChange} name="username" required />
                    </div>

                    <div className="input-group">
                        <label>Full Name</label>
                        <input type="text" placeholder="$whoami" value={formData.full_name} onChange={handleInputChange} name="full_name" required />
                    </div>

                    <div className="input-group">
                        <label>EMAIL_ADDRESS</label>
                        <input type="email" placeholder="contact@domain.com" value={formData.email}  onChange={handleInputChange} name="email"  required />
                    </div>
                    <div className="input-group">
                        <label>ACCESS_KEY</label>
                        <input type="password" placeholder="Define secure key..." value={formData.password}  onChange={handleInputChange} name="password" required />
                    </div>
                    <button type="submit" className="auth-btn">AUTHORIZE_CREATION</button>
                </form>

                <div className="auth-footer">
                    <span>ALREADY_MEMEBER? </span>
                    <a href="/DialogGPT/login">RETURN_TO_LOGIN</a>
                </div>
            </div>
        </div>
    );
}