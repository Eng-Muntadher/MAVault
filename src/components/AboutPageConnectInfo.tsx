import { Linkedin } from "lucide-react";

function AboutPageConnectInfo() {
  return (
    <section className="text-center flex flex-col items-center">
      <h3 className="text-(--text-color) text-2xl mb-4">Let's Connect</h3>
      <p className="text-(--input-placeholder) leading-6 mb-6 max-w-[644px]">
        I'm always interested in hearing about new opportunities,
        collaborations, or just connecting with fellow developers. Feel free to
        reach out!
      </p>
      <button
        aria-label="Visit my Linkedin account"
        className="flex gap-2 items-center bg-(--selected-btn-pagination) px-6 py-3 text-white rounded-[0.625rem] mb-16 cursor-pointer hover:bg-blue-700 hover:scale-105 transition-all"
      >
        <Linkedin size={20} aria-hidden="true" />
        <span>LinkedIn</span>
      </button>
    </section>
  );
}

export default AboutPageConnectInfo;
