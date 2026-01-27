import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ShieldCheck, AlertCircle } from 'lucide-react';

interface MathCaptchaProps {
  onVerify: (isValid: boolean) => void;
  error?: string;
  disabled?: boolean;
}

type Operation = '+' | '-' | '×';

interface CaptchaChallenge {
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
}

const generateChallenge = (): CaptchaChallenge => {
  const operations: Operation[] = ['+', '-', '×'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  let num1: number, num2: number, answer: number;
  
  switch (operation) {
    case '+':
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      answer = num1 + num2;
      break;
    case '-':
      num1 = Math.floor(Math.random() * 20) + 10;
      num2 = Math.floor(Math.random() * num1);
      answer = num1 - num2;
      break;
    case '×':
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = num1 * num2;
      break;
  }
  
  return { num1, num2, operation, answer };
};

const MathCaptcha: React.FC<MathCaptchaProps> = ({ onVerify, error, disabled }) => {
  const [challenge, setChallenge] = useState<CaptchaChallenge>(generateChallenge);
  const [userAnswer, setUserAnswer] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [localError, setLocalError] = useState('');

  const refreshChallenge = useCallback(() => {
    setChallenge(generateChallenge());
    setUserAnswer('');
    setIsVerified(false);
    setLocalError('');
    onVerify(false);
  }, [onVerify]);

  // Refresh on mount
  useEffect(() => {
    refreshChallenge();
  }, []);

  const handleAnswerChange = (value: string) => {
    // Only allow numbers and negative sign
    const sanitized = value.replace(/[^0-9-]/g, '');
    setUserAnswer(sanitized);
    setLocalError('');
    
    if (isVerified) {
      setIsVerified(false);
      onVerify(false);
    }
  };

  const handleVerify = () => {
    const numAnswer = parseInt(userAnswer, 10);
    
    if (isNaN(numAnswer)) {
      setLocalError('Please enter a number');
      return;
    }
    
    if (numAnswer === challenge.answer) {
      setIsVerified(true);
      setLocalError('');
      onVerify(true);
    } else {
      setAttempts((prev) => prev + 1);
      setLocalError('Incorrect answer, try again');
      onVerify(false);
      
      // Refresh challenge after 3 failed attempts
      if (attempts >= 2) {
        setTimeout(() => {
          refreshChallenge();
          setAttempts(0);
        }, 1000);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !disabled && !isVerified) {
      e.preventDefault();
      handleVerify();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-muted-foreground" />
          Security Verification
        </label>
        <button
          type="button"
          onClick={refreshChallenge}
          disabled={disabled}
          className="p-1 rounded hover:bg-muted transition-colors disabled:opacity-50"
          aria-label="Get new challenge"
        >
          <RefreshCw className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        {/* Challenge Display */}
        <div className="flex-1 flex items-center gap-2">
          <div className="px-4 py-2.5 rounded-lg bg-muted/50 border border-input text-foreground font-mono text-lg select-none">
            {challenge.num1} {challenge.operation} {challenge.num2} = ?
          </div>
          
          <input
            type="text"
            inputMode="numeric"
            value={userAnswer}
            onChange={(e) => handleAnswerChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled || isVerified}
            placeholder="?"
            className="w-20 px-3 py-2.5 rounded-lg border border-input bg-background text-foreground 
              text-center font-mono text-lg placeholder:text-muted-foreground 
              focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary 
              transition-all disabled:opacity-50"
          />
        </div>

        {/* Verify Button */}
        {!isVerified ? (
          <motion.button
            type="button"
            onClick={handleVerify}
            disabled={disabled || !userAnswer}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium
              hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Verify
          </motion.button>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/20 text-green-600 dark:text-green-400"
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="text-sm font-medium">Verified</span>
          </motion.div>
        )}
      </div>

      {/* Error Messages */}
      {(localError || error) && (
        <p className="text-sm text-destructive flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {localError || error}
        </p>
      )}

      {attempts > 0 && !isVerified && (
        <p className="text-xs text-muted-foreground">
          {3 - attempts} attempt{3 - attempts !== 1 ? 's' : ''} remaining before new challenge
        </p>
      )}
    </div>
  );
};

export default MathCaptcha;
