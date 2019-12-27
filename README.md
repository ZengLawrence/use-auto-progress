# use-auto-progress

> React hook for value and related control functions for displaying Progress component, which can progress by itself.

[![NPM](https://img.shields.io/npm/v/use-auto-progress.svg)](https://www.npmjs.com/package/use-auto-progress) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-auto-progress
```

## Usage

```tsx
import * as React from 'react'

import useAutoProgress from 'use-auto-progress'

const Example = () => {
  const [value, setStart, running] = useAutoProgress();

  const toggle = () => {
    const s = !running;
    setStart(s);
  };

  return (
    <div>
      <Button onClick={toggle}>{running ? 'Stop' : 'Start'}</Button>
      <Progress value={value}>{value}%</Progress>
    </div>
  )
}
```

## License

MIT © [ZengLawrence](https://github.com/ZengLawrence)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
