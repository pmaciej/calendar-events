import getCalendarEvents, {CalendarEvent} from '../api-client';
import Day from './day';
import TotalSummary from './totalSummary';

export default function convertEvents(
  setTotal: (value: TotalSummary) => void,
  setDays: (value: Day[]) => void
) {
  const promises = [];
  const eventDates = new Array<string>(); 

  for (let i = 0; i < 7; ++i) {
    let today = new Date();
    today.setDate(today.getDate() + i);
    eventDates.push(today.toLocaleDateString());
    promises.push(getCalendarEvents(today));
  }

  Promise.all(promises).then((res) => {
    let totalObj: TotalSummary | undefined;
    let allDays = new Array<Day>();
    let longestEvent = 0;

    let weekTotalDuration = 0;
    let weekTotalEvents = 0;
    let weekLongestTitle = '';
    res.forEach((calendarEvents: Array<CalendarEvent>, index: number) => {
      let currentDate = eventDates[index];
      let eventsNumber = calendarEvents.length;
      weekTotalEvents += eventsNumber;
      let totalEventsDuration = 0;
      let max = 0;
      let longestEventTitle = '';
      calendarEvents.forEach((item: CalendarEvent) => {
        totalEventsDuration += item.durationInMinutes;
        if (item.durationInMinutes > max) {
          max = item.durationInMinutes;
          longestEventTitle = item.title;
        }
      });
      weekTotalDuration += totalEventsDuration;

      if (longestEvent < max) {
        longestEvent = max;
        weekLongestTitle = longestEventTitle;
      }
      allDays.push({
        currentDate,
        eventsNumber,
        totalEventsDuration,
        longestEventTitle,
      });
    });
    totalObj = new TotalSummary(
      weekTotalDuration,
      weekTotalEvents,
      weekLongestTitle
    );
    setTotal(totalObj);
    setDays(allDays);
  });
}
