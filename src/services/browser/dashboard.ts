export const openDashboard = () => {
  return chrome.tabs.create({
    url: chrome.runtime.getURL("dashboard.html"),
  });
};