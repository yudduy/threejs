import { createTextGeometry } from '../textGeometry';
import * as THREE from 'three';

export type ShapeType = 'galaxy' | 'blockchain' | 'neuralNetwork' | 'quantum' | 'DUY' | 'n' | 'infinity';

export const shapes: ShapeType[] = ['galaxy', 'blockchain', 'neuralNetwork', 'quantum', 'n', 'infinity'];

export const generateShapes: Record<ShapeType, (particleCount: number, randomValues: Float32Array) => Float32Array> = {
    DUY: (particleCount: number, randomValues: Float32Array): Float32Array => {
        const positions = createTextGeometry('DUY', particleCount);
        
        // Scale the text positions without adding circular formation
        for (let i = 0; i < particleCount; i++) {
            const ix = i * 3;
            positions[ix] *= 9;      // Scale X
            positions[ix + 1] *= 9;  // Scale Y
            positions[ix + 2] *= 9;  // Scale Z
        }
        
        return positions;
    },
    
    galaxy: (particleCount: number, randomValues: Float32Array): Float32Array => {
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const radius = randomValues[i * 3] * 800 + (randomValues[i * 3 + 1] * 400); // Increased spread
            const theta = randomValues[i * 3 + 2] * Math.PI * 2;
            const phi = randomValues[i * 3 + 3] * Math.PI * 2;
            const spiral = randomValues[i * 3 + 4] * 250; // More pronounced spiral
            
            positions[i * 3] = (radius * Math.sin(phi) * Math.cos(theta)) + (spiral * Math.cos(theta));
            positions[i * 3 + 1] = (radius * Math.sin(phi) * Math.sin(theta)) + (spiral * Math.sin(theta));
            positions[i * 3 + 2] = radius * Math.cos(phi) * 0.3; // More particles near camera
        }
        return positions;
    },
    
    blockchain: (particleCount: number, randomValues: Float32Array): Float32Array => {
        const positions = new Float32Array(particleCount * 3);
        const radius = 450; // Increased size
        const layers = 8;
        
        for (let i = 0; i < particleCount; i++) {
            const layer = Math.floor(i / (particleCount / layers));
            const layerOffset = layer * (radius / 2);
            const angle = (i * 137.5) * Math.PI / 180;
            const spread = randomValues[i * 3] * 200; // Added spread
            
            positions[i * 3] = (radius + spread) * Math.cos(angle);
            positions[i * 3 + 1] = (radius + spread) * Math.sin(angle);
            positions[i * 3 + 2] = layerOffset - radius; // Brings particles closer to camera
        }
        return positions;
    },
    
    neuralNetwork: (particleCount: number, randomValues: Float32Array): Float32Array => {
        const positions = new Float32Array(particleCount * 3);
        const layers = 4;
        const nodesPerLayer = Math.floor(particleCount / layers);
        
        for (let i = 0; i < particleCount; i++) {
            const layer = Math.floor(i / nodesPerLayer);
            const spread = 500; // Increased spread
            
            positions[i * 3] = (randomValues[i * 3] - 0.5) * spread;
            positions[i * 3 + 1] = (layer / (layers - 1) - 0.5) * spread;
            positions[i * 3 + 2] = (randomValues[i * 3 + 2] - 0.5) * (spread * 0.3); // Closer to camera
        }
        return positions;
    },

    quantum: (particleCount: number, randomValues: Float32Array): Float32Array => {
        const positions = new Float32Array(particleCount * 3);
        const radius = 300;
        
        for (let i = 0; i < particleCount; i++) {
            const t = i / particleCount;
            const spiral = t * 20 * Math.PI;
            const elevation = Math.cos(t * Math.PI * 8) * radius * 0.5;
            
            positions[i * 3] = radius * Math.cos(spiral) + (randomValues[i * 3] - 0.5) * 200;
            positions[i * 3 + 1] = radius * Math.sin(spiral) + (randomValues[i * 3 + 1] - 0.5) * 200;
            positions[i * 3 + 2] = elevation + (randomValues[i * 3 + 2] - 0.5) * 100;
        }
        return positions;
    },

    infinity: (particleCount: number, randomValues: Float32Array): Float32Array => {
        const positions = new Float32Array(particleCount * 3);
        const size = 800; // Increased size
        
        for (let i = 0; i < particleCount; i++) {
            const t = i / particleCount * Math.PI * 2;
            const spread = randomValues[i * 3] * 200;
            
            const a = size / 2;
            const denom = 1 + Math.sin(t) * Math.sin(t);
            positions[i * 3] = (a * Math.cos(t)) / denom + spread;
            positions[i * 3 + 1] = (a * Math.sin(t) * Math.cos(t)) / denom + spread - 100; // Moved down and centered
            positions[i * 3 + 2] = (randomValues[i * 3 + 2] - 0.5) * 100; // Closer to camera
        }
        return positions;
    },

    n: (particleCount: number, randomValues: Float32Array) => {
        const positions = new Float32Array(particleCount * 3);
        const height = 400;
        const width = 300;
        const thirdCount = Math.floor(particleCount / 3);
        
        for (let i = 0; i < particleCount; i++) {
            let x = 0, y = 0, z = 0;
        
            if (i < thirdCount) {
                // Left vertical line
                const t = (i / thirdCount);
                x = -width / 2;
                y = (t * height) - height / 2;
            } else if (i < thirdCount * 2) {
                // Diagonal line from bottom-left to top-right
                const t = ((i - thirdCount) / thirdCount);
                x = (t * width) - width / 2;
                y = (t * height) - height / 2;
            } else {
                // Right vertical line
                const t = ((i - thirdCount * 2) / (particleCount - thirdCount * 2));
                x = width / 2;
                y = (t * height) - height / 2;
            }
        
            z = (randomValues[i * 3] - 0.5) * 50;
        
            positions[i * 3] = x + (randomValues[i * 3 + 1] - 0.5) * 25;
            positions[i * 3 + 1] = y + (randomValues[i * 3 + 2] - 0.5) * 25;
            positions[i * 3 + 2] = z;
        }
        return positions;
    }
};