export function setCookie(name: string, value: string, days: number) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function validateEmail(email: string) {
  // Regular expression for email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Test the email against the regular expression
  return emailRegex.test(email);
}

export function validateMobile(mobile: string) {
  // Regular expression for mobile number validation (India specific)
  const mobileRegex = /^[6-9]\d{9}$/;

  // Test the mobile number against the regular expression
  return mobileRegex.test(mobile);
}

export const date_DD_MMM_YYYY_HH_MM = (epochTimestamp: number) => {
  const date = new Date(epochTimestamp);
  const dateOptions: any = { year: "numeric", month: "short", day: "numeric" };
  const timeOptions: any = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  };

  const formattedDate = date.toLocaleDateString("en-IN", dateOptions);
  const formattedTime = date.toLocaleTimeString("en-IN", timeOptions);

  return `${formattedDate}, ${formattedTime}`;
};
