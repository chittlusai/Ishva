"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem("ishiva_user_profile");
    if (saved) {
      try {
        setUserProfile(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse user profile");
      }
    }
    setIsLoaded(true);
  }, []);

  const loginUser = (profileData) => {
    setUserProfile(profileData);
    localStorage.setItem("ishiva_user_profile", JSON.stringify(profileData));
    
    // Also save to backend (fire and forget for now)
    fetch('/api/submit-user', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileData)
    }).catch(e => console.error("Could not sync user profile", e));
  };

  const logoutUser = () => {
    setUserProfile(null);
    localStorage.removeItem("ishiva_user_profile");
  };

  return (
    <UserContext.Provider value={{ userProfile, isLoaded, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
