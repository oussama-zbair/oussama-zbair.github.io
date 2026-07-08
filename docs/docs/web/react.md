---
sidebar_position: 1
---

# React

## Overview

React is a declarative, component-based JavaScript library for building user interfaces, maintained by Meta. It uses a virtual DOM to efficiently reconcile and update the real DOM, and a unidirectional data flow model.

**Current version:** React 18 (concurrent rendering, Suspense, automatic batching)

---

## Core Concepts

### Components

Everything in React is a component — a pure function that takes props and returns JSX.

```jsx
// Functional component (modern standard)
function UserCard({ name, role, avatarUrl }) {
  return (
    <div className="card">
      <img src={avatarUrl} alt={name} />
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}
```

### JSX

JSX compiles to `React.createElement()` calls. Key rules:
- Return a single root element (use `<>` fragments to avoid extra DOM nodes).
- Use `className` not `class`, `htmlFor` not `for`.
- JavaScript expressions inside `{ }`.
- Self-close tags: `<img />`, `<br />`.

### Props

Props flow **down** from parent to child (unidirectional). They are read-only — never mutate props.

```jsx
// Destructure with defaults
function Button({ label = 'Click me', variant = 'primary', onClick }) {
  return <button className={`btn btn-${variant}`} onClick={onClick}>{label}</button>;
}
```

---

## Hooks

### useState

```jsx
const [count, setCount] = useState(0);
const [user, setUser] = useState(null);

// Functional update (safe when new state depends on previous)
setCount(prev => prev + 1);

// Object state — always spread to avoid losing fields
setUser(prev => ({ ...prev, name: 'Oussama' }));
```

### useEffect

```jsx
useEffect(() => {
  // Runs after render
  const subscription = subscribe(userId);

  // Cleanup — runs before next effect or on unmount
  return () => subscription.unsubscribe();
}, [userId]); // Re-runs when userId changes

// [] = run once on mount
// No array = run after every render (rarely what you want)
```

### useCallback & useMemo

```jsx
// Memoize a function reference (for stable prop identity)
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// Memoize an expensive computation
const sortedList = useMemo(() => {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}, [items]);
```

### useRef

```jsx
// DOM reference
const inputRef = useRef(null);
<input ref={inputRef} />
inputRef.current.focus();

// Mutable value that doesn't trigger re-render
const timerRef = useRef(null);
timerRef.current = setTimeout(() => {}, 1000);
```

### useContext

```jsx
const ThemeContext = createContext('light');

// Provider (high up the tree)
<ThemeContext.Provider value={theme}>
  <App />
</ThemeContext.Provider>

// Consumer (anywhere in the tree)
const theme = useContext(ThemeContext);
```

### Custom Hooks

Extract stateful logic into reusable hooks:

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStored = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStored];
}
```

---

## State Management

| Pattern | When to Use |
|---|---|
| `useState` | Local, simple state |
| `useReducer` | Complex state with multiple sub-values or transitions |
| `useContext` | Shared state without prop drilling (theme, auth, locale) |
| Zustand / Redux Toolkit | Global, complex application state |
| TanStack Query | Server state (fetching, caching, synchronisation) |

```jsx
// useReducer example
function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'reset':     return { count: 0 };
    default: throw new Error(`Unknown action: ${action.type}`);
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: 'increment' });
```

---

## Performance

### React.memo

Prevents re-render if props haven't changed (shallow comparison).

```jsx
const ExpensiveComponent = React.memo(function({ data }) {
  return <div>{/* render */}</div>;
});
```

### Code Splitting

```jsx
const LazyPage = lazy(() => import('./pages/HeavyPage'));

<Suspense fallback={<Spinner />}>
  <LazyPage />
</Suspense>
```

---

## Best Practices

- Keep components small and focused — if it's over ~100 lines, consider splitting.
- Derive state instead of duplicating it — if you can compute it from existing state, don't store it.
- Avoid deeply nested state — flat structures are easier to update.
- Key prop on lists must be stable and unique — not array index for reorderable lists.
- Co-locate state as close to where it's used as possible.
- Extract complex effects into custom hooks.

---

## Common Mistakes

- Mutating state directly: `state.items.push(x)` — always create new references.
- Missing dependency array in `useEffect` — causes stale closures.
- Using array index as `key` for lists that can be reordered or filtered.
- Overusing `useContext` for frequently changing state — causes unnecessary re-renders.
- Not cleaning up subscriptions, timers, or event listeners in `useEffect`.

---

## Interview Questions

**Q: What is the virtual DOM and how does reconciliation work?**
React keeps a lightweight in-memory representation of the DOM (virtual DOM). On state change, it re-renders the component tree in memory, diffs it against the previous virtual DOM (reconciliation), and applies only the minimal set of real DOM mutations.

**Q: What is the difference between controlled and uncontrolled components?**
Controlled components have their value driven by React state — React is the single source of truth. Uncontrolled components store their value in the DOM — accessed via `ref`. Use controlled for validation and dynamic forms; uncontrolled for simple, non-validated inputs.

**Q: When would you use useReducer over useState?**
When state has multiple sub-values that change together, when the next state depends on the previous in complex ways, or when you want to centralise state transitions for testability. `useReducer` also makes it easy to extract state logic outside the component.

---

## Cheat Sheet

```
useState(init)                  Local state
useEffect(fn, [deps])           Side effects
useCallback(fn, [deps])         Stable function reference
useMemo(() => value, [deps])    Memoised computation
useRef(init)                    DOM ref / mutable value
useContext(Context)             Consume context
useReducer(reducer, init)       Complex state

React.memo(Component)           Skip re-render if props unchanged
lazy(() => import(...))         Code split
<Suspense fallback={...}>       Async boundary
```
