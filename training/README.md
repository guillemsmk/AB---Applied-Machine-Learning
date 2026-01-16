# **Entrenamiento del modelo — Face Mask Detection**

Este directorio contiene el proceso completo de entrenamiento, evaluación y análisis del modelo de Machine Learning utilizado en el proyecto de detección de mascarillas. Básicamente el notebook de ejecución.

El objetivo de esta fase es construir un modelo capaz de clasificar imágenes faciales en dos categorías:
- `WithMask`
- `WithoutMask`

Además del entrenamiento, se documentan las decisiones técnicas adoptadas, las métricas obtenidas y el análisis de errores del modelo.


## **1. Dataset y comprensión del problema**

### 1.1 Descripción del dataset

El dataset utilizado está compuesto por imágenes faciales etiquetadas en dos clases:

- **WithMask**: imágenes de personas que llevan mascarilla.
- **WithoutMask**: imágenes de personas que no llevan mascarilla.

Las imágenes difieren en:
- iluminación
- ángulo del rostro
- calidad de la imagen
- tipo y color de mascarilla
- presencia de oclusiones parciales

Esta variabilidad resulta fundamental para evaluar la capacidad de generalización del modelo.


### 1.2 Problema a resolver

El problema se formula como una tarea de **clasificación binaria de imágenes**, donde dado un rostro humano, el modelo debe predecir si la persona lleva mascarilla o no.

El modelo aprende una función:

\[
f(x) \rightarrow \{WithMask, WithoutMask\}
\]

donde \(x\) es una imagen facial en formato RGB.


## **2. Hipótesis inicial**

Antes del entrenamiento, se plantearon las siguientes hipótesis:

- El uso de **Transfer Learning** permitiría obtener un buen rendimiento incluso con un dataset de tamaño moderado.
- Un modelo ligero preentrenado en ImageNet (como MobileNetV2) sería suficiente para capturar los patrones visuales relevantes.
- El modelo podría complicar el aprendizaje en imágenes borrosas, con oclusiones fuertes o con mascarillas poco contrastadas con la piel.

Las hipótesis se contrastan posteriormente con los resultados.


## **3. Preparación y análisis de los datos**

### 3.1 Preprocesamiento

Durante la preparación del dataset se realizaron las siguientes operaciones:

- Redimensionado de todas las imágenes a **224×224 píxeles**.
- Conversión a formato RGB.
- Normalización mediante la función `preprocess_input` de MobileNetV2.
- División del dataset en conjuntos de:
  - entrenamiento
  - validación
  - test


### 3.2 Data augmentation

Para mejorar la capacidad de generalización del modelo y reducir el sobreajuste, se aplicaron técnicas de *data augmentation* durante el entrenamiento, incluyendo:

- rotaciones aleatorias
- volteo horizontal
- pequeños desplazamientos y zoom

Estas transformaciones se aplicaron únicamente durante la fase de entrenamiento.


## **4. Arquitectura del modelo**

### 4.1 Modelo base

Se utilizó **MobileNetV2**, una red preentrenada sobre el dataset ImageNet, como extractor de características.

Las razones principales para esta elección fueron:

- Buen equilibrio entre precisión y eficiencia.
- Arquitectura ligera, adecuada para despliegue en entornos web.
- Amplio uso en tareas de visión por computador.


## **5. Entrenamiento y fine-tuning**

### 5.1 Entrenamiento inicial

En una primera fase, se entrenó únicamente la cabeza de clasificación, manteniendo congelado el backbone de MobileNetV2.

Se emplearon técnicas de control del entrenamiento como:

- **Early Stopping** para evitar sobreajuste.
- **ReduceLROnPlateau** para ajustar dinámicamente la tasa de aprendizaje.


### 5.2 Fine-tuning

Posteriormente, se realizó un proceso de *fine-tuning* descongelando parcialmente las últimas capas del modelo base.

Este ajuste permitió adaptar las características aprendidas a las particularidades del dataset, mejorando ligeramente el rendimiento del modelo.


## **6. Evaluación del modelo**

### 6.1 Métricas cuantitativas

El modelo fue evaluado sobre un conjunto de test independiente, obteniendo una precisión cercana al **99%**.

Se analizaron métricas como:
- accuracy
- loss
- rendimiento en validación y test

---

### 6.2 Análisis de errores

A pesar del alto rendimiento global, se identificaron algunos casos de clasificación incorrecta.

El análisis cualitativo de estos errores reveló que los fallos se concentran principalmente en:

- imágenes borrosas o de baja resolución
- rostros parcialmente ocluidos
- objetos distintos a mascarillas que cubren la zona de la boca y la nariz

Esto sugiere que el modelo aprende patrones visuales asociados a la oclusión facial, más que el concepto semántico de “mascarilla”.

Asimismo, se analizaron predicciones de baja confianza, incluso cuando la clasificación era correcta, lo que permitió identificar casos límite y condiciones difíciles para el modelo.


## **7. Exportación del modelo**

Una vez validado el rendimiento del modelo, se procedió a su exportación para uso en la aplicación web:

- Se creó una versión del modelo destinada exclusivamente a inferencia, sin capas de data augmentation.
- El modelo se exportó en formato **SavedModel**.
- Posteriormente, se convirtió a **TensorFlow.js**, generando los archivos necesarios para su ejecución en el navegador.

Esta separación entre modelo de entrenamiento y modelo de inferencia resulta clave para garantizar estabilidad y compatibilidad en producción.


## **8. Conclusiones del entrenamiento**

El proceso de entrenamiento confirma que el uso de Transfer Learning permite abordar con éxito el problema de detección de mascarillas.

No obstante, el análisis de errores pone de manifiesto las limitaciones inherentes al dataset y a la naturaleza visual del problema, subrayando la importancia de una evaluación crítica más allá de las métricas globales.

