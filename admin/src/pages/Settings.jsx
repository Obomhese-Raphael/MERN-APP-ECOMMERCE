// components/admin/Settings.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const Settings = ({ token }) => {
  const [settings, setSettings] = useState({
    storeName: "",
    currency: "$",
    maintenanceMode: false,
    logo: "",
    favicon: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: ""
    },
    contactInfo: {
      email: "",
      phone: "",
      address: ""
    }
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/settings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setSettings(response.data.settings || settings);
      }
    } catch (error) {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [name]: value
      }
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${backendUrl}/api/settings`,
        settings,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success("Settings updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update settings");
    }
  };

  const handleImageUpload = async (e, type) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    setUploading(true);
    const response = await axios.post(
      `${backendUrl}/api/settings/upload-${type}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );
    
    if (response.data.success) {
      setSettings(prev => ({
        ...prev,
        [type]: response.data[`${type}Url`]
      }));
      toast.success(`${type} uploaded successfully`);
    }
  } catch (error) {
    toast.error(`Failed to upload ${type}`);
  } finally {
    setUploading(false);
  }
};


  useEffect(() => {
    fetchSettings();
  }, []);

  if (loading) return <div>Loading settings...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Store Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Store Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Store Name</label>
              <input
                type="text"
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Currency</label>
              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="$">USD ($)</option>
                <option value="€">EUR (€)</option>
                <option value="£">GBP (£)</option>
                <option value="¥">JPY (¥)</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="maintenanceMode"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="maintenanceMode">Maintenance Mode</label>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Social Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Facebook</label>
              <input
                type="url"
                name="facebook"
                value={settings.socialMedia.facebook}
                onChange={handleSocialMediaChange}
                className="w-full p-2 border rounded"
                placeholder="https://facebook.com/yourpage"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Instagram</label>
              <input
                type="url"
                name="instagram"
                value={settings.socialMedia.instagram}
                onChange={handleSocialMediaChange}
                className="w-full p-2 border rounded"
                placeholder="https://instagram.com/yourpage"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Twitter</label>
              <input
                type="url"
                name="twitter"
                value={settings.socialMedia.twitter}
                onChange={handleSocialMediaChange}
                className="w-full p-2 border rounded"
                placeholder="https://twitter.com/yourpage"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={settings.contactInfo.email}
                onChange={handleContactChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={settings.contactInfo.phone}
                onChange={handleContactChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea
                name="address"
                value={settings.contactInfo.address}
                onChange={handleContactChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Settings
        </button>
        <div className="mt-4">
  <label className="block text-sm font-medium mb-1">Store Logo</label>
  <div className="flex items-center">
    {settings.logo && (
      <img 
        src={settings.logo} 
        alt="Store Logo" 
        className="h-16 mr-4"
      />
    )}
    <input
      type="file"
      accept="image/*"
      onChange={(e) => handleImageUpload(e, "logo")}
      className="hidden"
      id="logo-upload"
    />
    <label
      htmlFor="logo-upload"
      className="cursor-pointer bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
    >
      {uploading ? "Uploading..." : "Upload Logo"}
    </label>
  </div>
</div>      </form>
    </div>
  );
};

export default Settings;