//! File: src/hooks/useTheme.js

import { useContext } from 'react';
import ThemeContext from '@/context/ThemeContext.jsx';

export const useTheme = () => useContext(ThemeContext);