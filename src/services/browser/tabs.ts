export async function getBrowserTabs() {
  return await chrome.tabs.query({ currentWindow: true });
}

export async function getBrowserWindows() {
  return await chrome.windows.getAll();
}

export async function closeTabs(ids: Set<number>) {
  const tabIds = [...ids];
  await chrome.tabs.remove(tabIds);
}

type RestoreTab = {
  url: string;
};

export async function restoreTabs(tabs: RestoreTab[]): Promise<void> {
  for (const tab of tabs) {
    await chrome.tabs.create({ url: tab.url, active: false });
  }
}
