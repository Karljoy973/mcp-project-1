# React + Ollama JS

Ce projet vise à construire une **application MCP fullstack** composée de trois éléments : un **Host**, un **Client** et un **Server**. L’objectif est de proposer une architecture complète permettant d’interagir avec des modèles d’IA via une interface utilisateur moderne et un protocole standardisé.

## 🚀 Architecture

* **Host (Front-end)** : interface en React.
* **Client** : implémentation du protocole MCP avec le SDK `@modelcontextprotocol`.
* **Server (Back-end)** : traitement et exposition de données (ex. météo), avec une vue adaptée à l’architecture MCP.

---

## 🖥️ Host

Le **Host** est développé avec **React**.
Actuellement, il s’agit d’une page unique offrant :

* 📑 Un menu déroulant listant les modèles d’IA disponibles sur le serveur.
* 💬 Un champ de saisie pour les requêtes de l’utilisateur.
* 🪞 Un espace de discussion affichant l’échange entre l’utilisateur et le modèle sélectionné.

---

## 🔗 Client

Le **Client** est un client MCP construit avec le SDK [`@modelcontextprotocol`](https://www.npmjs.com/package/@modelcontextprotocol).

* Transport actuel : **STDIO**.
* Évolution prévue : passage à une **requête HTTP streamable** pour plus de flexibilité et de performance.

---

## ⚙️ Server

Le **Server** aura pour rôle de :

* Traiter des données (par exemple : données météorologiques).
* Proposer une vue structurée de ces données.
* S’intégrer dans l’architecture MCP pour assurer une communication fluide avec le client et le host.

---

## 📌 Objectifs à court terme

* [ ] Finaliser la première version du Host React.
* [ ] Mettre en place la couche de transport HTTP côté Client.
* [ ] Prototyper un Server simple avec données météo.


