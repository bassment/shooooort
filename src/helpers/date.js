export const formatDate = (date1, date2) => {
  const diff = Math.floor(date1.getTime() - date2.getTime());
  let secs = Math.floor(diff / 1000);
  let mins = Math.floor(secs / 60);
  let hours = Math.floor(mins / 60);
  let days = Math.floor(hours / 24);
  let months = Math.floor(days / 31);
  const years = Math.floor(months / 12);
  months = Math.floor(months % 12);
  days = Math.floor(days % 31);
  hours = Math.floor(hours % 24);
  mins = Math.floor(mins % 60);
  secs = Math.floor(secs % 60);

  let message = '';
  if (days <= 0) {
    if (hours > 0) {
      message += `${hours} hours `;
    } else if (mins > 0) {
      message += `${mins} minutes `;
    } else {
      message += `${secs} seconds `;
    }
  } else {
    message += `${days} days `;
    if (months > 0 || years > 0) {
      message += `${months} months `;
    }
    if (years > 0) {
      message += `${years} years ago`;
    }
  }

  return message;
};

