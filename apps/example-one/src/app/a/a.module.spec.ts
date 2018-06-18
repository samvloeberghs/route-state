import { AModule } from './a.module';

describe('AModule', () => {
  let aModule: AModule;

  beforeEach(() => {
    aModule = new AModule();
  });

  it('should create an instance', () => {
    expect(aModule).toBeTruthy();
  });
});
