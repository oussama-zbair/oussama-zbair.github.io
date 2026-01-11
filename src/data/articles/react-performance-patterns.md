# Modern React Performance Patterns: From Hooks to Concurrent Features

React has evolved significantly since its introduction, and with it, the patterns and practices for building performant applications. This comprehensive guide explores modern React performance patterns, from fundamental hooks optimization to cutting-edge concurrent features.

## Understanding React's Rendering Behavior

Before diving into optimization patterns, it's crucial to understand how React renders components. React re-renders a component when:

1. State changes within the component
2. Props change from parent component
3. Parent component re-renders (by default)
4. Context value changes

This understanding forms the foundation for all performance optimizations.

## Custom Hooks for Reusable Logic

Custom hooks are the cornerstone of modern React development. They allow you to extract component logic into reusable functions:

```jsx
function useApi(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
}
```

This hook encapsulates common API fetching logic with proper cleanup and error handling.

## Optimizing Context Usage

Context is powerful but can cause performance issues if not used carefully. Here's how to optimize context usage:

```jsx
// Split contexts by update frequency
const UserContext = createContext();
const ThemeContext = createContext();

// Use multiple providers instead of one large context
function AppProviders({ children }) {
  return (
    <UserProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </UserProvider>
  );
}

// Optimize context with useMemo
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState({});

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    user,
    setUser,
    preferences,
    setPreferences,
    updatePreference: (key, value) => {
      setPreferences(prev => ({ ...prev, [key]: value }));
    }
  }), [user, preferences]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook for consuming context
function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
```

## Memoization Strategies

React provides several memoization tools. Use them strategically:

### React.memo for Component Memoization

```jsx
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: true,
      timestamp: Date.now()
    }));
  }, [data]);

  return (
    <div>
      {processedData.map(item => (
        <ItemComponent 
          key={item.id} 
          item={item} 
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function
  return (
    prevProps.data === nextProps.data &&
    prevProps.onUpdate === nextProps.onUpdate
  );
});
```

### useMemo for Expensive Calculations

```jsx
function DataVisualization({ rawData, filters }) {
  const processedData = useMemo(() => {
    console.log('Processing data...'); // This should only log when dependencies change
    
    return rawData
      .filter(item => {
        return Object.entries(filters).every(([key, value]) => {
          return !value || item[key] === value;
        });
      })
      .map(item => ({
        ...item,
        calculated: performExpensiveCalculation(item)
      }))
      .sort((a, b) => b.calculated - a.calculated);
  }, [rawData, filters]);

  return (
    <div>
      {processedData.map(item => (
        <DataPoint key={item.id} data={item} />
      ))}
    </div>
  );
}
```

### useCallback for Function Memoization

```jsx
function TodoList({ todos, onToggle, onDelete }) {
  const [filter, setFilter] = useState('all');

  // Memoize the filter function to prevent child re-renders
  const handleToggle = useCallback((id) => {
    onToggle(id);
  }, [onToggle]);

  const handleDelete = useCallback((id) => {
    onDelete(id);
  }, [onDelete]);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div>
      <FilterButtons filter={filter} onFilterChange={setFilter} />
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
```

## Virtualization for Large Lists

When dealing with large datasets, virtualization is essential:

```jsx
import { FixedSizeList as List } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <ItemComponent item={items[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={80}
      width="100%"
    >
      {Row}
    </List>
  );
}

// For dynamic heights
import { VariableSizeList as List } from 'react-window';

function DynamicVirtualizedList({ items }) {
  const getItemSize = useCallback((index) => {
    // Calculate height based on content
    return items[index].content.length > 100 ? 120 : 80;
  }, [items]);

  const Row = ({ index, style }) => (
    <div style={style}>
      <ItemComponent item={items[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={getItemSize}
      width="100%"
    >
      {Row}
    </List>
  );
}
```

## Code Splitting and Lazy Loading

Implement strategic code splitting to reduce initial bundle size:

