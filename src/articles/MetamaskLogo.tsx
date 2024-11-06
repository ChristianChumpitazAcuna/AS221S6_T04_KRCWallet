import  { Component } from 'react';
import ModelViewer from '@metamask/logo';

interface MetamaskLogoProps {}

interface MetamaskLogoState {}

class MetamaskLogo extends Component<MetamaskLogoProps, MetamaskLogoState> {
  private viewer: any;
  private el: HTMLDivElement | null = null;

  componentDidMount() {
    try {
      console.log("Inicializando el visor de Metamask...");
      this.viewer = ModelViewer({
        pxNotRatio: true,
        width: 500,
        height: 400,
        followMouse: false,
        slowDrift: false,
      });

      if (this.el) {
        // Asegúrate de que el contenedor esté vacío antes de añadir el logo
        while (this.el.firstChild) {
          this.el.removeChild(this.el.firstChild);
        }

        console.log("Añadiendo el visor al DOM...");
        this.el.appendChild(this.viewer.container);
      }

      // Configurar para mirar a un punto específico
      this.viewer.lookAt({ x: 100, y: 100 });

      // Habilitar seguimiento del mouse
      this.viewer.setFollowMouse(true);

      console.log("Visor inicializado correctamente.");
    } catch (error) {
      console.error("Error al inicializar el visor de Metamask:", error);
    }
  }

  componentWillUnmount() {
    try {
      if (this.viewer) {
        console.log("Deteniendo la animación del visor de Metamask...");
        this.viewer.stopAnimation();
      }
    } catch (error) {
      console.error("Error al detener la animación del visor de Metamask:", error);
    }
  }

  render() {
    return (
      <div
        ref={(el) => (this.el = el)}
        style={{
          width: '100px',
          height: '100px',
        }}
      />
    );
  }
}

export default MetamaskLogo;