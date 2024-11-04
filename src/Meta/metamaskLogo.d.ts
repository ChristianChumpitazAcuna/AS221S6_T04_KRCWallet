declare module '@metamask/logo' {
    interface ModelViewerOptions {
      pxNotRatio?: boolean;
      width?: number;
      height?: number;
      followMouse?: boolean;
      slowDrift?: boolean;
    }

    export default function ModelViewer(options: ModelViewerOptions): {
      container: HTMLDivElement;
      lookAt: (coords: { x: number, y: number }) => void;
      setFollowMouse: (value: boolean) => void;
      stopAnimation: () => void;
    };
  }