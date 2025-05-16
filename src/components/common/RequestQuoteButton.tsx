"use client";

import React, { useState } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { FormikHelpers } from "formik";
import { motion } from "framer-motion";
import Modal from "@/components/ui/Modal";
import QuoteForm from "@/components/forms/QuoteForm";
import { toast } from "react-hot-toast";

// Define the QuoteFormValues interface (should match the one in QuoteForm.tsx)
interface QuoteFormValues {
  name: string;
  email: string;
  phone: string;
  productName: string;
  quantity: number;
  description: string;
  deliveryDate: Date | null;
}

interface RequestQuoteButtonProps {
  variant?: "mobile" | "desktop";
  className?: string;
}

const RequestQuoteButton: React.FC<RequestQuoteButtonProps> = ({
  variant = "desktop",
  className = "",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (
    values: QuoteFormValues,
    actions: FormikHelpers<QuoteFormValues>
  ) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Format date for display in console log
      const formattedValues = {
        ...values,
        deliveryDate: values.deliveryDate ? values.deliveryDate.toLocaleDateString() : null
      };
      
      console.log("Form submitted with values:", formattedValues);
      
      // Show success message
      toast.success("Quote request submitted successfully!");
      
      // Reset form and close modal
      actions.resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit quote request. Please try again.");
    } finally {
      actions.setSubmitting(false);
    }
  };

  // Render button based on variant (mobile or desktop)
  if (variant === "mobile") {
    return (
      <>
        <button
          onClick={handleOpenModal}
          className={`flex items-center justify-center gap-2 w-full px-4 py-3 bg-secondary text-white rounded-3xl font-medium shadow-md hover:bg-primary transition-colors ${className}`}
        >
          <FileText className="w-4 h-4" />
          Request Quote
          <ArrowRight className="w-4 h-4" />
        </button>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Request a Quote"
          size="lg"
        >
          <QuoteForm onSubmit={handleSubmit} />
        </Modal>
      </>
    );
  }

  return (
    <>
      <motion.button
        onClick={handleOpenModal}
        className={`
          flex items-center bg-secondary text-white 
          transition-all duration-300 ease-out
          border-none rounded-3xl group 
          shadow-pop-sm hover:bg-primary px-5 py-3 text-base
          ${className}
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FileText
          className="mr-2 transition-all duration-300 font-primary w-4.5 h-4.5"
          aria-hidden="true"
        />
        Request Quote
        <ArrowRight
          className="ml-2 group-hover:translate-x-1 transition-all duration-300 w-4.5 h-4.5"
          aria-hidden="true"
        />
      </motion.button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Request a Quote"
        size="lg"
      >
        <QuoteForm onSubmit={handleSubmit} />
      </Modal>
    </>
  );
};

export default RequestQuoteButton; 