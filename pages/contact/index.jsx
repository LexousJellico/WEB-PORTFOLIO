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
    message: "Message sent successfully. I received it in my email.",
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
    return "border-green-400/30 bg-green-400/10 text-green-200";
  }

  if (type === "info") {
    return "border-yellow-300/30 bg-yellow-300/10 text-yellow-100";
  }

  return "border-red-400/30 bg-red-400/10 text-red-200";
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
        type: "success",
        message: data.message || "Message sent successfully. I received it in my email.",
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
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-accent">Contact terminal</p>
          <h2 className="h2 mb-4">
            Let&apos;s <span className="text-accent">connect.</span>
          </h2>
          <p className="mx-auto mb-5 max-w-[440px] text-sm leading-6 text-white/62 sm:text-base xl:mx-0">
            Send your name, email, subject, and message. The form now sends the message directly to my email through the secure server API.
          </p>

          <div className="grid gap-3 text-left">
            <div className="cyber-panel rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <span className="block text-[10px] uppercase tracking-[0.22em] text-accent/80">Direct email</span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-1 inline-block break-all text-sm text-white/72 transition-colors hover:text-accent"
              >
                {siteConfig.email}
              </a>
            </div>
            <div className="cyber-panel rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <span className="block text-[10px] uppercase tracking-[0.22em] text-accent/80">Location / phone</span>
              <p className="mt-1 text-sm text-white/62">
                {siteConfig.location} • {siteConfig.phone}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn("down", 0.35)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="cyber-panel relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] p-4 text-left shadow-[0_24px_90px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-6"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

          <div className="relative mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.26em] text-accent/80">Email dispatch</p>
              <h3 className="mt-1 text-xl font-semibold text-white">Send a message</h3>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/45">
              SMTP ready
            </span>
          </div>

          <form
            className="relative flex min-h-0 flex-col gap-4"
            onSubmit={handleSubmit}
            autoComplete="on"
            name="contact"
            method="POST"
            action={contactEndpoint}
            aria-describedby={status.message ? "contact-status" : "contact-help"}
            aria-busy={isLoading}
            noValidate={false}
          >
            <p id="contact-help" className="text-xs leading-5 text-white/45">
              All fields are required. Your email will be used as the reply-to address.
            </p>

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
                className={`${getStatusClassName(status.type)} rounded-2xl border px-4 py-3 text-sm`}
                role={status.type === "error" ? "alert" : "status"}
                aria-live="polite"
              >
                {status.message}
              </p>
            )}

            <button
              type="submit"
              className="btn group relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-full border border-white/50 px-8 transition-all duration-300 hover:border-accent disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:w-auto sm:max-w-[210px] xl:mx-0"
              disabled={isLoading}
            >
              <span className="transition-all duration-500 group-hover:-translate-y-[120%] group-hover:opacity-0">
                {isLoading ? "Sending..." : "Send message"}
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
  const contactStatus = Array.isArray(query.contact) ? query.contact[0] : query.contact;

  return {
    props: {
      initialStatus: serverStatusMessages[contactStatus] || emptyStatus,
    },
  };
}

export default Contact;
