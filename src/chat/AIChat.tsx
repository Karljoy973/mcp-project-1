/*eslint no-unused-vars: "error"*/
import { useState, useEffect } from "react";
import ollama, { type ModelResponse, type Tool } from "ollama/browser";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Client } from "@modelcontextprotocol/sdk/client";

export const AIChat = () => {
	const [availableModels, setAvailableModels] = useState<
		ModelResponse[] | undefined
	>(undefined);

	const [currentModel, setCurrentModel] = useState<ModelResponse | undefined>(
		undefined
	);

	const [message, setMessage] = useState<string>("");
	const [baseUrl, setBaseUrl] = useState<URL>(
		new URL("http://localhost:11434/")
	);
	const [transport, setTransport] = useState<
		StreamableHTTPClientTransport | undefined
	>(undefined);
	const mcp = new Client({
		name: "hello-client",
		version: "1.0",
		title: "hello client",
	});

	const [tools, setTools] = useState<unknown[] | object | undefined>(
		undefined
	);
	const [mcpClientError, setMcpCLientErrors] = useState<string | undefined>(
		undefined
	);

	useEffect(() => {
		ollama
			.list()
			.then((value) => {
				if (!value) throw new Error("impossible to contact ai");
				return value.models;
			})
			.then((models) => setAvailableModels(models))
			.catch((e) => setMcpCLientErrors(e));
	}, []);

	useEffect(() => {
		mcp.listTools()
			.then((response) => {
				if (!response) throw Error("Impossible to get Tools response");
				else setMcpCLientErrors(undefined);
				return response;
			})
			.then((response) => {
				setTools(() => response);
			})
			.catch((e) => setMcpCLientErrors(e));
	}, [transport]);

	useEffect(() => {
		setTransport(
			new StreamableHTTPClientTransport(baseUrl as URL, {
				requestInit: {
					headers: {
						"Content-Type":
							"text/plain;application/json;charset=utf-8",
					},
					body: JSON.stringify({
						model: currentModel?.model,
						prompt: "hello",
					}),
				},
			})
		);
		mcp.connect(transport as StreamableHTTPClientTransport);
	}, [currentModel]);
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
					}}></p>
			}

			{!availableModels && <p>Fetching available models, please wait</p>}
			{!!availableModels && (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						width: "700px",
					}}>
					{" "}
					<input
						type="text"
						placeholder="Ecrivez votre message ...,"
						value={message}
						onChange={(e) => setMessage(() => e.target.value)}
						style={{
							width: "550px",
							height: "80px",
							margin: "10px 5px",
						}}
					/>
					<button onClick={() => {}}>entrer</button>
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
									availableModels.find(
										(model) => model.model == modelName
									)
								);
							}}>
							{availableModels.map((model) => (
								<div>
									<option value={model.model}>
										{model.model}
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
