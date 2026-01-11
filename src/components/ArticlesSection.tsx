import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, Eye, Heart, Share2, X, ArrowLeft, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HolographicCard } from './HolographicCard';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  readTime: number;
  publishDate: string;
  views: number;
  likes: number;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
}

const ArticlesSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [likedArticles, setLikedArticles] = useState<Set<number>>(new Set());

  const articles: Article[] = [
    {
      id: 1,
      title: "Building Scalable Microservices with Spring Boot and Docker",
      excerpt: "Learn how to architect and deploy microservices that can handle millions of requests while maintaining high availability and performance.",
      content: `
# Building Scalable Microservices with Spring Boot and Docker

Microservices architecture has revolutionized how we build and deploy applications. In this comprehensive guide, we'll explore how to create scalable microservices using Spring Boot and Docker.

## Why Microservices?

Microservices offer several advantages over monolithic architectures:

- **Scalability**: Scale individual services based on demand
- **Technology Diversity**: Use different technologies for different services
- **Fault Isolation**: Failures in one service don't bring down the entire system
- **Team Independence**: Teams can work on different services independently

## Setting Up Spring Boot Microservices

Let's start by creating a simple microservice:

\`\`\`java
@SpringBootApplication
@EnableEurekaClient
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
\`\`\`

## Docker Configuration

Create a Dockerfile for your microservice:

\`\`\`dockerfile
FROM openjdk:17-jre-slim
COPY target/user-service.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
\`\`\`

## Service Discovery with Eureka

Configure Eureka for service discovery:

\`\`\`yaml
eureka:
  client:
    service-url:
      defaultZone: http://eureka-server:8761/eureka
  instance:
    prefer-ip-address: true
\`\`\`

## API Gateway Configuration

Use Spring Cloud Gateway for routing:

\`\`\`yaml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/users/**
\`\`\`

## Database Per Service Pattern

Each microservice should have its own database:

\`\`\`java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;
    private String email;
    
    // getters and setters
}
\`\`\`

## Inter-Service Communication

Use Feign clients for service-to-service communication:

\`\`\`java
@FeignClient(name = "order-service")
public interface OrderServiceClient {
    @GetMapping("/api/orders/user/{userId}")
    List<Order> getOrdersByUserId(@PathVariable Long userId);
}
\`\`\`

## Monitoring and Observability

Implement distributed tracing with Sleuth:

\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-sleuth</artifactId>
</dependency>
\`\`\`

## Docker Compose Setup

Orchestrate your services with Docker Compose:

\`\`\`yaml
version: '3.8'
services:
  eureka-server:
    image: eureka-server:latest
    ports:
      - "8761:8761"
  
  user-service:
    image: user-service:latest
    depends_on:
      - eureka-server
    environment:
      - EUREKA_CLIENT_SERVICE_URL_DEFAULTZONE=http://eureka-server:8761/eureka
\`\`\`

## Best Practices

1. **Design for Failure**: Implement circuit breakers and retry mechanisms
2. **Stateless Services**: Keep services stateless for better scalability
3. **API Versioning**: Version your APIs to maintain backward compatibility
4. **Security**: Implement OAuth2 and JWT for secure communication
5. **Testing**: Use contract testing for service interactions

## Conclusion

Building scalable microservices requires careful planning and the right tools. Spring Boot and Docker provide an excellent foundation for creating robust, scalable systems that can grow with your business needs.

The key is to start simple and evolve your architecture as your requirements become clearer. Remember, microservices are not a silver bullet – they come with their own complexities that need to be managed properly.
      `,
      coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      readTime: 8,
      publishDate: "2024-01-15",
      views: 2847,
      likes: 156,
      category: "Backend",
      tags: ["Spring Boot", "Docker", "Microservices", "Java", "Architecture"],
      author: {
        name: "Oussama Zbair",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        bio: "Full Stack Developer passionate about scalable architectures"
      }
    },
    {
      id: 2,
      title: "Modern React Patterns: Hooks, Context, and Performance",
      excerpt: "Explore advanced React patterns that will make your applications more maintainable, performant, and developer-friendly.",
      content: `
# Modern React Patterns: Hooks, Context, and Performance

React has evolved significantly since its introduction. Let's explore modern patterns that will elevate your React development.

## Custom Hooks for Reusability

Custom hooks are the cornerstone of modern React development:

\`\`\`jsx
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
\`\`\`

## Context for State Management

Use Context API for global state:

\`\`\`jsx
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
\`\`\`

## Performance Optimization

Optimize with React.memo and useMemo:

\`\`\`jsx
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }, [data]);

  return <div>{/* render processed data */}</div>;
});
\`\`\`

## Compound Components Pattern

Create flexible component APIs:

\`\`\`jsx
function Modal({ children }) {
  return <div className="modal">{children}</div>;
}

Modal.Header = ({ children }) => <div className="modal-header">{children}</div>;
Modal.Body = ({ children }) => <div className="modal-body">{children}</div>;
Modal.Footer = ({ children }) => <div className="modal-footer">{children}</div>;
\`\`\`

## Error Boundaries

Handle errors gracefully:

\`\`\`jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
\`\`\`

These patterns will help you build more robust and maintainable React applications.
      `,
      coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
      readTime: 6,
      publishDate: "2024-01-10",
      views: 1923,
      likes: 89,
      category: "Frontend",
      tags: ["React", "JavaScript", "Hooks", "Performance", "Patterns"],
      author: {
        name: "Oussama Zbair",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        bio: "Full Stack Developer passionate about scalable architectures"
      }
    },
    {
      id: 3,
      title: "DevOps Best Practices: CI/CD with Jenkins and Docker",
      excerpt: "Streamline your development workflow with automated testing, building, and deployment pipelines that scale with your team.",
      content: `
# DevOps Best Practices: CI/CD with Jenkins and Docker

Continuous Integration and Continuous Deployment (CI/CD) are essential for modern software development. Let's build a robust pipeline.

## Setting Up Jenkins

First, let's set up Jenkins with Docker:

\`\`\`dockerfile
FROM jenkins/jenkins:lts
USER root
RUN apt-get update && apt-get install -y docker.io
USER jenkins
\`\`\`

## Pipeline as Code

Use Jenkinsfile for version-controlled pipelines:

\`\`\`groovy
pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                sh 'mvn clean compile'
            }
        }
        
        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }
        
        stage('Package') {
            steps {
                sh 'mvn package'
            }
        }
        
        stage('Docker Build') {
            steps {
                sh 'docker build -t myapp:latest .'
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'docker run -d -p 8080:8080 myapp:latest'
            }
        }
    }
}
\`\`\`

## Multi-Stage Docker Builds

Optimize your Docker images:

\`\`\`dockerfile
# Build stage
FROM maven:3.8-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# Runtime stage
FROM openjdk:17-jre-slim
COPY --from=build /app/target/app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
\`\`\`

## Automated Testing

Integrate testing into your pipeline:

\`\`\`yaml
# docker-compose.test.yml
version: '3.8'
services:
  app:
    build: .
    depends_on:
      - db
  
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: testdb
      POSTGRES_USER: test
      POSTGRES_PASSWORD: test
\`\`\`

## Monitoring and Alerts

Set up monitoring with Prometheus:

\`\`\`yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'spring-boot-app'
    static_configs:
      - targets: ['app:8080']
\`\`\`

## Security Scanning

Integrate security scanning:

\`\`\`groovy
stage('Security Scan') {
    steps {
        sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image myapp:latest'
    }
}
\`\`\`

## Blue-Green Deployment

Implement zero-downtime deployments:

\`\`\`bash
#!/bin/bash
# Deploy to green environment
docker-compose -f docker-compose.green.yml up -d

# Health check
if curl -f http://green-env:8080/health; then
    # Switch traffic to green
    docker-compose -f docker-compose.blue.yml down
    # Rename green to blue for next deployment
fi
\`\`\`

These practices will help you build reliable, automated deployment pipelines.
      `,
      coverImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
      readTime: 10,
      publishDate: "2024-01-05",
      views: 3156,
      likes: 203,
      category: "DevOps",
      tags: ["Jenkins", "Docker", "CI/CD", "DevOps", "Automation"],
      author: {
        name: "Oussama Zbair",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        bio: "Full Stack Developer passionate about scalable architectures"
      }
    },
    {
      id: 4,
      title: "Database Optimization: From Slow Queries to Lightning Fast",
      excerpt: "Transform your database performance with indexing strategies, query optimization, and caching techniques that actually work.",
      content: `
# Database Optimization: From Slow Queries to Lightning Fast

Database performance can make or break your application. Let's explore proven optimization techniques.

## Query Optimization Fundamentals

Start with proper indexing:

\`\`\`sql
-- Create composite index for common queries
CREATE INDEX idx_user_status_created 
ON users (status, created_at) 
WHERE status = 'active';

-- Analyze query performance
EXPLAIN ANALYZE 
SELECT * FROM users 
WHERE status = 'active' 
ORDER BY created_at DESC 
LIMIT 10;
\`\`\`

## Connection Pooling

Configure HikariCP for optimal performance:

\`\`\`yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
\`\`\`

## Caching Strategies

Implement multi-level caching:

\`\`\`java
@Service
public class UserService {
    
    @Cacheable(value = "users", key = "#id")
    public User findById(Long id) {
        return userRepository.findById(id);
    }
    
    @CacheEvict(value = "users", key = "#user.id")
    public User update(User user) {
        return userRepository.save(user);
    }
}
\`\`\`

## Database Partitioning

Partition large tables for better performance:

\`\`\`sql
-- Partition by date range
CREATE TABLE orders (
    id BIGINT,
    order_date DATE,
    customer_id BIGINT,
    amount DECIMAL(10,2)
) PARTITION BY RANGE (order_date) (
    PARTITION p2023 VALUES LESS THAN ('2024-01-01'),
    PARTITION p2024 VALUES LESS THAN ('2025-01-01')
);
\`\`\`

## Read Replicas

Scale reads with replicas:

\`\`\`yaml
spring:
  datasource:
    master:
      url: jdbc:postgresql://master-db:5432/myapp
    slave:
      url: jdbc:postgresql://slave-db:5432/myapp
\`\`\`

## Monitoring and Profiling

Monitor with pg_stat_statements:

\`\`\`sql
-- Enable query statistics
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Find slow queries
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
\`\`\`

These techniques will dramatically improve your database performance.
      `,
      coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
      readTime: 7,
      publishDate: "2023-12-28",
      views: 2134,
      likes: 127,
      category: "Database",
      tags: ["PostgreSQL", "Performance", "Optimization", "SQL", "Caching"],
      author: {
        name: "Oussama Zbair",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        bio: "Full Stack Developer passionate about scalable architectures"
      }
    }
  ];

  const categories = Array.from(new Set(articles.map(article => article.category)));
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filteredArticles, setFilteredArticles] = useState(articles);

  const filterArticles = (category: string | null) => {
    setActiveCategory(category);
    setFilteredArticles(
      category ? articles.filter(article => article.category === category) : articles
    );
  };

  const toggleLike = (articleId: number) => {
    setLikedArticles(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(articleId)) {
        newLiked.delete(articleId);
      } else {
        newLiked.add(articleId);
      }
      return newLiked;
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="publications" className="section-container relative">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex items-center justify-center mb-16"
      >
        <BookOpen size={28} className="text-cyan-400 mr-3" />
        <h2 className="text-4xl md:text-5xl font-bold holographic-text">Latest Articles</h2>
        <Sparkles size={28} className="text-purple-400 ml-3" />
      </motion.div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => filterArticles(null)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            activeCategory === null
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
              : 'bg-gray-800/50 text-gray-300 hover:bg-cyan-500/10 border border-cyan-500/30'
          }`}
        >
          All Articles
        </motion.button>
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => filterArticles(category)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeCategory === category
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-gray-800/50 text-gray-300 hover:bg-cyan-500/10 border border-cyan-500/30'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {filteredArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
            onClick={() => setSelectedArticle(article)}
          >
            <HolographicCard className="h-full overflow-hidden">
              <div className="relative">
                <div className="h-64 overflow-hidden">
                  <motion.img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                </div>
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-cyan-500/80 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                    {article.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2 py-1 bg-gray-900/80 backdrop-blur-sm rounded-full text-white text-sm">
                    <Clock size={14} />
                    <span>{article.readTime} min</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 text-xs bg-gray-800/50 text-cyan-300 rounded-md border border-cyan-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                  {article.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs text-gray-400">
                      +{article.tags.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-white text-sm font-medium">{article.author.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Calendar size={12} />
                        <span>{formatDate(article.publishDate)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-400 text-sm">
                    <div className="flex items-center gap-1">
                      <Eye size={14} />
                      <span>{article.views.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(article.id);
                      }}
                      className={`flex items-center gap-1 transition-colors ${
                        likedArticles.has(article.id) ? 'text-red-400' : 'hover:text-red-400'
                      }`}
                    >
                      <Heart size={14} fill={likedArticles.has(article.id) ? 'currentColor' : 'none'} />
                      <span>{article.likes + (likedArticles.has(article.id) ? 1 : 0)}</span>
                    </button>
                  </div>
                </div>
              </div>
            </HolographicCard>
          </motion.div>
        ))}
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-cyan-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Article Header */}
              <div className="relative">
                <img
                  src={selectedArticle.coverImage}
                  alt={selectedArticle.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 p-2 bg-gray-900/80 backdrop-blur-sm rounded-full text-white hover:bg-gray-800 transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-cyan-500/80 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                      {selectedArticle.category}
                    </span>
                    <div className="flex items-center gap-1 px-2 py-1 bg-gray-900/80 backdrop-blur-sm rounded-full text-white text-sm">
                      <Clock size={14} />
                      <span>{selectedArticle.readTime} min read</span>
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-4">{selectedArticle.title}</h1>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedArticle.author.avatar}
                        alt={selectedArticle.author.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="text-white font-medium">{selectedArticle.author.name}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Calendar size={12} />
                          <span>{formatDate(selectedArticle.publishDate)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-gray-300">
                        <Eye size={16} />
                        <span>{selectedArticle.views.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => toggleLike(selectedArticle.id)}
                        className={`flex items-center gap-1 transition-colors ${
                          likedArticles.has(selectedArticle.id) ? 'text-red-400' : 'text-gray-300 hover:text-red-400'
                        }`}
                      >
                        <Heart size={16} fill={likedArticles.has(selectedArticle.id) ? 'currentColor' : 'none'} />
                        <span>{selectedArticle.likes + (likedArticles.has(selectedArticle.id) ? 1 : 0)}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-300 hover:text-cyan-400 transition-colors">
                        <Share2 size={16} />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-8 max-h-[60vh] overflow-y-auto">
                <div className="prose prose-invert prose-cyan max-w-none">
                  <div 
                    className="text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: selectedArticle.content
                        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-800 p-4 rounded-lg overflow-x-auto"><code class="text-cyan-300">$2</code></pre>')
                        .replace(/`([^`]+)`/g, '<code class="bg-gray-800 px-2 py-1 rounded text-cyan-300">$1</code>')
                        .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-white mt-8 mb-4">$1</h1>')
                        .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-white mt-6 mb-3">$1</h2>')
                        .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-white mt-4 mb-2">$1</h3>')
                        .replace(/\n\n/g, '</p><p class="mb-4">')
                        .replace(/^(.+)$/gm, '<p class="mb-4">$1</p>')
                    }}
                  />
                </div>

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <h4 className="text-white font-medium mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedArticle.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-800/50 text-cyan-300 rounded-full text-sm border border-cyan-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ArticlesSection;