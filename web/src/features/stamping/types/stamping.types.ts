/**
 * @fileoverview Stamping Feature Type Definitions (UI-specific only)
 */
import type { StampingReceipt } from '@kasstamp/sdk';
import type { StampingEstimation } from '../services';
import type { ArtifactFingerprint } from '../utils';

// Privacy mode for stamping (UI-specific)
export type PrivacyMode = 'private' | 'public' | 'hash-only';

// Cached estimation for performance
export interface CachedEstimation {
  fingerprint: ArtifactFingerprint;
  estimation: StampingEstimation;
  timestamp: number;
}

// Augmented receipt with UI metadata, extending the SDK's receipt
export type AugmentedReceipt = Omit<StampingReceipt, 'privacy'> & {
  privacy: PrivacyMode;
  filename?: string;
  fileHash?: string;
  originalFileSize?: number;
};
