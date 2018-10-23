/**
 * 月份选择器
 * 1、就是只能选择月份
 2、选择的是下个月的，本月不行
 3、选择下个月的，必须是提前10天，例如我想选
    择11月的，就必须在10月21号（包括10月21号）
    前选，如果超过21号，例如今天22号，就只能选12月的了
 */
import moment from "moment/moment";

export default function monthSelector () {
    const beforeDays = 10; // 需要提前的天数
    const dateList = []; // 存放可以选择的年月

    function _init() {
        const currYear = moment().get('year');
        const currMonth = moment().get('month');
        const currDate = moment().get('date');
        const nextDate = currDate + beforeDays;
        const nextMoment = moment().year(currYear).month(currMonth).date(nextDate);
        _getDateList(currYear, currMonth, nextMoment);
    }
    // 获得可以选择的时间列表
    function _getDateList(currYear, currMonth, nextMoment) {
        const nextYear = nextMoment.get('year');
        const nextMonth = nextMoment.get('month');
        const startMomentArr = _calculateStartTime(currYear, currMonth, nextYear, nextMonth);
        const EndYear = currYear + 2;
        let year = startMomentArr[0];
        let month = startMomentArr[1];
        while (year <= EndYear) {
            month++;
            const currStr = year + month.toString().padStart(2, '0');
            nextMoment = moment().year(year).month(month);
            year = nextMoment.get('year');
            month = nextMoment.get('month');
            dateList.push(currStr);
        }
    }
    // 计算可以选择的初始时间
    function _calculateStartTime(currYear, currMonth, nextYear, nextMonth) {
        const result = [];
        if ((currYear === nextYear) && (currMonth === nextMonth)) {
            // 从今年下个月开始
            result.push(nextYear, currMonth + 1);
        } else if ((currYear === nextYear) && (currMonth + 1 === nextMonth)) {
            // 从今年下下个月开始
            result.push(nextYear, nextMonth + 1);
        } else if ((currYear + 1 === nextYear)) {
            // 跨年了
            // 0 是1月， 1是2月
            result.push(nextYear, 1);
        }
        return result;
    }
    _init();
    return dateList;
}

