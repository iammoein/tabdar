export type Collection = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  tabs: CollectionTab[]
};

export type CollectionTab = {
  title: string;
  url: string;
  favIconUrl?: string;
};
