import createStoreInstance from './store';
import { test, expect } from '@jest/globals';

test('should be defined', () => {
    expect(createStoreInstance).toBeDefined();
});
