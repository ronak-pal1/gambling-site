import React from "react";

const TermsConditions = () => {
  return (
    <div className="w-full h-full overflow-y-scroll">
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg text-gray-700 sm:p-8 md:p-10 lg:p-12 ">
        <h1 className="text-3xl font-bold text-center mb-6 sm:text-4xl">
          Terms & Conditions
        </h1>
        <p className="mb-4 text-sm sm:text-base">
          This document constitutes a legally binding agreement between{" "}
          <b>KheloSpardha</b> ("Platform," "we," "us") and users ("User,"
          "you"). By using this Platform, you agree to comply with all
          provisions, Indian laws, and applicable regulations.
        </p>

        <h2 className="text-xl font-semibold mt-4 sm:text-2xl">
          1. Definitions and Interpretation
        </h2>
        <ul className="list-disc pl-5 text-sm sm:text-base">
          <li>
            <b>Demand Order:</b> User-generated predictions or offers related to
            event outcomes.
          </li>
          <li>
            <b>Transaction:</b> Acceptance or fulfillment of a Demand Order
            between Users.
          </li>
          <li>
            <b>Content:</b> Data, text, or materials uploaded by Users.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-4 sm:text-2xl">
          2. Eligibility and Registration
        </h2>
        <p className="text-sm sm:text-base">
          Users must be at least 18 years old. Registration requires valid
          identification and accurate information.
        </p>

        <h2 className="text-xl font-semibold mt-4 sm:text-2xl">
          3. Nature of Services
        </h2>
        <p className="text-sm sm:text-base">
          The Platform operates as an intermediary under India’s IT Act and
          facilitates User interactions but is not responsible for transaction
          legality or accuracy.
        </p>

        <h2 className="text-xl font-semibold mt-4 sm:text-2xl">
          4. User Obligations and Prohibited Conduct
        </h2>
        <ul className="list-disc pl-5 text-sm sm:text-base">
          <li>
            Users must comply with Indian laws including the Public Gambling
            Act.
          </li>
          <li>
            Prohibited activities include fraud, defamation, and market
            manipulation.
          </li>
          <li>Users are solely liable for violations.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4 sm:text-2xl">
          5. Content and Transactions
        </h2>
        <p className="text-sm sm:text-base">
          Content is user-generated, and the Platform disclaims liability for
          its accuracy or impact.
        </p>

        <h2 className="text-xl font-semibold mt-4 sm:text-2xl">
          6. Payments and Financial Compliance
        </h2>
        <p className="text-sm sm:text-base">
          Users transact at their own risk; the Platform does not interfere with
          personal funds.
        </p>

        <h2 className="text-xl font-semibold mt-4 sm:text-2xl">
          7. Grievance Redressal
        </h2>
        <p className="text-sm sm:text-base">
          A Grievance Officer (contact: <b>sindhumaira@gmail.com</b>) will
          address complaints within 15 days.
        </p>

        <h2 className="text-xl font-semibold mt-4 sm:text-2xl">
          8. Disclaimers and Limitation of Liability
        </h2>
        <ul className="list-disc pl-5 text-sm sm:text-base">
          <li>The Platform disclaims all warranties.</li>
          <li>Not liable for user misconduct or financial losses.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4 sm:text-2xl">
          9. Termination and Suspension
        </h2>
        <p className="text-sm sm:text-base">
          The Platform reserves the right to suspend or terminate accounts for
          violations.
        </p>

        <h2 className="text-xl font-semibold mt-4 sm:text-2xl">
          10. Governing Law and Amendments
        </h2>
        <p className="text-sm sm:text-base">
          These Terms are governed by Indian law. Amendments will be notified 30
          days in advance.
        </p>

        <p className="text-gray-600 text-xs sm:text-sm mt-6">
          Last updated: Thursday, February 20, 2025
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;
