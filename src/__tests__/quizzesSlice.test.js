import testStrReducer, { setStrValue } from '../store/testStr/testStrSlice';

describe('testStrSlice', () => {
  it('should handle setStrValue action', () => {
    const initialState = {
      strValue: 'test1',
    };

    const newValue = 'updatedValue';

    const newState = testStrReducer(initialState, setStrValue(newValue));

    expect(newState.strValue).toBe(newValue);
  });
});
