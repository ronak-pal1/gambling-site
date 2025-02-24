const FAQsPage = () => {
  return (
    <div className="w-full h-full overflow-y-scroll">
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg text-gray-700 sm:p-8 md:p-10 lg:p-12 ">
        <h1 className="text-xl font-bold text-center mb-6 sm:text-lg">FAQS</h1>

        <h2 className="text-lg font-semibold mt-4 sm:text-base">
          1. Who are we and what is this?
        </h2>
        <p className="text-xs sm:text-xs">
          As a project, we NIMS students created this platform where people can
          bet with one other on any event. We have streamlined the procedure and
          are resolving trust issues.
        </p>

        <h2 className="text-lg font-semibold mt-4 sm:text-base">
          2. How do I place a bid?
        </h2>
        <p className="text-xs sm:text-xs">
          Any event bid at the specified odd will trigger an alert, informing
          other users that someone is attempting to bet on any team. The
          player's bid will be accepted if others accept it; if not, the money
          will be returned to your wallet.
        </p>

        <h2 className="text-lg font-semibold mt-4 sm:text-base">
          3. How long will it take for the update to happen automatically?
        </h2>
        <p className="text-xs sm:text-xs">
          After a minute, the website will update, putting money in your wallet
          and, if the alert created is not matched, returning the money to your
          wallet.
        </p>

        <h2 className="text-lg font-semibold mt-4 sm:text-base">
          4. How can one follow us and get in touch with us for any problems?
        </h2>
        <p className="text-xs sm:text-xs">
          Reach us via email at{" "}
          <a href="mailto:sindhumaira001@gmail.com">sindhumaira001@gmail.com</a>{" "}
          or on Telegram group or Instagram at the "Khelospardha".
        </p>

        <h2 className="text-lg font-semibold mt-4 sm:text-base">
          5. What are typical problems with payments?
        </h2>
        <p className="text-xs sm:text-xs">
          Always pay using the most recent QR code to prevent payment errors; we
          won't be held accountable if you make a mistaken payment.
        </p>
      </div>
    </div>
  );
};

export default FAQsPage;
