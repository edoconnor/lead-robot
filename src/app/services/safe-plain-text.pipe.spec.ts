import { SafePlainTextPipe } from './safe-plain-text.pipe';

describe('SafePlainTextPipe', () => {
  it('create an instance', () => {
    const pipe = new SafePlainTextPipe();
    expect(pipe).toBeTruthy();
  });
});
