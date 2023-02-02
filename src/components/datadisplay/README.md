# Data Display

## Exported components

1. Avatar
2. Icon
3. List
4. NameCard
5. Chip

### Avatar

#### Usage

```javascript
import { Avatar } from 'components/datadisplay';

<Avatar />
```

#### Props

Inherits [Image Props](https://reactnative.dev/docs/image#props), [Anchor Props]()

|           |  Type  | Description |
|:----------|:-------|:------------|
| size?     | number|string | The avatar dimensions (height and width) |
| initials? | string | Name initials to show incase there's no image source |
| initialStyle
