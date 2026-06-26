import { motion } from "framer-motion";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

import ScreenFrame from "../../components/ScreenFrame";
import { siteConfig } from "../../data/siteConfig";
import { fadeIn } from "../../variants";

const emptyStatus = {
  type: "idle",
  message: "",
};

const contactEndpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact";

const serverStatusMessages = {
  sent: {
    type: "success",
    message: "Message submitted successfully. Thank you for reaching out.",
  },
  invalid: {
    type: "error",
    message: "Please complete all contact fields with valid information.",
  },
  "rate-limited": {
    type: "error",
    message: "Too many contact attempts. Please wait a few minutes before trying again.",
  },
  "delivery-error": {
    type: "error",
    message: `Unable to deliver the message right now. You can email me directly at ${siteConfig.email}.`,
  },
};

const getStatusClassName = (type) => {
  if (type === "success") {
    return "text-green-300";
  }

  if (type === "info") {
    return "text-yellow-200";
  }

  return "text-red-300";
};

const Contact = ({ initialStatus = emptyStatus }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(initialStatus);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus(emptyStatus);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to send your message.");
      }

      form.reset();
      setStatus({
        type: data.delivered === false ? "info" : "success",
        message:
          data.message ||
          "Message submitted successfully. Thank you for reaching out.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message ||
          `Unable to submit right now. You can email me directly at ${siteConfig.email}.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenFrame className="bg-primary/30" frameClassName="text-center xl:text-left">
      <div className="container desktop-safe-container relative z-10 mx-auto grid w-full items-center gap-6 px-5 sm:px-6 xl:grid-cols-[minmax(280px,0.45fr)_minmax(0,0.9fr)] xl:gap-10 xl:px-0">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mx-auto max-w-[520px] xl:mx-0"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-accent">
            Contact terminal
          </p>
          <h2 className="h2 mb-4">
            Let&apos;s <span className="text-accent">connect.</span>
          </h2>
          <p className="mx-auto mb-5 max-w-[480px] text-sm sm:text-base xl:mx-0">
            Send a message through the form or email me directly. The form is
            compact, validated, and ready for a webhook/email provider.
          </p>

          <div className="cyber-panel mx-auto max-w-[460px] rounded-3xl border border-white/10 bg-white/[0.035] p-4 text-left backdrop-blur-md xl:mx-0">
            <p className="mb-3 text-[10px] uppercase tracking-[0.26em] text-white/35">
              Direct channel
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="block break-all text-sm text-accent transition-colors duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {siteConfig.email}
            </a>
            <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-white/45">
              <span>{siteConfig.location}</span>
              <span aria-hidden="true">•</span>
              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                className="transition-colors duration-300 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn("up", 0.35)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="screen-card-height cyber-panel mx-auto flex w-full max-w-[700px] flex-col rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 shadow-[0_0_55px_rgba(241,48,36,0.08)] backdrop-blur-md sm:p-5 xl:mx-0"
        >
          <p id="contact-help" className="sr-only">
            All fields are required. The message must contain at least 10 characters.
          </p>

          <form
            className="flex h-full flex-col gap-4"
            onSubmit={handleSubmit}
            autoComplete="on"
            name="contact"
            method="POST"
            action={contactEndpoint}
            aria-describedby={status.message ? "contact-status" : "contact-help"}
            aria-busy={isLoading}
            noValidate={false}
          >
            <label className="sr-only" htmlFor="bot-field">
              Do not fill this field
            </label>
            <input
              id="bot-field"
              type="text"
              name="bot-field"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="sr-only" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input"
                  disabled={isLoading}
                  maxLength={80}
                  autoComplete="name"
                  required
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  className="input"
                  disabled={isLoading}
                  maxLength={120}
                  autoComplete="email"
                  inputMode="email"
                  required
                />
              </div>
            </div>

            <label className="sr-only" htmlFor="subject">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              placeholder="Subject"
              className="input"
              disabled={isLoading}
              maxLength={120}
              autoComplete="off"
              required
            />

            <label className="sr-only" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Message..."
              className="textarea flex-1"
              disabled={isLoading}
              required
              minLength={10}
              maxLength={2000}
              rows={5}
            />

            {status.message && (
              <p
                id="contact-status"
                className={`${getStatusClassName(
                  status.type,
                )} text-center text-sm xl:text-left`}
                role={status.type === "error" ? "alert" : "status"}
                aria-live="polite"
              >
                {status.message}
              </p>
            )}

            <button
              type="submit"
              className="btn group relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-full border border-white/50 px-8 transition-all duration-300 hover:border-accent disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:w-auto sm:max-w-[190px] xl:mx-0"
              disabled={isLoading}
            >
              <span className="transition-all duration-500 group-hover:-translate-y-[120%] group-hover:opacity-0">
                {isLoading ? "Sending..." : "Let's talk"}
              </span>

              <BsArrowRight
                className="absolute -translate-y-[120%] text-[22px] opacity-0 transition-all duration-300 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100"
                aria-hidden="true"
              />
            </button>
          </form>
        </motion.div>
      </div>
    </ScreenFrame>
  );
};

export async function getServerSideProps({ query }) {
  const contactStatus = Array.isArray(query.contact)
    ? query.contact[0]
    : query.contact;

  return {
    props: {
      initialStatus: serverStatusMessages[contactStatus] || emptyStatus,
    },
  };
}

export default Contact;
