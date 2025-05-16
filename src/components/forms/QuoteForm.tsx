"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { CalendarIcon, Send } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Define the form values interface
interface QuoteFormValues {
  name: string;
  email: string;
  phone: string;
  productName: string;
  quantity: number;
  description: string;
  deliveryDate: Date | null;
}

// Initial values matching the QuoteFormValues interface
const initialValues: QuoteFormValues = {
  name: "",
  email: "",
  phone: "",
  productName: "",
  quantity: 1,
  description: "",
  deliveryDate: null,
};

// Form validation schema
const QuoteFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Please enter a valid phone number")
    .required("Phone number is required"),
  productName: Yup.string().required("Product name is required"),
  quantity: Yup.number()
    .positive("Quantity must be positive")
    .integer("Quantity must be a whole number")
    .required("Quantity is required"),
  description: Yup.string().max(500, "Description too long"),
  deliveryDate: Yup.date()
    .nullable()
    .min(new Date(), "Delivery date cannot be in the past")
    .required("Delivery date is required"),
});

interface QuoteFormProps {
  onSubmit: (values: QuoteFormValues, actions: FormikHelpers<QuoteFormValues>) => void;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onSubmit }) => {
  return (
    <Formik<QuoteFormValues>
      initialValues={initialValues}
      validationSchema={QuoteFormSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, errors, touched, setFieldValue, values }) => (
        <Form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name input */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className={`w-full px-4 py-3 rounded-xl text-sm border-2 outline-none transition-all duration-300 ${
                  errors.name && touched.name
                    ? "border-red-400"
                    : "border-gray-200 focus:border-secondary"
                }`}
                placeholder="Enter your full name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Email input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className={`w-full px-4 py-3 rounded-xl text-sm border-2 outline-none transition-all duration-300 ${
                  errors.email && touched.email
                    ? "border-red-400"
                    : "border-gray-200 focus:border-secondary"
                }`}
                placeholder="Enter your email address"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Phone input */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <Field
                type="tel"
                id="phone"
                name="phone"
                className={`w-full px-4 py-3 rounded-xl text-sm border-2 outline-none transition-all duration-300 ${
                  errors.phone && touched.phone
                    ? "border-red-400"
                    : "border-gray-200 focus:border-secondary"
                }`}
                placeholder="Enter your phone number"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Quantity input */}
            <div className="space-y-2">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity <span className="text-red-500">*</span>
              </label>
              <Field
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                className={`w-full px-4 py-3 rounded-xl text-sm border-2 outline-none transition-all duration-300 ${
                  errors.quantity && touched.quantity
                    ? "border-red-400"
                    : "border-gray-200 focus:border-secondary"
                }`}
              />
              <ErrorMessage
                name="quantity"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Product name input */}
            <div className="space-y-2">
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                id="productName"
                name="productName"
                className={`w-full px-4 py-3 rounded-xl text-sm border-2 outline-none transition-all duration-300 ${
                  errors.productName && touched.productName
                    ? "border-red-400"
                    : "border-gray-200 focus:border-secondary"
                }`}
                placeholder="Enter product name"
              />
              <ErrorMessage
                name="productName"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Delivery date input - with DatePicker */}
            <div className="space-y-2">
              <label
                htmlFor="deliveryDate"
                className="block text-sm font-medium text-gray-700"
              >
                Delivery Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DatePicker
                  id="deliveryDate"
                  selected={values.deliveryDate}
                  onChange={(date) => setFieldValue("deliveryDate", date)}
                  minDate={new Date()}
                  placeholderText="Select delivery date"
                  dateFormat="MMMM d, yyyy"
                  className={`w-full px-4 py-3 rounded-xl text-sm border-2 outline-none transition-all duration-300 ${
                    errors.deliveryDate && touched.deliveryDate
                      ? "border-red-400"
                      : "border-gray-200 focus:border-secondary"
                  }`}
                  wrapperClassName="w-full"
                  popperClassName="z-50"
                  popperPlacement="bottom-start"
                  showPopperArrow={false}
                />
                <CalendarIcon 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" 
                />
              </div>
              <ErrorMessage
                name="deliveryDate"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
          </div>

          {/* Description textarea */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Product Description
            </label>
            <Field
              as="textarea"
              id="description"
              name="description"
              rows={4}
              className={`w-full px-4 py-3 rounded-xl text-sm border-2 outline-none transition-all duration-300 ${
                errors.description && touched.description
                  ? "border-red-400"
                  : "border-gray-200 focus:border-secondary"
              }`}
              placeholder="Please describe any specific requirements for the product"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-secondary hover:bg-primary text-white py-3 px-6 rounded-3xl font-medium transition-colors duration-300 flex items-center justify-center gap-2 shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Quote Request
              </>
            )}
          </motion.button>
        </Form>
      )}
    </Formik>
  );
};

export default QuoteForm; 