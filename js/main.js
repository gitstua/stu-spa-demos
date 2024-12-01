
import { compress, decompress } from './urlCompression.js';

// When storing data in URL fragment:
const storeInFragment = (data, useCompression = false) => {
    const fragment = useCompression ? compress(data) : JSON.stringify(data);
    window.location.hash = fragment;
};

// When reading data from URL fragment:
const getFromFragment = (useCompression = false) => {
    const fragment = window.location.hash.slice(1);
    if (!fragment) return null;
    return useCompression ? decompress(fragment) : JSON.parse(fragment);
};