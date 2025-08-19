// src/__tests__/shared/utils/date.test.ts
import { formatDate, formatRelativeTime, isToday } from '@shared/utils/date';

describe('Date Utils', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const formatted = formatDate(date);
      expect(formatted).toBeDefined();
    });
    
    it('should handle invalid dates', () => {
      const invalidDate = new Date('invalid');
      expect(() => formatDate(invalidDate)).not.toThrow();
    });
  });
  
  describe('formatRelativeTime', () => {
    it('should return "agora" for current time', () => {
      const now = new Date();
      const result = formatRelativeTime(now);
      expect(result).toBe('agora');
    });
    
    it('should format minutes ago correctly', () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      const result = formatRelativeTime(fiveMinutesAgo);
      expect(result).toContain('min');
    });
  });
  
  describe('isToday', () => {
    it('should return true for today', () => {
      const today = new Date();
      expect(isToday(today)).toBe(true);
    });
    
    it('should return false for yesterday', () => {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
      expect(isToday(yesterday)).toBe(false);
    });
  });
});
