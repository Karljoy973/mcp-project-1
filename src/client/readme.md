# MCP Client

## Architecture Patterns

### Client Registry Wrapper (Alternative à Map)

```typescript
class ClientRegistry {
  private clients: Record<string, MCPClient> = {};
  
  set(name: string, client: MCPClient) { 
    this.clients[name] = client; 
  }
  
  get(name: string) { 
    return this.clients[name]; 
  }
  
  has(name: string) { 
    return name in this.clients; 
  }
  
  delete(name: string) { 
    delete this.clients[name]; 
  }
  
  keys() { 
    return Object.keys(this.clients); 
  }
  
  values() {
    return Object.values(this.clients);
  }
  
  size() {
    return Object.keys(this.clients).length;
  }
}
```

## Performance Monitoring

### Outils recommandés

**Node.js :**
- **clinic.js** - Suite complète de profiling Node.js
  ```bash
  npm install -g clinic
  clinic doctor -- node your-app.js
  clinic bubbleprof -- node your-app.js
  ```

**Navigateur :**
- **Chrome DevTools Performance** - Oui, largement suffisant !
  - Timeline, Memory, CPU profiling
  - `performance.mark()` et `performance.measure()` pour mesures custom
- **web-vitals** - Métriques utilisateur réelles
  ```bash
  npm install web-vitals
  ```
  ```typescript
  import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
  getCLS(console.log);
  getFID(console.log);
  ```

### Sources pour affûter le jugement Map vs Record

**Benchmarks & Articles :**
- [V8 Blog - Fast properties](https://v8.dev/blog/fast-properties)
- [MDN Performance comparison](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#performance)
- [jsperf.com](https://jsperf.com) - Créer vos propres benchmarks
- [Node.js Performance Best Practices](https://nodejs.org/en/docs/guides/simple-profiling/)

**Règles empiriques :**
- Record : < 100 entrées, clés string simples, accès fréquent
- Map : > 100 entrées, clés complexes, ajout/suppression fréquent
- Mesurer dans votre contexte spécifique reste la référence