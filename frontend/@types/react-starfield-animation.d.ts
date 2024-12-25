declare module 'react-starfield-animation' {
  import { CSSProperties } from 'react'

  interface StarfieldAnimationProps {
    style?: CSSProperties;
    numParticles?: number;
    particleSpeed?: number;
    dx?: number;
  }

  export default function StarfieldAnimation(props: StarfieldAnimationProps): JSX.Element
}