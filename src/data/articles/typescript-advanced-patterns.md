# Advanced TypeScript Patterns for Enterprise Applications

TypeScript has evolved from a simple type layer over JavaScript into a sophisticated type system capable of expressing complex relationships and constraints. This guide explores advanced TypeScript patterns that enable you to build type-safe, maintainable enterprise applications.

## Understanding TypeScript's Type System

TypeScript's type system is structural, meaning types are compatible based on their shape rather than their explicit declaration. This foundation enables powerful patterns for enterprise development.

### Structural vs Nominal Typing

```typescript
// Structural typing - types are compatible if they have the same shape
interface User {
  id: number;
  name: string;
}

interface Person {
  id: number;
  name: string;
}

// These are compatible due to structural typing
const user: User = { id: 1, name: "John" };
const person: Person = user; // ✅ Valid

// Nominal typing simulation using brands
type UserId = number & { readonly brand: unique symbol };
type PersonId = number & { readonly brand: unique symbol };

function createUserId(id: number): UserId {
  return id as UserId;
}

function createPersonId(id: number): PersonId {
  return id as PersonId;
}

// Now they're not compatible
const userId = createUserId(1);
const personId = createPersonId(1);
// const mixed: UserId = personId; // ❌ Error
```

## Advanced Generic Patterns

### Conditional Types for API Responses

```typescript
// Base API response structure
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Conditional type for different response formats
type ApiResult<T, E = Error> = T extends null 
  ? ApiResponse<null> & { error: E }
  : ApiResponse<T> & { error?: never };

// Usage with different data types
type UserResult = ApiResult<User>;
type ErrorResult = ApiResult<null, string>;

// Advanced conditional type for nested API calls
type NestedApiCall<T> = T extends { id: infer U }
  ? U extends number
    ? ApiResult<T & { relatedData: RelatedData[] }>
    : ApiResult<T>
  : never;

// Generic API client with conditional return types
class ApiClient {
  async get<T>(url: string): Promise<ApiResult<T>> {
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      return {
        data,
        status: response.status,
        message: 'Success'
      } as ApiResult<T>;
    } catch (error) {
      return {
        data: null,
        status: 500,
        message: 'Error',
        error: error as Error
      } as ApiResult<null, Error>;
    }
  }
}
```

### Mapped Types for Form Validation

```typescript
// Base form field type
interface FormField<T> {
  value: T;
  error?: string;
  touched: boolean;
  validators: Array<(value: T) => string | undefined>;
}

// Mapped type to create form state from data model
type FormState<T> = {
  [K in keyof T]: FormField<T[K]>;
};

// Validation rules type
type ValidationRules<T> = {
  [K in keyof T]?: Array<(value: T[K]) => string | undefined>;
};

// User model
interface User {
  email: string;
  age: number;
  name: string;
  isActive: boolean;
}

// Generated form state
type UserFormState = FormState<User>;
// Results in:
// {
//   email: FormField<string>;
//   age: FormField<number>;
//   name: FormField<string>;
//   isActive: FormField<boolean>;
// }

// Form validation utility
class FormValidator<T> {
  private state: FormState<T>;
  
  constructor(initialData: T, rules: ValidationRules<T>) {
    this.state = this.initializeState(initialData, rules);
  }
  
  private initializeState<T>(data: T, rules: ValidationRules<T>): FormState<T> {
    const state = {} as FormState<T>;
    
    for (const key in data) {
      state[key] = {
        value: data[key],
        touched: false,
        validators: rules[key] || [],
        error: undefined
      };
    }
    
    return state;
  }
  
  validate<K extends keyof T>(field: K): string | undefined {
    const fieldState = this.state[field];
    
    for (const validator of fieldState.validators) {
      const error = validator(fieldState.value);
      if (error) {
        fieldState.error = error;
        return error;
      }
    }
    
    fieldState.error = undefined;
    return undefined;
  }
  
  validateAll(): boolean {
    let isValid = true;
    
    for (const key in this.state) {
      const error = this.validate(key);
      if (error) isValid = false;
    }
    
    return isValid;
  }
}
```

## Template Literal Types for API Endpoints

