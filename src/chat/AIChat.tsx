/*eslint no-unused-vars: "error"*/
import { useState, useEffect } from "react";

import ollama, { type ModelResponse } from "ollama";
export const AIChat = () => {
  const [availableModels, setAvailableModels] = useState<
    ModelResponse[] | undefined
  >(undefined);

  const [currentModel, setCurrentModel] = useState<ModelResponse | undefined>(
    undefined,
  );

  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    ollama.list().then((modelList) => {
      console.log(modelList);
      setAvailableModels(modelList.models);
    });
  }, []);

  return (
    <>
      {!currentModel && <p>Aucun Model Sélectionné</p>}
      {!!currentModel && (
        <p>Modèle actuellement utilisé : {currentModel.model}</p>
      )}

      {
        <p
          aria-placeholder="Hello world"
          style={{
            width: "700px",
            height: "300px",
            borderColor: "black",
            borderRadius: "2px",
            borderStyle: "solid",
          }}
        ></p>
      }

      {!availableModels && <p>Fetching available models, please wait</p>}
      {!!availableModels && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "700px",
          }}
        >
          {" "}
          <input
            type="text"
            placeholder="Ecrivez votre message ...,"
            value={message}
            onChange={(e) => setMessage(() => e.target.value)}
            style={{ width: "550px", height: "80px", margin: "10px 5px" }}
          />
          {!!availableModels && (
            <select
              name="model-name"
              style={{
                height: "80px",
                width: "200px",
                paddingLeft: "15px",
              }}
              onChange={(eventModel) => {
                const modelName = eventModel.target.value;
                setCurrentModel(() =>
                  availableModels.find((model) => model.model == modelName),
                );
              }}
            >
              {availableModels.map((model) => (
                <div>
                  <option value={model.model}>
                    <p>{model.model}</p>
                  </option>
                </div>
              ))}
            </select>
          )}
        </div>
      )}
    </>
  );
};
