export default class TotalSummary {
  readonly weekTotalDuration: number;
  readonly weekTotalEvents: number;
  readonly weekLongestName: string;
  constructor(totalDuration: number, totalEvents: number, longestName: string) {
    this.weekTotalDuration = totalDuration;
    this.weekTotalEvents = totalEvents;
    this.weekLongestName = longestName;
  }
}