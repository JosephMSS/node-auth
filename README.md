# Clean Architecture Auth

## Estructura de Directorios y reponsabilidades

1. Presentación:
   - Es la plataforma por la cual el usuario interactuar con la aplicación.
   - Se conoce mejor com el framework de la aplicación.
   - Deberíamos ser capaces de cambiarlo sin afectar el resto de la aplicación.
2. Dominio:
   - Reglas de uso de la aplicación.
   - !! No pueden tener dependencias externas
3. Infraestructura:
   - Es un punto intermedio
   - Se crean las implementaciones

### Notas

- Los constructores deben tener un limite en la cantidad de parámetros que reciben.
- si es mayor a 4 es mejor utilizar un objeto con los parámetros.
- Ejemplo:

```typescript
import express from "express"
export interface Options {
  port?: number
}
export class Server {
  public readonly app = express()
  private port: number
  constructor(options: Options) {
    const { port = 3001 } = options
    this.port = port
  }
  async start() {
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`)
    })
  }
}
```
