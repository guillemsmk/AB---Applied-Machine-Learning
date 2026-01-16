# **Aplicación web — Face Mask Detection**

Este directorio contiene la aplicación web desarrollada para consumir el modelo de
detección de mascarillas entrenado previamente y exportado a TensorFlow.js.

La aplicación permite a un usuario subir una imagen y obtener una predicción en tiempo real
sobre si la persona presente en la imagen lleva mascarilla o no.


## **1. Objetivo de la aplicación**

El objetivo principal de la aplicación es servir como interfaz entre el usuario final
y el modelo de Machine Learning, integrando el modelo entrenado en una experiencia web funcional.

La aplicación demuestra la viabilidad de ejecutar inferencia directamente en el navegador,
sin necesidad de un backend dedicado para predicciones.


## **2. Arquitectura general**

La arquitectura de la aplicación sigue un enfoque **client-side inference**, donde
la predicción se realiza completamente en el navegador del usuario.

El flujo general de datos es el siguiente: **Usuario -> Interfaz Web -> Modelo Tensorflow.js -> Predicción -> Usuario**

Esta arquitectura reduce la latencia, elimina la necesidad de enviar imágenes a un servidor
y mejora la privacidad del usuario.


## **3. Tecnologías utilizadas**

- **Next.js (React)**: framework para la construcción de la interfaz web.
- **JavaScript**: lenguaje principal de la aplicación.
- **TensorFlow.js**: carga y ejecución del modelo de Machine Learning en el navegador.
- **HTML5 / CSS**: estructura y estilos de la interfaz.


## **4. Flujo de funcionamiento**

El funcionamiento de la aplicación se puede resumir en los siguientes pasos:

1. El usuario accede a la interfaz web.
2. El modelo TensorFlow.js se carga en memoria al iniciar la aplicación.
3. El usuario selecciona y sube una imagen desde su dispositivo.
4. La imagen se preprocesa en el navegador (redimensionado y normalización).
5. El modelo ejecuta la inferencia sobre la imagen.
6. La aplicación muestra:
   - la clase predicha (`WithMask` o `WithoutMask`)
   - la probabilidad asociada a cada clase

Todo el proceso se ejecuta en el lado del cliente.


## **5. Gestión del modelo**

El modelo utilizado por la aplicación se encuentra en el directorio: **public/model**

Este directorio contiene:
- model.json
- archivos binarios (.bin)
- labels.json

Separar el modelo del código de la aplicación permite actualizar o sustituir el modelo
sin modificar la lógica principal de la interfaz.


## **6. Inferencia en el cliente**

La inferencia se realiza utilizando TensorFlow.js directamente en el navegador.

Este enfoque presenta varias ventajas:

- baja latencia
- no requiere infraestructura de backend para predicciones
- mayor privacidad, ya que las imágenes no se envían a un servidor


## **7. Experiencia de usuario (UX)**

La interfaz está diseñada para ser simple e intuitiva:

- subida de imágenes mediante selector de archivos
- vista previa de la imagen
- botón de predicción
- visualización clara de resultados y probabilidades


## **8. Limitaciones y consideraciones**

Algunas limitaciones conocidas de la aplicación son:

- El rendimiento depende del dispositivo y navegador del usuario.
- En dispositivos con hardware limitado, la inferencia puede ser más lenta.
- La calidad de la predicción está directamente relacionada con la calidad de la imagen de entrada.


## **9. Integración con el proyecto global**

Esta aplicación representa la fase final del proyecto, integrando el modelo entrenado
con una interfaz usable por un usuario final.

Conecta directamente el trabajo de entrenamiento descrito en el directorio: training/
con una solución práctica y funcional.