```typescript
// API endpoint patterns
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiVersion = 'v1' | 'v2';
type ResourceType = 'users' | 'orders' | 'products';

// Template literal type for API endpoints
type ApiEndpoint<V extends ApiVersion, R extends ResourceType> = `/api/${V}/${R}`;

// Specific endpoint types
type UserEndpoints = ApiEndpoint<'v1', 'users'>; // "/api/v1/users"
type OrderEndpoints = ApiEndpoint<'v2', 'orders'>; // "/api/v2/orders"

// More complex endpoint patterns with parameters
type EntityEndpoint<T extends string> = `/api/v1/${T}` | `/api/v1/${T}/${string}`;

// Type-safe API client using template literals
class TypedApiClient {
  async request<T>(
    method: HttpMethod,
    endpoint: ApiEndpoint<ApiVersion, ResourceType>,
    data?: unknown
  ): Promise<T> {
    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: data ? JSON.stringify(data) : undefined
    });
    
    return response.json();
  }
  
  // Type-safe methods
  getUsers() {
    return this.request<User[]>('GET', '/api/v1/users');
  }
  
  createOrder(order: CreateOrderRequest) {
    return this.request<Order>('POST', '/api/v2/orders', order);
  }
}

// Advanced template literal for SQL-like queries
type WhereClause<T> = {
  [K in keyof T]?: T[K] | { $gt: T[K] } | { $lt: T[K] } | { $in: T[K][] };
};

type QueryBuilder<T> = {
  select<K extends keyof T>(...fields: K[]): Pick<T, K>;
  where(clause: WhereClause<T>): QueryBuilder<T>;
  orderBy<K extends keyof T>(field: K, direction: 'ASC' | 'DESC'): QueryBuilder<T>;
  limit(count: number): QueryBuilder<T>;
};
```

## Utility Types for Enterprise Patterns

### Deep Readonly and Mutable Types

```typescript
// Deep readonly type
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Deep mutable type (opposite of DeepReadonly)
type DeepMutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P];
};

// Partial deep type
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Application state management
interface AppState {
  user: {
    profile: {
      name: string;
      email: string;
    };
    preferences: {
      theme: 'light' | 'dark';
      notifications: boolean;
    };
  };
  ui: {
    loading: boolean;
    errors: string[];
  };
}

// Immutable state
type ImmutableAppState = DeepReadonly<AppState>;

// State updates
type StateUpdate = DeepPartial<AppState>;

class StateManager {
  private state: ImmutableAppState;
  
  constructor(initialState: AppState) {
    this.state = initialState as ImmutableAppState;
  }
  
  update(updates: StateUpdate): void {
    this.state = this.deepMerge(this.state, updates) as ImmutableAppState;
  }
  
  private deepMerge<T>(target: T, source: DeepPartial<T>): T {
    // Implementation of deep merge
    const result = { ...target } as T;
    
    for (const key in source) {
      const sourceValue = source[key];
      if (sourceValue && typeof sourceValue === 'object' && !Array.isArray(sourceValue)) {
        result[key] = this.deepMerge(result[key], sourceValue);
      } else if (sourceValue !== undefined) {
        result[key] = sourceValue as T[typeof key];
      }
    }
    
    return result;
  }
}
```

### Event System with Type Safety

```typescript
// Event payload types
interface EventMap {
  'user:login': { userId: string; timestamp: Date };
  'user:logout': { userId: string; reason: string };
  'order:created': { orderId: string; userId: string; total: number };
  'order:updated': { orderId: string; changes: Partial<Order> };
}

// Type-safe event emitter
class TypedEventEmitter<T extends Record<string, any>> {
  private listeners: {
    [K in keyof T]?: Array<(payload: T[K]) => void>;
  } = {};
  
  on<K extends keyof T>(event: K, listener: (payload: T[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(listener);
  }
  
  emit<K extends keyof T>(event: K, payload: T[K]): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      eventListeners.forEach(listener => listener(payload));
    }
  }
  
  off<K extends keyof T>(event: K, listener: (payload: T[K]) => void): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      const index = eventListeners.indexOf(listener);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }
}

// Usage
const eventEmitter = new TypedEventEmitter<EventMap>();

// Type-safe event handling
eventEmitter.on('user:login', (payload) => {
  // payload is automatically typed as { userId: string; timestamp: Date }
  console.log(`User ${payload.userId} logged in at ${payload.timestamp}`);
});

eventEmitter.emit('user:login', {
  userId: '123',
  timestamp: new Date()
});
```

## Advanced Decorator Patterns

```typescript
// Method decorator for caching
function Cache(ttl: number = 5000) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    const cache = new Map<string, { value: any; expiry: number }>();
    
    descriptor.value = function (...args: any[]) {
      const key = JSON.stringify(args);
      const cached = cache.get(key);
      
      if (cached && Date.now() < cached.expiry) {
        return cached.value;
      }
      
      const result = method.apply(this, args);
      cache.set(key, { value: result, expiry: Date.now() + ttl });
      
      return result;
    };
  };
}

// Validation decorator
function Validate<T>(schema: ValidationSchema<T>) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    
    descriptor.value = function (data: T) {
      const errors = validateSchema(data, schema);
      if (errors.length > 0) {
        throw new ValidationError(errors);
      }
      
      return method.apply(this, [data]);
    };
  };
}

// Usage in service class
class UserService {
  @Cache(10000) // Cache for 10 seconds
  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }
  
  @Validate({
    email: { required: true, type: 'email' },
    age: { required: true, type: 'number', min: 0, max: 120 }
  })
  async createUser(userData: CreateUserRequest): Promise<User> {
    return await this.userRepository.create(userData);
  }
}
```

