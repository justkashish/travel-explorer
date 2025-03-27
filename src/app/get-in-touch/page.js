"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import Navbar from "../../components/Navbar"
import { isValidEmail, isValidPhone } from "../../utils/helpers"
import "./contact.css"

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = (data) => {
    console.log("Form data:", data)
    // In a real application, you would send this data to your backend
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsSubmitted(true)
        resolve()
      }, 1000)
    })
  }

  return (
    <div className="contact-page">
      

      <div className="container">
        <div className="contact-container">
          {!isSubmitted ? (
            <>
              <h1>Get in Touch</h1>
              <p>Fill out the form below and our travel expert will contact you shortly.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", {
                      required: "Name is required",
                    })}
                    className={errors.name ? "error" : ""}
                  />
                  {errors.name && <span className="error-message">{errors.name.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Contact Number</label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone", {
                      required: "Contact number is required",
                      validate: (value) => isValidPhone(value) || "Please enter a valid 10-digit phone number",
                    })}
                    className={errors.phone ? "error" : ""}
                  />
                  {errors.phone && <span className="error-message">{errors.phone.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      validate: (value) => isValidEmail(value) || "Please enter a valid email address",
                    })}
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && <span className="error-message">{errors.email.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="budget">Budget</label>
                  <select
                    id="budget"
                    {...register("budget", {
                      required: "Budget is required",
                    })}
                    className={errors.budget ? "error" : ""}
                  >
                    <option value="">Select your budget</option>
                    <option value="50000-100000">₹50,000 - 1 Lakh</option>
                    <option value="100000-200000">1 Lakh - 2 Lakhs</option>
                    <option value="200000-300000">2 Lakhs - 3 Lakhs</option>
                    <option value="300000+">3 Lakhs+</option>
                  </select>
                  {errors.budget && <span className="error-message">{errors.budget.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message (Optional)</label>
                  <textarea id="message" rows="4" {...register("message")}></textarea>
                </div>

                <button type="submit" className="btn" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </>
          ) : (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h2>Thank You!</h2>
              <p>Your message has been sent successfully. One of our travel experts will contact you shortly.</p>
              <Link href="/" className="btn">
                Return to Home
              </Link>
            </div>
          )}
        </div>
      </div>

  
    </div>
  )
}

