"use client";

import { useState } from "react";

const CreateBookingForm = () => {
  const [formData, setFormData] = useState({
    owner_id: "",
    caregiver_id: "",
    pet_id: "",
    service_id: "",
    start_time: "",
    end_time: "",
    status: 0,
    total_price: "",
    additional_instructions: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      const data = await response.json();
      setSuccessMessage("Booking created successfully!");
      setFormData({
        owner_id: "",
        caregiver_id: "",
        pet_id: "",
        service_id: "",
        start_time: "",
        end_time: "",
        status: 0,
        total_price: "",
        additional_instructions: "",
      });
    } catch (error) {
        const errorMessage = await error.response?.text() || error.message;
        setErrorMessage(`Error: ${errorMessage}`);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Booking</h2>
      {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
      {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Owner ID:</label>
          <input
            type="number"
            name="owner_id"
            value={formData.owner_id}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Caregiver ID:</label>
          <input
            type="number"
            name="caregiver_id"
            value={formData.caregiver_id}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Pet ID:</label>
          <input
            type="number"
            name="pet_id"
            value={formData.pet_id}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Service ID:</label>
          <input
            type="number"
            name="service_id"
            value={formData.service_id}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Start Time:</label>
          <input
            type="datetime-local"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>End Time:</label>
          <input
            type="datetime-local"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Status:</label>
          <input
            type="number"
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Total Price:</label>
          <input
            type="number"
            step="0.01"
            name="total_price"
            value={formData.total_price}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Additional Instructions:</label>
          <textarea
            name="additional_instructions"
            value={formData.additional_instructions}
            onChange={handleChange}
            style={styles.textarea}
          ></textarea>
        </div>
        <button type="submit" style={styles.button}>
          Create Booking
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    minHeight: "80px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  successMessage: {
    color: "green",
    textAlign: "center",
    marginBottom: "10px",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
  },
};

export default CreateBookingForm;
