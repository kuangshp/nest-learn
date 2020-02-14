import * as moment from 'moment';
/**
 * @param dateNum 时间
 * @param isDue 是否显示时分秒
 * @return:
 * @Description: 格式化日期
 * @Author: 水痕
 * @LastEditors: 水痕
 * @Date: 2019-07-31 15:27:39
 */
export const formatDate = (
  dateNum: string | number,
  isDue = false,
): string => {
  if (!/^\d+$/.test(dateNum.toString())) {
    throw new TypeError(`${dateNum}传递的数据格式化错误`);
  }
  if (isDue) {
    return moment(dateNum).format('YYYY-MM-DD');
  } else {
    return moment(dateNum).format('YYYY-MM-DD HH:mm:ss');
  }
};
