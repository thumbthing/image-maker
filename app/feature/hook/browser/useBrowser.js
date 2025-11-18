'use client';

import { useEffect, useState } from "react";

const BROWSER = [
  "Chrome",
  "Firefox",
  "Safari"
];

const CHROMIUM_BROWSER = [
  "Whale",
  "Edg"
];

export function getChromiumBrowser(userAgent) {
  const chromiumBrowser = CHROMIUM_BROWSER.find((browser) => userAgent.includes(browser));
  
  if (!chromiumBrowser) {
    return BROWSER[0];
  }

  return chromiumBrowser;
}


export default function useBrowser() {
  const [browser, setBrowser] = useState("");

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const browserInfo = BROWSER.find((browser) => userAgent.includes(browser));

    if (browserInfo === BROWSER[0]) {
      setBrowser(getChromiumBrowser(userAgent));
    } else {
      setBrowser(browserInfo);
    }
  }, []);

  return browser;
}