import * as tf from "@tensorflow/tfjs";

let modelPromise = null;

export async function loadModel() {
  if (!modelPromise) {
    modelPromise = tf.loadGraphModel("/model/model.json");
  }
  return modelPromise;
}

export function imageToTensor(imgEl, size = 224) {
  return tf.tidy(() => {
    const tensor = tf.browser.fromPixels(imgEl).toFloat();
    const resized = tf.image.resizeBilinear(tensor, [size, size]);
    return resized.expandDims(0);
  });
}

export async function predict(imgEl, labels) {
  const model = await loadModel();
  const input = imageToTensor(imgEl, 224);

  const out = model.predict(input);
  const probs = await out.data();

  tf.dispose([input, out]);

  const idx = probs[0] >= probs[1] ? 0 : 1;

  return {
    label: labels[idx],
    probs: [
      { label: labels[0], prob: probs[0] },
      { label: labels[1], prob: probs[1] },
    ],
  };
}
