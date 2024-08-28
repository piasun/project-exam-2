import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveToken, saveUser } from '../../hooks/useLocalStorage';
import { REGISTER_URL } from '../../constants/apiUrl';

function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        avatar: '',
        banner: ''
    });

    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const { email, password, name } = formData;
        if (!/^[a-zA-Z0-9_]+$/.test(name)) {
            alert('Name must only contain letters, numbers, and underscores.');
            return false;
        }
        if (!/^[a-zA-Z0-9_.+-]+@(stud\.noroff\.no|noroff\.no)$/.test(email)) {
            alert('Email must be a valid Noroff address (either @stud.noroff.no or @noroff.no).');
            return false;
        }
        if (password.length < 8) {
            alert('Password must be at least 8 characters.');
            return false;
        }
        return true;
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        const defaultAvatar = "https://robohash.org/527470b2132d9ed77639523ec29f1912?set=set4&bgset=&size=400x400";
        const defaultBanner = "https://robohash.org/527470b2132d9ed77639523ec29f1912?set=set4&bgset=&size=400x400";
        const avatarUrl = formData.avatar || defaultAvatar;
        const bannerUrl = formData.banner || defaultBanner;

        try {
            const response = await fetch(REGISTER_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });
            const data = await response.json();
      
            if (response.ok) {
              saveToken(data.accessToken);
              saveUser({ name: formData.name, email: formData.email });
              navigate("/profile");
            } else {
              setError(data.message || "Registration failed. Please try again.");
            }
          } catch (error) {
            setError("Registration failed. Please try again.");
          }
    };

    return (
        <div className="container mt-5">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <Field label="Name" type="text" name="name" value={formData.name} onChange={handleChange} required />
                <Field label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
                <Field label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
                <Field label="Avatar URL" type="url" name="avatar" value={formData.avatar} onChange={handleChange} />
                <Field label="Banner URL" type="url" name="banner" value={formData.banner} onChange={handleChange} />
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}

const Field = ({ label, type, name, value, onChange, required }) => (
    <div className="mb-3">
        <label htmlFor={name} className="form-label">{label}</label>
        <input type={type} className="form-control" id={name} name={name} value={value} onChange={onChange} required={required} />
    </div>
);

export default Register;