## Type-Safe Configuration Management

```typescript
// Configuration schema
interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl: boolean;
}

interface RedisConfig {
  host: string;
  port: number;
  password?: string;
}

interface AppConfig {
  database: DatabaseConfig;
  redis: RedisConfig;
  jwt: {
    secret: string;
    expiresIn: string;
  };
  features: {
    enableNewUI: boolean;
    maxUploadSize: number;
  };
}

// Environment variable mapping
type EnvVarMap<T> = {
  [K in keyof T]: T[K] extends object 
    ? EnvVarMap<T[K]>
    : string;
};

// Configuration loader with type safety
class ConfigLoader<T> {
  constructor(
    private schema: T,
    private envMapping: EnvVarMap<T>
  ) {}
  
  load(): T {
    return this.loadFromEnv(this.schema, this.envMapping, '');
  }
  
  private loadFromEnv<U>(schema: U, mapping: any, prefix: string): U {
    const result = {} as U;
    
    for (const key in schema) {
      const value = schema[key];
      const envKey = mapping[key];
      
      if (typeof value === 'object' && value !== null) {
        result[key] = this.loadFromEnv(value, envKey, `${prefix}${key}.`);
      } else {
        const envValue = process.env[envKey];
        if (envValue === undefined) {
          throw new Error(`Missing environment variable: ${envKey}`);
        }
        
        result[key] = this.parseValue(envValue, typeof value) as U[typeof key];
      }
    }
    
    return result;
  }
  
  private parseValue(value: string, type: string): any {
    switch (type) {
      case 'number':
        return parseInt(value, 10);
      case 'boolean':
        return value.toLowerCase() === 'true';
      default:
        return value;
    }
  }
}

// Usage
const configSchema: AppConfig = {
  database: {
    host: '',
    port: 0,
    database: '',
    username: '',
    password: '',
    ssl: false
  },
  redis: {
    host: '',
    port: 0,
    password: ''
  },
  jwt: {
    secret: '',
    expiresIn: ''
  },
  features: {
    enableNewUI: false,
    maxUploadSize: 0
  }
};

const envMapping: EnvVarMap<AppConfig> = {
  database: {
    host: 'DB_HOST',
    port: 'DB_PORT',
    database: 'DB_NAME',
    username: 'DB_USER',
    password: 'DB_PASSWORD',
    ssl: 'DB_SSL'
  },
  redis: {
    host: 'REDIS_HOST',
    port: 'REDIS_PORT',
    password: 'REDIS_PASSWORD'
  },
  jwt: {
    secret: 'JWT_SECRET',
    expiresIn: 'JWT_EXPIRES_IN'
  },
  features: {
    enableNewUI: 'FEATURE_NEW_UI',
    maxUploadSize: 'MAX_UPLOAD_SIZE'
  }
};

const config = new ConfigLoader(configSchema, envMapping).load();
```

## Performance Optimization Patterns

### Lazy Loading with Type Safety

```typescript
// Lazy loading utility
class Lazy<T> {
  private _value?: T;
  private _factory: () => T;
  
  constructor(factory: () => T) {
    this._factory = factory;
  }
  
  get value(): T {
    if (this._value === undefined) {
      this._value = this._factory();
    }
    return this._value;
  }
  
  get isLoaded(): boolean {
    return this._value !== undefined;
  }
}

// Lazy service initialization
class ServiceContainer {
  private userService = new Lazy(() => new UserService(this.database.value));
  private orderService = new Lazy(() => new OrderService(this.database.value));
  private database = new Lazy(() => new DatabaseConnection(config.database));
  
  getUserService(): UserService {
    return this.userService.value;
  }
  
  getOrderService(): OrderService {
    return this.orderService.value;
  }
}
```

## Conclusion

Advanced TypeScript patterns enable you to build robust, type-safe enterprise applications that catch errors at compile time and provide excellent developer experience. Key takeaways:

1. **Leverage Structural Typing**: Use TypeScript's structural type system to create flexible, reusable patterns
2. **Master Generic Constraints**: Use conditional types and mapped types for powerful generic programming
3. **Template Literal Types**: Create type-safe APIs and configuration systems
4. **Utility Types**: Build comprehensive type utilities for common enterprise patterns
5. **Decorators**: Implement cross-cutting concerns with type safety
6. **Configuration Management**: Use TypeScript's type system for runtime configuration validation

These patterns form the foundation for scalable TypeScript applications that maintain type safety while providing the flexibility needed for complex enterprise requirements. Start with the patterns that address your immediate needs, then gradually adopt more advanced techniques as your application grows in complexity.