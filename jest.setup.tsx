import '@testing-library/jest-dom';
if (typeof window === 'undefined') {
  const { Request, fetch } = require('undici');

  (global as any).Request = Request;
  (global as any).fetch = fetch;
} else {
  const React = require('react');

  // ------------------------------
  // 🧩 MUI COMPONENT MOCKS
  // ------------------------------

  const VALID_DOM_PROPS = [
    'id',
    'className',
    'style',
    'type',
    'value',
    'name',
    'onClick',
    'onChange',
    'disabled',
    'placeholder',
    'htmlFor',
    'aria-label',
    'aria-labelledby',
    'role',
    'src',
    'alt',
    'href',
    'target',
    'rel',
    'data-testid',
    'children',
  ];

  const mockComponent = (name: string) => {
    return ({ children, ...props }: any) => {
      const safeProps = Object.fromEntries(
        Object.entries(props).filter(([key]) => VALID_DOM_PROPS.includes(key))
      );
      return React.createElement('div', { 'data-testid': name, ...safeProps }, children);
    };
  };

  jest.mock('@mui/material', () => ({
    __esModule: true,
    Box: mockComponent('Box'),
    IconButton: ({ children, ...props }: any) =>
      React.createElement(
        'button',
        {
          'data-testid': 'IconButton',
          role: 'button',
          'aria-label': props['aria-label'] || 'icon',
          ...props,
        },
        children
      ),
    Select: mockComponent('Select'),
    MenuItem: mockComponent('MenuItem'),
    InputLabel: mockComponent('InputLabel'),
    FormControl: mockComponent('FormControl'),
    Divider: mockComponent('Divider'),
    Paper: mockComponent('Paper'),
    Typography: mockComponent('Typography'),
    Card: mockComponent('Card'),
    CardContent: mockComponent('CardContent'),
    Button: mockComponent('Button'),
    List: mockComponent('List'),
    ListItem: mockComponent('ListItem'),
    ListItemText: mockComponent('ListItemText'),
    Container: mockComponent('Container'),
  }));

  // ------------------------------
  // 🧩 ICON MOCKS
  // ------------------------------

  const mockIcon = (name: string) => {
    return () => React.createElement('svg', { 'data-testid': name });
  };

  jest.mock('@mui/icons-material/Menu', () => ({
    __esModule: true,
    default: mockIcon('MenuIcon'),
  }));

  jest.mock('@mui/icons-material/ArrowForwardIos', () => ({
    __esModule: true,
    default: mockIcon('ArrowForwardIosIcon'),
  }));

  // ------------------------------
  // 🧩 next/image mock
  // ------------------------------

  const VALID_IMG_ATTRIBUTES = [
    'alt',
    'src',
    'srcSet',
    'sizes',
    'crossOrigin',
    'useMap',
    'isMap',
    'width',
    'height',
    'loading',
    'decoding',
    'referrerPolicy',
    'className',
    'id',
    'style',
    'title',
    'onLoad',
    'onError',
    'draggable',
    'aria-label',
    'aria-hidden',
    'data-testid',
    'role',
  ];

  const filterImgProps = (props: Record<string, any>) =>
    Object.fromEntries(Object.entries(props).filter(([key]) => VALID_IMG_ATTRIBUTES.includes(key)));

  jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => React.createElement('img', filterImgProps(props)),
  }));

  // ------------------------------
  // 🧩 next/link mock
  // ------------------------------

  jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ href, children }: any) => React.createElement('a', { href }, children),
  }));

  jest.mock('@/services/dashboard', () => ({
    fetchDashboardData: jest.fn(),
  }));
}
