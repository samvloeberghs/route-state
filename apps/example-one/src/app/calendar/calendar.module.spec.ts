import { CalendarModule } from './calendar.module';

describe('BModule', () => {
  let calendarModule: CalendarModule;

  beforeEach(() => {
    calendarModule = new CalendarModule();
  });

  it('should create an instance', () => {
    expect(calendarModule).toBeTruthy();
  });
});
