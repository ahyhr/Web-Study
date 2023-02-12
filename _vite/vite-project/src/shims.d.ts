export {};
declare module "vue" {
  interface ComponentCustomProperties {
    /**
     * 时间日期转换
     * @param date 当前时间，new Date() 格式
     * @param format 需要转换的时间格式字符串
     * @description format 字符串随意，如 `YYYY-mm、YYYY-mm-dd`
     * @description format 季度："YYYY-mm-dd HH:MM:SS QQQQ"
     * @description format 星期："YYYY-mm-dd HH:MM:SS WWW"
     * @description format 几周："YYYY-mm-dd HH:MM:SS ZZZ"
     * @description format 季度 + 星期 + 几周："YYYY-mm-dd HH:MM:SS WWW QQQQ ZZZ"
     * @returns 返回拼接后的时间字符串
     */
    $formatDate: (date: Date, format: string) => string;
    /**
     *
     * @param flag 是否显示
     * @returns boolen
     */
    $show: (flag: boolean) => boolean;
  }
}
