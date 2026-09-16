type AnalyticsEvent = {
  action: string;
  destination: "whatsapp" | "skool";
  label: string;
  course?: string;
  track?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const measurementId = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY"] as
  | string
  | undefined;

export function initializeAnalytics() {
  if (typeof window === "undefined" || !measurementId || window.gtag) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
}

export function trackOutbound({ action, destination, label, course, track }: AnalyticsEvent) {
  window.gtag?.("event", action, {
    destination,
    link_text: label,
    course_name: course,
    course_track: track,
    transport_type: "beacon",
  });
}