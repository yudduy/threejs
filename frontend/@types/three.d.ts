declare module 'three' {
  export class Scene {
    add(object: Object3D): void;
    remove(object: Object3D): void;
  }

  export class WebGLRenderer {
    constructor(parameters?: { 
      alpha?: boolean;
      antialias?: boolean;
      powerPreference?: string;
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
  }

  export class BufferGeometry {
    setAttribute(name: string, attribute: BufferAttribute): void;
    attributes: { [key: string]: BufferAttribute };
    dispose(): void;
  }

  export class BufferAttribute {
    constructor(array: Float32Array, itemSize: number);
    needsUpdate: boolean;
    array: Float32Array;
  }

  export class Points extends Object3D {
    constructor(geometry: BufferGeometry, material: PointsMaterial);
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
    });
    dispose(): void;
  }

  export class Vector3 {
    x: number;
    y: number;
    z: number;
  }

  export class Object3D {
    position: Vector3;
  }

  // Blending modes
  export const AdditiveBlending: number;
}

declare module 'three/examples/jsm/controls/OrbitControls' {
  import { Camera, WebGLRenderer } from 'three';

  export class OrbitControls {
    constructor(camera: Camera, domElement: HTMLElement);
    update(): void;
  }
}
