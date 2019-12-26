import { renderHook, act } from '@testing-library/react-hooks'
import useAutoProgressEffect from '.';

test('initialize hook returns [number, function]', () => {
  const { result } = renderHook(() => useAutoProgressEffect(false));

  // return [number, function]
  expect(result.current.length).toBe(2);

  const [value, setStart] = result.current;
  expect(value).toBe(0);
  expect(setStart).toBeDefined();
});

test('change start from true to false should return change value to 100', () => {
  const { result } = renderHook(() => useAutoProgressEffect(true));

  {
    const [value, setStart] = result.current;
    expect(value).toBe(0);
    expect(setStart).toBeDefined();
  }

  act(() => {
    const setStart = result.current[1];
    setStart(false);
  })
  {
    const [value] = result.current;
    expect(value).toBe(100);
  }
});

test('set start to true to start progress value from 0, 25, 50, 75 to 90, then set start to false to stop and get back 100', () => {
  const { result, waitForNextUpdate } = renderHook(() => useAutoProgressEffect(false));

  {
    const [value, setStart] = result.current;
    expect(value).toBe(0);
    expect(setStart).toBeDefined();
  }

  act(() => {
    const setStart = result.current[1];
    setStart(true);
  })

  waitForNextUpdate().then(() => {
    const [value] = result.current;
    expect(value).toBe(25);
  });

  waitForNextUpdate().then(() => {
    const [value] = result.current;
    expect(value).toBe(50);
  });

  waitForNextUpdate().then(() => {
    const [value] = result.current;
    expect(value).toBe(75);
  });

  waitForNextUpdate().then(() => {
    const [value] = result.current;
    expect(value).toBe(90);

    // last value, stop progress
    act(() => {
      const setStart = result.current[1];
      setStart(false);
    })
    {
      const [value] = result.current;
      expect(value).toBe(100);
    }
  });

});

test('restart should reset value to 0', () => {
  const { result } = renderHook(() => useAutoProgressEffect(true));

  {
    const [value, setStart] = result.current;
    expect(value).toBe(0);
    expect(setStart).toBeDefined();
  }

  act(() => {
    const setStart = result.current[1];
    setStart(false);
  });

  {
    const [value] = result.current;
    expect(value).toBe(100);
  }

  // restart
  act(() => {
    const setStart = result.current[1];
    setStart(true);
  });
  // expect to result to 0
  {
    const [value] = result.current;
    expect(value).toBe(0);
  }

});
