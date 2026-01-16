# **Documentación y memoria del proyecto**

Este directorio contiene la documentación académica del proyecto **Face Mask Detection**

El objetivo de esta documentación es servir como hilo conductor del proyecto, explicando
de forma estructurada todo el proceso seguido, desde la formulación del problema hasta
la integración del modelo en una aplicación web funcional.


## **1. Objetivo de la memoria**

La memoria del proyecto tiene como finalidad:

- Describir el problema abordado y su contexto.
- Justificar las decisiones técnicas adoptadas.
- Documentar el proceso de entrenamiento del modelo.
- Analizar críticamente los resultados obtenidos.
- Explicar la arquitectura de la aplicación desarrollada.
- Conectar los distintos módulos trabajados durante la asignatura.

El énfasis no se sitúa únicamente en los resultados, sino en la **comprensión del proceso completo**.


## **2. Estructura propuesta de la memoria (PDF)**

La memoria final se estructurará en los siguientes apartados:

### A. Definición del problema (Business Understanding)

- Contexto del problema.
- Motivación del proyecto.
- Definición del objetivo.
- Hipótesis iniciales.

*(Contenido basado en el README principal del repositorio.)*


### B. Fundamentación teórica

- Introducción al problema de clasificación de imágenes.
- Redes neuronales convolucionales.
- Concepto de Transfer Learning.
- Relación con los conceptos trabajados en la asignatura
  (pesos, bias, error, optimización).

*(Contenido basado en el README de la carpeta `training/`.)*


### C. Ingeniería y análisis de datos

- Descripción del dataset.
- Exploración inicial de los datos (EDA).
- Preprocesamiento y data augmentation.
- Entrenamiento del modelo.
- Fine-tuning.
- Métricas obtenidas.
- Análisis de errores y discusión de resultados.

*(Contenido basado en el notebook de entrenamiento y `training/README.md`.)*


### D. Arquitectura y despliegue

- Arquitectura general del sistema.
- Flujo de datos usuario–modelo.
- Comunicación cliente–modelo.
- Inferencia en el navegador con TensorFlow.js.
- Limitaciones del enfoque.
- Estrategia de despliegue.

*(Contenido basado en `app/README.md`.)*


### E. Conclusiones y trabajo futuro

- Resumen de resultados.
- Limitaciones del modelo y de la aplicación.
- Posibles mejoras futuras:
  - ampliación del dataset
  - mejora del preprocesamiento
  - uso de modelos más complejos
  - despliegue con backend de inferencia


## **3. Relación entre código y memoria**

La memoria no se desarrolla de forma aislada, sino que está directamente relacionada
con el contenido del repositorio:

- El **README principal** aporta la visión global del proyecto.
- El **notebook de entrenamiento** documenta el proceso experimental.
- Los **README de cada módulo** sirven como base directa para cada sección de la memoria.

Este enfoque garantiza coherencia entre código, documentación y memoria final.


## **5. Nota sobre el enfoque académico**

Siguiendo los criterios de evaluación de la asignatura, esta memoria se enfoca en:

- El razonamiento detrás de las decisiones técnicas.
- La interpretación crítica de los resultados.
- La identificación de errores y limitaciones.
- La integración de los conocimientos adquiridos durante el curso.

