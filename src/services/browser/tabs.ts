export async function getBrowserTabs() {
  return await chrome.tabs.query({ currentWindow: true });
}

export async function getBrowserWindows() {
  return await chrome.windows.getAll();
}