```jsx
import { lazy, Suspense } from 'react';

// Lazy load components
const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));
const Settings = lazy(() => import('./Settings'));

// Lazy load with named exports
const Analytics = lazy(() => 
  import('./Analytics').then(module => ({ default: module.Analytics }))
);

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

// Preload components on hover
function NavigationLink({ to, children, preloadComponent }) {
  const handleMouseEnter = () => {
    if (preloadComponent) {
      preloadComponent();
    }
  };

  return (
    <Link to={to} onMouseEnter={handleMouseEnter}>
      {children}
    </Link>
  );
}

// Usage
<NavigationLink 
  to="/dashboard" 
  preloadComponent={() => import('./Dashboard')}
>
  Dashboard
</NavigationLink>
```

## Concurrent Features

React 18 introduced concurrent features that can significantly improve user experience:

### Transitions

```jsx
import { startTransition, useTransition } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (newQuery) => {
    // Urgent update - immediate
    setQuery(newQuery);
    
    // Non-urgent update - can be interrupted
    startTransition(() => {
      setResults(performSearch(newQuery));
    });
  };

  return (
    <div>
      <input 
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      
      {isPending && <div>Searching...</div>}
      
      <div className={isPending ? 'opacity-50' : ''}>
        {results.map(result => (
          <SearchResult key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
}
```

### useDeferredValue

```jsx
import { useDeferredValue, useMemo } from 'react';

function ProductList({ searchTerm }) {
  const deferredSearchTerm = useDeferredValue(searchTerm);
  
  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(deferredSearchTerm.toLowerCase())
    );
  }, [deferredSearchTerm]);

  return (
    <div>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

## Error Boundaries and Suspense

Implement robust error handling and loading states:

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <details>
            {this.state.error && this.state.error.toString()}
          </details>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage with Suspense
function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<AppSkeleton />}>
        <MainApp />
      </Suspense>
    </ErrorBoundary>
  );
}
```

## Performance Monitoring

Implement performance monitoring to identify bottlenecks:

```jsx
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  // Log performance metrics
  console.log('Component:', id);
  console.log('Phase:', phase);
  console.log('Actual duration:', actualDuration);
  console.log('Base duration:', baseDuration);
  
  // Send to analytics service
  if (actualDuration > 16) { // More than one frame
    analytics.track('slow_render', {
      component: id,
      duration: actualDuration,
      phase
    });
  }
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Header />
      <Main />
      <Footer />
    </Profiler>
  );
}

// Custom hook for performance monitoring
function usePerformanceMonitor(componentName) {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (duration > 100) { // Log slow components
        console.warn(`${componentName} took ${duration}ms to unmount`);
      }
    };
  }, [componentName]);
}
```

## Advanced Patterns

### Compound Components

```jsx
function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

Modal.Header = ({ children }) => (
  <div className="modal-header">{children}</div>
);

Modal.Body = ({ children }) => (
  <div className="modal-body">{children}</div>
);

Modal.Footer = ({ children }) => (
  <div className="modal-footer">{children}</div>
);

// Usage
<Modal isOpen={isOpen} onClose={closeModal}>
  <Modal.Header>
    <h2>Confirm Action</h2>
  </Modal.Header>
  <Modal.Body>
    <p>Are you sure you want to proceed?</p>
  </Modal.Body>
  <Modal.Footer>
    <button onClick={closeModal}>Cancel</button>
    <button onClick={handleConfirm}>Confirm</button>
  </Modal.Footer>
</Modal>
```

### Render Props Pattern

```jsx
function DataFetcher({ url, children }) {
  const { data, loading, error } = useApi(url);
  
  return children({ data, loading, error });
}

// Usage
<DataFetcher url="/api/users">
  {({ data, loading, error }) => {
    if (loading) return <Spinner />;
    if (error) return <ErrorMessage error={error} />;
    return <UserList users={data} />;
  }}
</DataFetcher>
```

## Conclusion

Modern React performance optimization requires a deep understanding of React's rendering behavior and strategic application of various patterns and techniques. Key takeaways:

1. **Measure First**: Use React DevTools Profiler to identify actual bottlenecks
2. **Memoize Strategically**: Don't over-optimize; memoization has costs too
3. **Split Code Intelligently**: Lazy load based on user behavior and route boundaries
4. **Embrace Concurrent Features**: Use transitions and deferred values for better UX
5. **Monitor Performance**: Implement monitoring to catch regressions early

The React ecosystem continues to evolve, and staying current with these patterns will help you build applications that scale efficiently and provide excellent user experiences.