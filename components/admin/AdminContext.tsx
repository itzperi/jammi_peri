"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Check for admin session and edit mode on mount
    const session = localStorage.getItem("jammi_admin_session");
    if (session === "true") {
      setIsAdmin(true);
      const editMode = localStorage.getItem("jammi_edit_mode");
      if (editMode === "true") {
        setIsEditMode(true);
      }
    }
  }, []);

  const handleSetEditMode = (val: boolean) => {
    setIsEditMode(val);
    localStorage.setItem("jammi_edit_mode", val ? "true" : "false");
  };

  const logout = () => {
    localStorage.removeItem("jammi_admin_session");
    localStorage.removeItem("jammi_edit_mode");
    setIsAdmin(false);
    setIsEditMode(false);
    window.location.reload();
  };

  return (
    <AdminContext.Provider value={{ isAdmin, isEditMode, setIsEditMode: handleSetEditMode, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
