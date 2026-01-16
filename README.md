# **Face Mask Detection — Applied Machine Learning**

Este proyecto es la ENTREGA FINAL de la asignatura **Applied Machine Learning**.  
El objetivo principal es integrar todo el flujo de trabajo de un proyecto real de Machine Learning, desde la formulación del problema y el entrenamiento del modelo, hasta su integración en una aplicación web funcional.

El proyecto no busca únicamente obtener un modelo con alta precisión, sino **documentar y comprender todo el proceso**, incluyendo decisiones técnicas, limitaciones del modelo y problemas encontrados durante el desarrollo.


## **1. Contexto y problema**

Durante la pandemia, el uso de la mascarilla supuso un problema a sistemas de seguridad, controles de acceso y obviamente salud pública. Por lo tanto, plantee el siguiente problema:

> **¿Es posible detectar automáticamente si una persona lleva mascarilla o no a partir de una imagen facial?**

Este proyecto aborda dicho problema mediante técnicas de **Deep Learning** aplicadas a visión por computador.


## **2. Objetivo del proyecto**

El objetivo del proyecto es:

- Entrenar un modelo de clasificación de imágenes capaz de distinguir entre:
  - `WithMask`
  - `WithoutMask`
- Evaluar su rendimiento.
- Analizar los errores del modelo y sus limitaciones.
- Exportar el modelo entrenado a **TensorFlow.js**.
- Integrarlo en una **aplicación web** desarrollada con **Next.js**, donde el usuario puede subir una imagen y obtener una predicción en tiempo real.
- Conectar dicha aplicación web con **Vercel** para registrar logs de la aplicación y explicar como podríamos utilizar dichos datos para un reentranmiento.

El modelo se ejecuta **en el navegador del usuario**, sin necesidad de un backend de predicción.


## **3. Enfoque y metodología**

El proyecto sigue una metodología incremental basada en los contenidos trabajados durante la asignatura:

1. **Comprensión del problema y del dataset**
2. **Entrenamiento del modelo**
   - Transfer Learning con MobileNetV2
   - Fine-tuning
   - Early stopping y control del sobreajuste
3. **Evaluación y análisis de errores**
4. **Exportación del modelo**
   - SavedModel (TensorFlow)
   - Conversión a TensorFlow.js
5. **Integración en aplicación web**
   - Carga del modelo en cliente
   - Predicción sobre imágenes subidas por el usuario


## **4. Estructura del repositorio**

.
├── app/                # Aplicación web (Next.js)
├── lib/                # Lógica de inferencia con TensorFlow.js
├── public/model/       # Modelo exportado a TensorFlow.js
├── training/           # Entrenamiento y análisis del modelo (Jupyter Notebook)
├── documentacion/      # Documentación y memoria del proyecto
├── package.json
├── next.config.mjs
└── README.md


## **5. Estado actual del proyecto**

En el momento de redacción de este documento, el proyecto se encuentra en una fase avanzada de desarrollo.

Hasta el momento se han completado las siguientes etapas:

- Entrenamiento de un modelo de clasificación de imágenes basado en Transfer Learning.
- Evaluación del modelo sobre un conjunto de test independiente, obteniendo un rendimiento elevado.
- Análisis cualitativo de los errores del modelo, identificando patrones comunes en los casos de fallo y en las predicciones de baja confianza.
- Exportación del modelo entrenado a formato **TensorFlow.js** para su uso en entornos web.
- Desarrollo de una aplicación web con **Next.js** que permite al usuario subir una imagen y ejecutar inferencia directamente en el navegador.

Actualmente, la aplicación funciona correctamente en entorno local.  
El despliegue en producción mediante **Vercel** se realizará en una fase posterior del proyecto.


## **6. Tecnologías utilizadas**

El desarrollo del proyecto ha requerido el uso de diversas tecnologías, tanto para el entrenamiento del modelo como para su integración en una aplicación web:

- **Python**: lenguaje principal para el entrenamiento y análisis del modelo.
- **TensorFlow / Keras**: framework utilizado para la construcción, entrenamiento y evaluación del modelo de Deep Learning.
- **Google Colab**: entorno de ejecución para el entrenamiento, aprovechando aceleración por GPU.
- **TensorFlow.js**: conversión y ejecución del modelo en el navegador.
- **JavaScript**: lenguaje principal de la aplicación web.
- **Next.js (React)**: framework utilizado para el desarrollo de la interfaz web.
- **Git & GitHub**: control de versiones y gestión del repositorio del proyecto.

Este stack tecnológico permite cubrir todo el ciclo de vida del modelo, desde el entrenamiento hasta su despliegue y uso por parte de usuarios finales.


## **7. Nota sobre el enfoque académico**

- La justificación de las decisiones técnicas adoptadas.
- El análisis crítico de los resultados obtenidos.
- La identificación de limitaciones del modelo y del dataset.
- La documentación de los problemas encontrados durante el desarrollo y de las soluciones aplicadas.

De esta forma podemos entender por qué un modelo falla o en qué condiciones pierde fiabilidad resulta tan valioso como obtener buenos resultados cuantitativos.


