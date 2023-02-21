import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { describe, test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  test('differences', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const filepath3 = getFixturePath('file3.yml');
    const filepath4 = getFixturePath('file4.yml');
    const expectedResult1 = readFile('resultStylish.txt').trim();

    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedResult1);
    expect(genDiff(filepath3, filepath4, 'stylish')).toEqual(expectedResult1);
  });
});
