import { CONTACT } from "@/lib/data";

export function WhatsAppFab() {
  return (
    <a
      href={CONTACT.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-deep text-paper shadow-[0_12px_30px_-8px_rgba(46,138,184,0.5)] transition-transform hover:scale-105 hover:bg-brand focus-visible:ring-4 focus-visible:ring-brand/30"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-6 w-6"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 01-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 01-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.717.315-.601.662-.945 1.49-.945 2.39 0 .24.03.481.08.722.244 1.176.914 2.254 1.682 3.17 1.198 1.433 3.137 2.878 5.12 3.42.525.143 1.047.23 1.58.23.98 0 2.137-.343 2.752-1.047.315-.372.45-.78.45-1.236 0-.235-.057-.472-.145-.687-.172-.372-1.205-.93-1.576-1.006a3.205 3.205 0 00-.55-.086zM16.06 4.29c-6.53 0-11.82 5.29-11.82 11.82 0 2.088.544 4.125 1.593 5.92L4 29l7.13-1.82a11.768 11.768 0 004.93 1.073c6.53 0 11.82-5.29 11.82-11.82 0-6.53-5.29-11.82-11.82-11.82zm.018 21.8a9.96 9.96 0 01-5.09-1.392l-.36-.215-3.77.972 1.006-3.653-.243-.386a9.977 9.977 0 01-1.52-5.305c0-5.514 4.49-10.004 10.004-10.004 5.514 0 10.004 4.49 10.004 10.004 0 5.514-4.49 10.004-10.03 10.004z" />
      </svg>
      <span className="sr-only">Chat on WhatsApp</span>
      {/* Tooltip */}
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-[0.75rem] text-paper opacity-0 transition-opacity group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  );
}
