import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Link 추가

function UserPage({ user }) {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://gitfoback.anys.kro.kr/search/${user.id}`,
        );
        setUserDetails(response.data);
        setError("");
      } catch (error) {
        console.error("Error:", error);
        setUserDetails(null);
        setError("사용자 정보를 불러올 수 없습니다.");
      }
    };

    fetchUserDetails();
  }, [user.id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to="/">Back to Search</Link>
      <h1>{userDetails.name || userDetails.id}</h1>
      <p>{userDetails.bio}</p>
      <p>Repos: {userDetails.public_repos}</p>
      <p>Followers: {userDetails.followers}</p>
      <p>Following: {userDetails.following}</p>
      <p>Company: {userDetails.company}</p>
      <p>Location: {userDetails.location}</p>
    </div>
  );
}

export default UserPage;