# gds-fidelization-system
Sistema de Fidelización para Comercios PyME, orientado a mejorar la retención de clientes mediante la acumulación y canje de puntos

# Endpoint sin título

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /auth/login:
    post:
      summary: Endpoint sin título
      deprecated: false
      description: Endpoint for login
      tags:
        - Módulo predeterminado/Auth
      parameters: []
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                  description: Business account email
                  x-apidog-mock: '{{$internet.email}}'
                password:
                  type: string
                  description: Business account password
                  x-apidog-mock: '{{$internet.password}}'
              x-apidog-orders:
                - email
                - password
              required:
                - email
                - password
            examples: {}
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                type: object
                properties:
                  token:
                    type: string
                    description: json web token for frontend cookie
                x-apidog-orders:
                  - token
                required:
                  - token
          headers: {}
          x-apidog-name: Éxito
      security: []
      x-apidog-folder: Módulo predeterminado/Auth
      x-apidog-status: developing
      x-run-in-apidog: https://app.apidog.com/web/project/1097668/apis/api-22730406-run
components:
  schemas: {}
  securitySchemes: {}
servers: []
security: []

```
