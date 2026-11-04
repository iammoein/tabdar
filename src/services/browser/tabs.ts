export async function getBrowserTabs() {
  return await chrome.tabs.query({ currentWindow: true });
}

export async function getBrowserWindows() {
  return await chrome.windows.getAll();
}

type RestoreTab = {
  url: string;
};

export async function restoreTabs(tabs: RestoreTab[]): Promise<void> {
  for (const tab of tabs) {
    await chrome.tabs.create({ url: tab.url ,active: false });
  }

}