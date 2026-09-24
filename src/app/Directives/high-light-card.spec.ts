import { HighLightCard } from './high-light-card';

describe('HighLightCard', () => {
  it('should create an instance', () => {
    const elementRef = { nativeElement: document.createElement('div') };
    const directive = new HighLightCard(elementRef);
    expect(directive).toBeTruthy();
  });
});
