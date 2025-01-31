const express = require('express');
const Enquiry = require('../models/Enquiry');




const createEnquiry=async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
  
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "All fields are required." });
      }
  
      const newEnquiry = new Enquiry({ name, email, subject, message });
      await newEnquiry.save();
  
      res.status(201).json({ message: "Enquiry submitted successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  };
  
  // Get All Enquiries
  const markAsResolved=async (req, res) => {
    try {
      const { id } = req.params; // Default page = 1, limit = 10
      const enquiries = await Enquiry.findByIdAndUpdate(id,{status:"Resolved"})
      
      res.status(200).json({
       message:'Enquiry Resolved'
      });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  };
  
  const fetchAllEnquires=async (req, res) => {
    try {
      const { status, page = 1, limit = 10 } = req.query; // Default page = 1, limit = 10
  
      let filter = {};
      if (status === "Pending") {
        filter.status = "Pending";
      }
  
      const enquiries = await Enquiry.find(filter)
        .sort({ createdAt: -1 }) // Sort by latest
        .skip((page - 1) * limit) // Pagination: skip previous pages
        .limit(parseInt(limit)); // Limit results
  
      const totalEnquiries = await Enquiry.countDocuments(filter); // Get total count
  
      res.status(200).json({
        totalPages: Math.ceil(totalEnquiries / limit),
        currentPage: parseInt(page),
        totalEnquiries,
        enquiries,
      });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  };
  

  module.exports = {
    fetchAllEnquires,
    markAsResolved,
    createEnquiry,
};

