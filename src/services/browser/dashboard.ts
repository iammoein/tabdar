export const openDashboard = (path = "") => {
  return chrome.tabs.create({
    url: `${chrome.runtime.getURL("dashboard.html")}#/${path}`,
  });
};
