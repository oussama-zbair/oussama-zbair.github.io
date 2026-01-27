/**
 * Email service for sending visitor information
 * Using EmailJS for client-side email sending
 */

import emailjs from '@emailjs/browser';

// EmailJS Configuration
export const sendViaEmailJS = async (data: {
  name: string;
  email: string;
  role: string;
  timestamp: string;
}) => {
  const emailJSConfig = {
    serviceId: 'service_ljnhm2b', 
    templateId: 'template_031szni', 
    publicKey: 'YHu-xLWYyuHa47tLq', 
  };

  try {
    const templateParams = {
      visitor_name: data.name,
      visitor_email: data.email,
      visitor_role: data.role,
      download_time: new Date(data.timestamp).toLocaleString(),
      to_email: 'oussama.zbair9@gmail.com', 
    };

    const response = await emailjs.send(
      emailJSConfig.serviceId,
      emailJSConfig.templateId,
      templateParams,
      emailJSConfig.publicKey
    );

    console.log('✅ EmailJS Success:', response);
    return { success: true };
  } catch (error) {
    console.error('❌ EmailJS error:', error);
    throw error;
  }
};

// Main function to send visitor info
export const sendVisitorInfo = async (data: {
  name: string;
  email: string;
  role: string;
  timestamp: string;
}) => {
  try {
    await sendViaEmailJS(data);
    console.log('✅ Visitor info sent successfully via EmailJS');
    return { success: true, service: 'EmailJS' };
  } catch (error) {
    console.error('❌ EmailJS failed:', error);
    
    // Store locally as backup
    const backupData = {
      ...data,
      id: Date.now().toString(),
    };
    
    const existingData = JSON.parse(localStorage.getItem('cv_downloads') || '[]');
    existingData.push(backupData);
    localStorage.setItem('cv_downloads', JSON.stringify(existingData));
    
    console.log('📦 Visitor info stored locally as backup');
    throw new Error('EmailJS failed, data stored locally');
  }
};

// Function to get locally stored downloads (for backup/debugging)
export const getLocalDownloads = () => {
  return JSON.parse(localStorage.getItem('cv_downloads') || '[]');
};

// Function to clear local downloads (after manual processing)
export const clearLocalDownloads = () => {
  localStorage.removeItem('cv_downloads');
};