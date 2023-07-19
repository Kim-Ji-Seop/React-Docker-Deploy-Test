export function formatTime(responseTime) {
  const parsedTime = new Date(responseTime);
  const formattedTime = parsedTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  return formattedTime;
}

export function formatMenuList(menuList) {
  const formattedMenuString = menuList
    .map((item) => `${item.menuName} ${item.menuCnt}개`)
    .join(" / ");
  return formattedMenuString;
}

export function getTimeDifferenceMessage(responseTime) {
  const pickupTime = new Date(responseTime);
  const currentTime = new Date();
  const timeDifference = pickupTime.getTime() - currentTime.getTime();
  const minutesDifference = Math.floor(timeDifference / 1000 / 60);

  let timeMessage = "";
  if (minutesDifference > 0) {
    timeMessage = `${minutesDifference}분 남음`;
  } else {
    timeMessage = `${Math.abs(minutesDifference)}분 지남`;
  }

  return timeMessage;
}
