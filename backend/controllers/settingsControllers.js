// controllers/settingsController.js
import Settings from "../models/settingsModel.js";

// Get current settings
export const getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json({ success: true, settings });
  } catch (error) {
    console.error("Get Settings Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching settings",
    });
  }
};

// Update settings
export const updateSettings = async (req, res) => {
  try {
    const { storeName, currency, maintenanceMode } = req.body;

    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings({
        storeName,
        currency,
        maintenanceMode,
      });
    } else {
      settings.storeName = storeName;
      settings.currency = currency;
      settings.maintenanceMode = maintenanceMode;
    }

    await settings.save();
    res.json({ success: true, settings });
  } catch (error) {
    console.error("Update Settings Error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating settings",
    });
  }
};

// SettingsController.js
export const uploadLogo = async (req, res) => {
  try {
    const logoUrl = req.file.path; // Assuming you're using multer
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = new Settings({ logo: logoUrl });
    } else {
      settings.logo = logoUrl;
    }
    
    await settings.save();
    res.json({ success: true, logoUrl });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error uploading logo" });
  }
};