/* global AFRAME, THREE */
AFRAME.registerComponent('slider', {
    schema: {
      width: { default: 0.5 }
    },
  
    init: function () {
      var trackEl = this.trackEl = document.createElement('a-entity');
      this.localPosition = new THREE.Vector3();
      this.onPinchedMoved = this.onPinchedMoved.bind(this);
  
      trackEl.setAttribute('geometry', {
        primitive: 'box',
        height: 0.01,
        width: this.data.width,
        depth: 0.01
      });
  
      trackEl.setAttribute('material', {
        color: 'white'
      });
  
      this.el.appendChild(trackEl);
  
      var pickerEl = this.pickerEl = document.createElement('a-entity');
  
      pickerEl.setAttribute('geometry', {
        primitive: 'cylinder',
        radius: 0.02,
        height: 0.05
      });
  
      pickerEl.setAttribute('material', {
        color: '#3a50c5'
      });
  
      pickerEl.setAttribute('pinchable', {
        pinchDistance: 0.05
      });
  
      pickerEl.setAttribute('rotation', {
        x: 90, y: 0, z: 0
      });
  
      pickerEl.setAttribute('color-change', '');
  
      this.el.appendChild(pickerEl);
  
      pickerEl.addEventListener('pinchedmoved', this.onPinchedMoved);
    },
  
    onPinchedMoved: function(evt) {
      var el = this.el; // El elemento al que está adjunto este componente
      var localPosition = new THREE.Vector3(); // Utiliza THREE.Vector3 para manejar las posiciones en 3D
  
      // Copia la posición del evento de pellizco a localPosition
      localPosition.copy(evt.detail.position);
  
      // Actualiza la matriz del mundo del objeto para el cálculo de la posición local
      el.object3D.updateMatrixWorld();
  
      // Convierte la posición del evento de mundo a una posición local
      el.object3D.worldToLocal(localPosition);
  
      // Actualiza la posición del objeto 'picker' en todas las dimensiones (X, Y, Z)
      this.pickerEl.object3D.position.set(localPosition.x, localPosition.y, localPosition.z);
  
      // Opcionalmente, emite un evento personalizado para notificar sobre el cambio de posición
      // Aquí, podrías calcular un valor basado en la nueva posición si es necesario para tu aplicación
      var evtDetail = {
        x: localPosition.x,
        y: localPosition.y,
        z: localPosition.z
      };
      this.el.emit('sliderchanged', evtDetail);
    }
  });
  