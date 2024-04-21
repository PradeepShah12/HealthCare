import { Locale, format, parseISO } from "date-fns"
import I18n from "i18n-js"

import ar from "date-fns/locale/ar-SA"
import ko from "date-fns/locale/ko"
import en from "date-fns/locale/en-US"
import moment from 'moment';

type Options = Parameters<typeof format>[2]

const getLocale = (): Locale => {
  const locale = I18n.currentLocale().split("-")[0]
  return locale === "ar" ? ar : locale === "ko" ? ko : en
}

export const formatDate = (date: string, dateFormat?: string, options?: Options) => {
  const locale = getLocale()
  const dateOptions = {
    ...options,
    locale,
  }
  return format(parseISO(date), dateFormat ?? "MMM dd, yyyy", dateOptions)
}




export const TimeDiffrence = t2 => {
  const t1 = new Date().getTime();
  const ts = (t1 - t2.getTime()) / 1000;

  const d = Math.floor(ts / (3600 * 24));
  const h = Math.floor((ts % (3600 * 24)) / 3600);
  const m = Math.floor((ts % 3600) / 60);
  const s = Math.floor(ts % 60);

  if (d > 2) {
    return moment(t2).format('DD MMM');
  } else if (d >= 1) {
    return `${d} ${d === 1 ? 'day' : 'days'} ago`;
  } else if (h >= 1) {
    return `${h} ${h === 1 ? 'hr' : 'hrs'} ago`;
  } else if (m >= 1) {
    return `${m} ${m === 1 ? 'min' : 'mins'} ago`;
  } else {
    return `${s} ${s === 1 ? 'second' : 'seconds'} ago`;
  }
};
