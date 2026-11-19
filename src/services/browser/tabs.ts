export async function getBrowserTabs() {
  return await chrome.tabs.query({ currentWindow: true });
}

export async function getBrowserWindows() {
  return await chrome.windows.getAll();
}

export async function closeTabs(ids: number[]) {
  await chrome.tabs.remove(ids);
}

type RestoreTab = {
  url: string;
};

export async function restoreTabs(tabs: RestoreTab[]): Promise<number[]> {
  const restorTabIds: number[] = [];

  for (const tab of tabs) {
    const createTab = await chrome.tabs.create({ url: tab.url, active: false });

    if (createTab.id !== undefined) {
      restorTabIds.push(createTab.id);
    }
  }
  return restorTabIds;
}

export async function getAllTabs() {
  return await chrome.tabs.query({});
}
