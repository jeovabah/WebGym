import { useEffect, useState } from "react";
import * as faceapi from "face-api.js";

function FaceSimilarityComponent() {
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [similarity, setSimilarity] = useState<null | number>(null);

  async function loadModels() {
    await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
  }

  async function compareFaces() {
    const img1 = await faceapi.fetchImage(url1);
    const img2 = await faceapi.fetchImage(url2);

    const detections1 = await faceapi
      .detectAllFaces(img1)
      .withFaceLandmarks()
      .withFaceDescriptors();
    const detections2 = await faceapi
      .detectAllFaces(img2)
      .withFaceLandmarks()
      .withFaceDescriptors();

    if (detections1.length && detections2.length) {
      const distance: number = faceapi.euclideanDistance(
        detections1[0].descriptor,
        detections2[0].descriptor
      );
      setSimilarity(1 - distance); // 1 significa idêntico; quanto menor a distância, mais similares são as faces
    }
  }

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="URL da primeira imagem"
        value={url1}
        onChange={(e) => setUrl1(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL da segunda imagem"
        value={url2}
        onChange={(e) => setUrl2(e.target.value)}
      />
      <button onClick={compareFaces}>Comparar</button>
      {similarity !== null && <p>Similaridade: {similarity}</p>}
    </div>
  );
}

export default FaceSimilarityComponent;
