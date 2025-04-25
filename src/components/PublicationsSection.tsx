
import React, { useState } from 'react';
import { BookOpen, Heart, MessageSquare, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar } from './ui/avatar';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
}

interface Publication {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  likes: number;
  userLiked: boolean;
  comments: Comment[];
}

const PublicationsSection: React.FC = () => {
  const publicationsData: Publication[] = [
    {
      id: 1,
      title: "Building Scalable React Applications with Redux",
      excerpt: "Learn how to effectively manage state in large React applications using Redux, with practical examples and best practices.",
      content: "Redux is a powerful state management library that helps solve many common problems in React applications. In this article, we explore...",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      author: "Oussama Zbair",
      date: "May 15, 2023",
      readTime: "10 min read",
      category: "Frontend",
      likes: 42,
      userLiked: false,
      comments: [
        {
          id: 1,
          author: "Sarah Johnson",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          content: "Great article! I've been struggling with state management in my app and this helped clarify a lot.",
          date: "May 16, 2023"
        },
        {
          id: 2,
          author: "Michael Chen",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          content: "Do you think Redux is still relevant with the Context API and other state management solutions?",
          date: "May 17, 2023"
        }
      ]
    },
    {
      id: 2,
      title: "Microservices Architecture: Pros and Cons",
      excerpt: "An in-depth analysis of microservices architecture, when to use it, and potential pitfalls to avoid.",
      content: "Microservices have become increasingly popular in recent years, but are they always the right choice? This article examines...",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      author: "Oussama Zbair",
      date: "March 8, 2023",
      readTime: "15 min read",
      category: "Backend",
      likes: 37,
      userLiked: false,
      comments: [
        {
          id: 1,
          author: "David Williams",
          avatar: "https://randomuser.me/api/portraits/men/86.jpg",
          content: "I've been considering refactoring our monolithic app to microservices. This gave me a lot to think about!",
          date: "March 10, 2023"
        }
      ]
    },
    {
      id: 3,
      title: "Optimizing CI/CD Pipelines for Modern Web Apps",
      excerpt: "Best practices for creating efficient CI/CD pipelines that save time and improve code quality.",
      content: "Continuous Integration and Continuous Deployment are essential practices for modern development teams. In this guide...",
      image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      author: "Oussama Zbair",
      date: "January 22, 2023",
      readTime: "12 min read",
      category: "DevOps",
      likes: 28,
      userLiked: false,
      comments: []
    }
  ];

  const categories = ["All", "Frontend", "Backend", "DevOps", "Career"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [publications, setPublications] = useState(publicationsData);
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");
  
  const filteredPublications = activeCategory === "All" 
    ? publications 
    : publications.filter(pub => pub.category === activeCategory);

  const handleLike = (id: number) => {
    setPublications(prevPubs => prevPubs.map(pub => {
      if (pub.id === id) {
        return {
          ...pub,
          likes: pub.userLiked ? pub.likes - 1 : pub.likes + 1,
          userLiked: !pub.userLiked
        };
      }
      return pub;
    }));
  };

  const handleComment = (id: number) => {
    if (!newComment.trim()) return;
    
    const newCommentObj = {
      id: Math.random(),
      author: "You",
      avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
      content: newComment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setPublications(prevPubs => prevPubs.map(pub => {
      if (pub.id === id) {
        return {
          ...pub,
          comments: [...pub.comments, newCommentObj]
        };
      }
      return pub;
    }));

    setNewComment("");
  };

  return (
    <section id="publications" className="section-container">
      <div className="flex items-center justify-center mb-12">
        <BookOpen size={24} className="text-neon mr-3 animate-pulse-neon" />
        <h2 className="section-title mb-0">Publications</h2>
      </div>

      <Tabs defaultValue={activeCategory} onValueChange={value => setActiveCategory(value)}>
        <TabsList className="flex flex-wrap justify-center mb-8">
          {categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="data-[state=active]:border-neon data-[state=active]:text-neon"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPublications.map(publication => (
              <div key={publication.id} className="glass-card overflow-hidden hover:border-neon/30 transition-all">
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={publication.image}
                    alt={publication.title}
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-neon text-dark-300 text-xs px-2 py-1 rounded">
                      {publication.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center text-gray-400 text-xs mb-3">
                    <span>{publication.date}</span>
                    <span className="mx-2">•</span>
                    <span>{publication.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                    {publication.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {publication.excerpt}
                  </p>
                  
                  {expandedPost === publication.id ? (
                    <div className="mt-4 border-t border-dark-100 pt-4">
                      <p className="text-gray-300 mb-6">{publication.content}</p>
                      
                      <div className="space-y-4 mb-6">
                        <h4 className="font-bold text-white">Comments ({publication.comments.length})</h4>
                        
                        {publication.comments.map(comment => (
                          <div key={comment.id} className="p-3 bg-dark-300 rounded">
                            <div className="flex items-center mb-2">
                              <Avatar>
                                <img src={comment.avatar} alt={comment.author} />
                              </Avatar>
                              <div className="ml-2">
                                <p className="text-sm font-semibold text-white">{comment.author}</p>
                                <p className="text-xs text-gray-400">{comment.date}</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-300">{comment.content}</p>
                          </div>
                        ))}
                        
                        <div className="flex mt-4">
                          <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-1 bg-dark-300 border border-dark-100 rounded-l px-3 py-2 text-white"
                          />
                          <Button 
                            className="bg-neon text-dark-300 rounded-l-none" 
                            onClick={() => handleComment(publication.id)}
                          >
                            Post
                          </Button>
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        className="w-full border-gray-600 text-gray-300"
                        onClick={() => setExpandedPost(null)}
                      >
                        Close
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleLike(publication.id)}
                          className="flex items-center space-x-1 text-gray-300 hover:text-neon transition-colors"
                        >
                          <Heart size={16} className={publication.userLiked ? "fill-neon text-neon" : ""} />
                          <span>{publication.likes}</span>
                        </button>
                        <div className="flex items-center space-x-1 text-gray-300">
                          <MessageSquare size={16} />
                          <span>{publication.comments.length}</span>
                        </div>
                      </div>
                      
                      <Button
                        variant="link"
                        className="text-neon p-0 h-auto"
                        onClick={() => setExpandedPost(publication.id)}
                      >
                        Read More
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default PublicationsSection;
