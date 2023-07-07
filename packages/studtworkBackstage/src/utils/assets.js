import search from "../assets/layout/search.svg";
import notification from "../assets/layout/notification.svg";
import theme from "../assets/layout/theme.svg";
import setting from "../assets/layout/setting.svg";
import motif from "../assets/layout/motif.svg";
import avatar from "../assets/layout/avatar.png";

import { changeTheme } from ".";

export const avatarGroup = [
  {
    src: search,
    onPress: () => {},
  },
  {
    src: notification,
    onPress: () => {},
  },
  {
    src: theme,
    onPress: () => {
      changeTheme();
    },
  },
  {
    src: setting,
    onPress: () => {},
  },
  {
    src: motif,
    onPress: () => {},
  },
  {
    src: avatar,
    onPress: () => {},
  },
];
