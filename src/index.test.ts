import { renderHook, act } from '@testing-library/react-hooks'
import useAutoProgress from '.';

const FINAL_VALUE = 100;

test('initialize hook returns [number, function, boolean]', () => {
  const { result } = renderHook(() => useAutoProgress());

  // return [number, function]
  expect(result.current.length).toBe(3);

  const [value, setStart, running] = result.current;
  expect(value).toBe(0);
  expect(setStart).toBeDefined();
  expect(running).toBeFalsy();
});

test('change start from true to false should return change value to 100 and running to be true', async () => {
  const { result, wait } = renderHook(() => useAutoProgress({intervalMs: 10}));

  {
    const [value, setStart, running] = result.current;
    expect(value).toBe(0);
    expect(setStart).toBeDefined();
    expect(running).toBeFalsy();
  }

  act(() => {
    const setStart = result.current[1];
    setStart(true);
  })
  {
    const running = result.current[2];
    expect(running).toBeTruthy();
  }

  await wait(() => {
    const [value] = result.current;
    return value === 90;
  });
  act(() => {
    const setStart = result.current[1];
    setStart(false);
  })
  {
    const value = result.current[0];
    expect(value).toBe(FINAL_VALUE);
    const running = result.current[2];
    expect(running).toBeFalsy();
  }
});

test('set start to true to start progress value from 0 to 90 at 10 increments, then set start to false to stop and get back 100', async () => {
  const { result, wait } = renderHook(() => useAutoProgress({intervalMs: 10}));

  act(() => {
    const setStart = result.current[1];
    setStart(true);
  })

  await wait(() => {
    const expectedValues = [0, 10, 20, 30, 40, 50, 60, 70, 80];
    const [value] = result.current;
    if (expectedValues.find( v => v === value)) {
      return false; // continue to wait
    } else {
      return (value===90);  // 90 is the last value
    }
  });

  {
    const [value] = result.current;
    expect(value).toBe(90);

    // last value, stop progress
    act(() => {
      const setStart = result.current[1];
      setStart(false);
    })
    {
      const [value] = result.current;
      expect(value).toBe(FINAL_VALUE);
    }
  };

});

test('restart should reset value to 0', async () => {
  const { result, wait, waitForNextUpdate } = renderHook(() => useAutoProgress({intervalMs: 10}));

  // start
  act(() => {
    const setStart = result.current[1];
    setStart(true);
  });

  await wait(() => {
    const [value] = result.current;
    return value === 90;
  })
  act(() => {
    const setStart = result.current[1];
    setStart(false);
  });
  {
    const [value] = result.current;
    expect(value).toBe(FINAL_VALUE);
  }

  // restart
  act(() => {
    const setStart = result.current[1];
    setStart(true);
  });
  // expect to reset value to 0
  await waitForNextUpdate();
  {
    const [value] = result.current;
    expect(value).toBe(0);
  }

});
