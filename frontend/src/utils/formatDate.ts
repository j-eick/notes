export function formatDate(dateString: string) {
  try {
    if (dateString) {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    } else {
      throw Error("Item has no date");
    }
  } catch (err) {
    console.error(err);
  }
}
