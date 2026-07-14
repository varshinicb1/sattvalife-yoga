import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32;
const IV_LENGTH = 12;
const SALT_LENGTH = 16;
const TAG_LENGTH = 16;
const ITERATIONS = 100000;

function getKey(password: string, salt: Buffer): Buffer {
  return scryptSync(password, salt, KEY_LENGTH, { N: 16384, r: 8, p: 1 });
}

export function encrypt(text: string): string {
  try {
    const password = process.env.ENCRYPTION_PASSWORD || 'sattvalife-yoga-encryption-key-2024-min-32-chars-long!!';
    const salt = randomBytes(SALT_LENGTH);
    const key = getKey(password, salt);
    const iv = randomBytes(IV_LENGTH);
    
    const cipher = createCipheriv(ALGORITHM, key, iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();
    
    const result = Buffer.concat([salt, iv, authTag, encrypted]);
    return result.toString('base64');
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

export function decrypt(encryptedData: string): string {
  try {
    const password = process.env.ENCRYPTION_PASSWORD || 'sattvalife-yoga-encryption-key-2024-min-32-chars-long!!';
    const buffer = Buffer.from(encryptedData, 'base64');
    
    const salt = buffer.subarray(0, SALT_LENGTH);
    const iv = buffer.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const authTag = buffer.subarray(SALT_LENGTH + IV_LENGTH, SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
    const encrypted = buffer.subarray(SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
    
    const key = getKey(password, salt);
    const decipher = createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 32).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hash] = storedHash.split(':');
  const verifyHash = scryptSync(password, Buffer.from(salt, 'hex'), 32).toString('hex');
  return hash === verifyHash;
}