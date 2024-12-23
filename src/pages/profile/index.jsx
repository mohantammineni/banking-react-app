import React, { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import AccountDetails from "./AccountDetails";
import NomineeDetails from "./NomineeDetails";
import "./index.css";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Fetch data from localStorage
    const storedData = JSON.parse(localStorage.getItem("userData"));
    setProfileData(storedData);
  }, []);

  return (
    <div className="profile-page-container">
      <h1>Profile</h1>
      {/* Pass profile data to child components as props */}
      {profileData && (
        <>
          <UserProfile data={profileData} />
          <AccountDetails data={profileData} />
          <NomineeDetails data={profileData} />
        </>
      )}
    </div>
  );
};

export default Profile;
