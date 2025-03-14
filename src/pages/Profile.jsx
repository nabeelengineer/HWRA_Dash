import React, { useState } from "react";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        username: "qcsitamarhidairy@gmail.com",
        salutation: "M/S",
        name: "Sitamarhi",
        phone: "7260899434",
        address: "Binda industrial area, Rajopatti, Dumra road, Sitamarhi 843302",
    });

    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [validation, setValidation] = useState({
        oldPasswordValid: null, // null means no validation applied yet
        newPasswordValid: null,
        confirmPasswordValid: null,
    });

    const correctOldPassword = "123456"; // Hardcoded for validation (Replace with actual backend check)

    // Toggle Editing Mode
    const handleEditClick = () => setIsEditing(true);

    // Update Profile
    const handleUpdateClick = () => {
        setIsEditing(false);
        alert("Profile updated successfully!");
    };

    // Handle Profile Change
    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    // Handle Password Change
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords({ ...passwords, [name]: value });

        if (name === "oldPassword") {
            if (value !== correctOldPassword) {
                setValidation({ ...validation, oldPasswordValid: false });
            } else {
                setValidation({ ...validation, oldPasswordValid: true });
            }
        }

        if (name === "newPassword") {
            setValidation({ ...validation, newPasswordValid: value.length >= 6 });
        }

        if (name === "confirmPassword") {
            setValidation({
                ...validation,
                confirmPasswordValid: value === passwords.newPassword && value.length >= 6,
            });
        }
    };

    // Change Password Action
    const handleChangePassword = () => {
        if (!validation.oldPasswordValid) {
            alert("Old password doesn't match!");
            return;
        }
        if (!validation.newPasswordValid) {
            alert("New password must be at least 6 characters long!");
            return;
        }
        if (!validation.confirmPasswordValid) {
            alert("Passwords do not match!");
            return;
        }

        alert("Password changed successfully!");
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-semibold mb-4">Profile</h2>

            {/* Profile Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <button
                    className="bg-gradient-to-r from-orange-500 to-black text-white px-4 py-2 rounded-md mb-4"
                    onClick={handleEditClick}
                >
                    Edit Profile
                </button>
                <p className="text-orange-500 text-sm">* Click edit to update your details.</p>

                {/* Profile Fields */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="text-gray-600">USERNAME (DISABLED)</label>
                        <input
                            type="email"
                            value={profile.username}
                            disabled
                            className="w-full border p-2 rounded-md bg-gray-200"
                        />
                    </div>
                    <div>
                        <label className="text-gray-600">SALUTATION</label>
                        <input
                            type="text"
                            name="salutation"
                            value={profile.salutation}
                            disabled={!isEditing}
                            onChange={handleProfileChange}
                            className={`w-full border p-2 rounded-md ${isEditing ? "bg-white" : "bg-gray-200"}`}
                        />
                    </div>
                    <div>
                        <label className="text-gray-600">NAME</label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            disabled={!isEditing}
                            onChange={handleProfileChange}
                            className={`w-full border p-2 rounded-md ${isEditing ? "bg-white" : "bg-gray-200"}`}
                        />
                    </div>
                    <div>
                        <label className="text-gray-600">PHONE NUMBER</label>
                        <input
                            type="text"
                            name="phone"
                            value={profile.phone}
                            disabled={!isEditing}
                            onChange={handleProfileChange}
                            className={`w-full border p-2 rounded-md ${isEditing ? "bg-white" : "bg-gray-200"}`}
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="text-gray-600">ADDRESS</label>
                        <input
                            type="text"
                            name="address"
                            value={profile.address}
                            disabled={!isEditing}
                            onChange={handleProfileChange}
                            className={`w-full border p-2 rounded-md ${isEditing ? "bg-white" : "bg-gray-200"}`}
                        />
                    </div>
                </div>

                {/* Update Profile Button */}
                {isEditing && (
                    <button className="bg-gradient-to-r from-orange-500 to-black text-white px-4 py-2 rounded-md mt-4" onClick={handleUpdateClick}>
                        Update Profile
                    </button>
                )}
            </div>

            {/* Change Password Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-semibold mb-4">Change Password</h3>

                <div className="grid grid-cols-1 gap-4">
                    {/* Old Password */}
                    <div>
                        <label className="text-gray-600">Old Password</label>
                        <input
                            type="password"
                            name="oldPassword"
                            value={passwords.oldPassword}
                            onChange={handlePasswordChange}
                            className={`w-full border p-2 rounded-md ${validation.oldPasswordValid === false ? "border-red-500" : ""
                                }`}
                        />
                        {validation.oldPasswordValid === false && (
                            <p className="text-red-500 text-sm">Password doesn't match</p>
                        )}
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="text-gray-600">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={passwords.newPassword}
                            onChange={handlePasswordChange}
                            className={`w-full border p-2 rounded-md ${validation.newPasswordValid ? "border-green-500" : ""
                                }`}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-gray-600">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={passwords.confirmPassword}
                            onChange={handlePasswordChange}
                            className={`w-full border p-2 rounded-md ${validation.confirmPasswordValid === false ? "border-red-500" : validation.confirmPasswordValid ? "border-green-500" : ""
                                }`}
                        />
                        {validation.confirmPasswordValid === false && (
                            <p className="text-red-500 text-sm">Passwords do not match</p>
                        )}
                    </div>
                </div>

                <button className="bg-gradient-to-r from-orange-500 to-black text-white px-4 py-2 rounded-md mt-4" onClick={handleChangePassword}>
                    Change Password
                </button>
            </div>
        </div>
    );
};

export default Profile;
