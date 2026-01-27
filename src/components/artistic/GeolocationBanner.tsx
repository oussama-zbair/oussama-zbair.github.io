import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sparkles, Globe, Clock, X } from 'lucide-react';

interface GeoData {
  country: string;
  countryCode: string;
  city: string;
  region: string;
  timezone: string;
  lat: number;
  lon: number;
}

const GeolocationBanner: React.FC = () => {
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  // Development mode detection
  const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  useEffect(() => {
    const fetchLocation = async () => {
      // For development, show demo immediately
      if (isDevelopment) {
        setGeoData({
          country: 'Morocco',
          countryCode: 'MA',
          city: 'Casablanca',
          region: 'Casablanca-Settat',
          timezone: 'Africa/Casablanca',
          lat: 33.5731,
          lon: -7.5898,
        });
        setLoading(false);
        return;
      }

      try {
        // Try httpbin.org/ip to get IP, then use a different approach
        const ipResponse = await fetch('https://httpbin.org/ip');
        if (ipResponse.ok) {
          const ipData = await ipResponse.json();
          console.log('Visitor IP detected:', ipData.origin);
          
          // For production, try a CORS-friendly service
          try {
            const geoResponse = await fetch(`https://get.geojs.io/v1/ip/geo.json`);
            if (geoResponse.ok) {
              const data = await geoResponse.json();
              if (data.country) {
                setGeoData({
                  country: data.country || 'Unknown',
                  countryCode: data.country_code || 'UN',
                  city: data.city || '',
                  region: data.region || '',
                  timezone: data.timezone || 'UTC',
                  lat: parseFloat(data.latitude) || 0,
                  lon: parseFloat(data.longitude) || 0,
                });
                setLoading(false);
                return;
              }
            }
          } catch (error) {
            console.log('geojs.io failed');
          }
        }
      } catch (error) {
        console.log('IP detection failed');
      }

      // Final fallback: Use browser's timezone and language to guess location
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const locale = navigator.language || 'en-US';
        
        // Extract country from timezone or locale
        let countryCode = 'US';
        let country = 'United States';
        
        // Try to extract from timezone first
        if (timezone.includes('/')) {
          const timezoneParts = timezone.split('/');
          const region = timezoneParts[0];
          
          const timezoneToCountry: Record<string, { code: string; name: string }> = {
            'Africa/Casablanca': { code: 'MA', name: 'Morocco' },
            'Africa/Cairo': { code: 'EG', name: 'Egypt' },
            'Europe/Paris': { code: 'FR', name: 'France' },
            'Europe/London': { code: 'GB', name: 'United Kingdom' },
            'Europe/Berlin': { code: 'DE', name: 'Germany' },
            'Europe/Madrid': { code: 'ES', name: 'Spain' },
            'Europe/Rome': { code: 'IT', name: 'Italy' },
            'America/New_York': { code: 'US', name: 'United States' },
            'America/Los_Angeles': { code: 'US', name: 'United States' },
            'America/Toronto': { code: 'CA', name: 'Canada' },
            'Asia/Tokyo': { code: 'JP', name: 'Japan' },
            'Asia/Shanghai': { code: 'CN', name: 'China' },
            'Asia/Dubai': { code: 'AE', name: 'United Arab Emirates' },
            'Asia/Riyadh': { code: 'SA', name: 'Saudi Arabia' },
            'Australia/Sydney': { code: 'AU', name: 'Australia' },
          };
          
          if (timezoneToCountry[timezone]) {
            countryCode = timezoneToCountry[timezone].code;
            country = timezoneToCountry[timezone].name;
          }
        }
        
        // Fallback to locale
        if (countryCode === 'US' && locale.includes('-')) {
          const localeCountry = locale.split('-')[1];
          const countryMap: Record<string, string> = {
            'MA': 'Morocco',
            'FR': 'France',
            'GB': 'United Kingdom', 
            'DE': 'Germany',
            'ES': 'Spain',
            'IT': 'Italy',
            'CA': 'Canada',
            'AU': 'Australia',
            'JP': 'Japan',
            'CN': 'China',
            'IN': 'India',
            'BR': 'Brazil',
            'MX': 'Mexico',
            'RU': 'Russia',
            'EG': 'Egypt',
            'SA': 'Saudi Arabia',
            'AE': 'United Arab Emirates',
          };
          
          if (countryMap[localeCountry]) {
            countryCode = localeCountry;
            country = countryMap[localeCountry];
          }
        }

        setGeoData({
          country: country,
          countryCode: countryCode,
          city: '',
          region: '',
          timezone: timezone,
          lat: 0,
          lon: 0,
        });
      } catch (error) {
        console.log('Browser detection failed, using default');
        // Ultimate fallback
        setGeoData({
          country: 'Unknown',
          countryCode: 'UN',
          city: '',
          region: '',
          timezone: 'UTC',
          lat: 0,
          lon: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();

    // Auto-hide after 5 seconds (longer for mobile users)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isDevelopment]);

  // Update local time every second
  useEffect(() => {
    if (!geoData?.timezone) return;

    const updateTime = () => {
      try {
        const now = new Date();
        const localTime = now.toLocaleTimeString('en-US', {
          timeZone: geoData.timezone,
          hour12: true,
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit'
        });
        setCurrentTime(localTime);
      } catch {
        // Fallback to UTC if timezone is invalid
        const now = new Date();
        setCurrentTime(now.toLocaleTimeString('en-US', {
          hour12: true,
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit'
        }));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [geoData?.timezone]);

  const getFlagEmoji = (countryCode: string) => {
    try {
      const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
      return String.fromCodePoint(...codePoints);
    } catch {
      return '🌍';
    }
  };

  const getLocationString = () => {
    if (!geoData) return '';
    // Show city and country, or just country
    if (geoData.city && geoData.country) {
      return `${geoData.city}, ${geoData.country}`;
    }
    return geoData.country;
  };

  const getGreeting = () => {
    if (!geoData) return 'Welcome, visitor!';
    
    const greetings = [
      `Hello from ${geoData.country}! 👋`,
      `Greetings, ${geoData.country} visitor! ✨`,
      `Welcome from ${geoData.country}! 🎉`,
      `Hi there, ${geoData.country}! 🌟`,
    ];
    
    // Use country code to get consistent greeting
    const index = geoData.countryCode.charCodeAt(0) % greetings.length;
    return greetings[index];
  };

  return (
    <AnimatePresence>
      {!loading && geoData && isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.9 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94], 
            delay: 1.5 
          }}
          className="fixed top-4 right-4 z-50 max-w-[calc(100vw-2rem)] sm:max-w-sm"
        >
          <motion.div 
            className="relative bg-gradient-to-br from-background/95 via-background/90 to-background/95 
                       backdrop-blur-xl border border-primary/20 rounded-2xl shadow-2xl shadow-primary/10 
                       overflow-hidden"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(var(--primary), 0.25)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 animate-pulse" />
            
            {/* Content */}
            <div className="relative p-3 sm:p-4">
              {/* Header with flag and greeting */}
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 2, 
                    type: 'spring', 
                    stiffness: 300,
                    damping: 15
                  }}
                  className="text-3xl sm:text-4xl filter drop-shadow-lg flex-shrink-0"
                >
                  {getFlagEmoji(geoData.countryCode)}
                </motion.div>

                <div className="flex-1 min-w-0">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.2 }}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1"
                  >
                    <Sparkles className="w-3 h-3 text-primary animate-pulse flex-shrink-0" />
                    <span className="font-medium truncate">{getGreeting()}</span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.4 }}
                    className="flex items-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="text-sm font-semibold text-foreground truncate">
                      {getLocationString()}
                    </span>
                  </motion.div>
                </div>

                {/* Rotating globe */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="text-primary/60 flex-shrink-0"
                >
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              </div>

              {/* Local time display */}
              {currentTime && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.6 }}
                  className="flex items-center gap-2 px-2 sm:px-3 py-2 bg-primary/10 rounded-lg border border-primary/20"
                >
                  <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-mono font-semibold text-foreground truncate">
                    Your local time: {currentTime}
                  </span>
                </motion.div>
              )}

              {/* Decorative elements */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-primary/30 rounded-full animate-ping" />
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-accent/50 rounded-full animate-pulse" />
            </div>

            {/* Animated border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-accent/20 p-[1px]">
              <div className="w-full h-full bg-background/50 rounded-2xl" />
            </div>

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3 }}
              onClick={() => setIsVisible(false)}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-muted/90 hover:bg-muted 
                         text-muted-foreground hover:text-foreground transition-all duration-200 
                         flex items-center justify-center text-sm font-bold shadow-lg hover:shadow-xl
                         border border-border hover:border-primary/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-3 h-3" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GeolocationBanner;
