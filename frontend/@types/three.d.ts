declare module 'three' {
  export class Scene {
    add(object: Object3D): void;
    remove(object: Object3D): void;
  }

  export class WebGLRenderer {
    constructor(parameters?: { 
      alpha?: boolean;
      antialias?: boolean;
      powerPreference?: 'high-performance' | 'low-power' | 'default';
    });
    setSize(width: number, height: number): void;
    setPixelRatio(ratio: number): void;
    render(scene: Scene, camera: Camera): void;
    domElement: HTMLCanvasElement;
    dispose(): void;
  }

  export class PerspectiveCamera {
    constructor(fov: number, aspect: number, near: number, far: number);
    position: Vector3;
    aspect: number;
    updateProjectionMatrix(): void;
  }

  export class BufferGeometry {
    setAttribute(name: string, attribute: BufferAttribute): void;
    getAttribute(name: string): BufferAttribute | undefined;
    attributes: { [key: string]: BufferAttribute };
    dispose(): void;
  }

  export class BufferAttribute {
    constructor(array: Float32Array, itemSize: number);
    needsUpdate: boolean;
    array: Float32Array;
    itemSize: number;
    count: number;
  }

  export class Points extends Object3D {
    constructor(geometry: BufferGeometry, material: PointsMaterial);
    geometry: BufferGeometry;
    rotation: THREE.Euler;
  }

  export class PointsMaterial {
    constructor(parameters?: {
      size?: number;
      vertexColors?: boolean;
      transparent?: boolean;
      opacity?: number;
      sizeAttenuation?: boolean;
      blending?: number;
      depthWrite?: boolean;
      depthTest?: boolean;
      color?: THREE.Color | number;
    });
    color: THREE.Color;
    dispose(): void;
  }

  export class Vector3 {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number): Vector3;
    unproject(camera: Camera): Vector3;
    clone(): Vector3;
    add(v: Vector3): Vector3;
    addScaledVector(v: Vector3, s: number): Vector3;
    multiplyScalar(scalar: number): Vector3;
  }

  export class Object3D {
    position: Vector3;
    updateMatrixWorld(force?: boolean): void;
  }

  export const AdditiveBlending: number;
}

declare module 'three/examples/jsm/controls/OrbitControls' {
  import { Camera, WebGLRenderer } from 'three';

  export class OrbitControls {
    constructor(camera: Camera, domElement: HTMLElement);
    update(): void;
    dispose(): void;
    enableDamping: boolean;
    dampingFactor: number;
  }
}
