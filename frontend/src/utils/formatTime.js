import { formatDistanceToNow } from "date-fns";

export const formatTimeAgo = (unixTimestamp) => {
  if (!unixTimestamp) return "";
  return formatDistanceToNow(new Date(unixTimestamp * 1000), { addSuffix: true });
};
