---
title: "Mi Proyecto Final: Pruebas de Penetración con OWASP API Security Top 10 2023"
slug: "es/my-final-project"
image:
  {
    "src": "/covers/my-final-project.webp",
    "alt": "Concepto de pruebas de penetración en ciberseguridad",
  }
author: "Cristian Arando"
language: "es"
tags:
  [
    "ciberseguridad",
    "pruebas de penetración"
  ]
publishDate: "2024-09-20"
authorContact: "crisarandosyse@gmail.com"
readTime: "5 min"
excerpt: "JavaScript es un lenguaje de programación versátil que juega un papel de apoyo en la industria aeroespacial, particularmente en simulación, visualización y análisis de datos."
featured: true
---

## Introducción

Como proyecto final para obtener mi grado en Ingeniería de Sistemas, realicé una evaluación integral de pruebas de penetración del sistema web SISGAA en la Universidad Mayor de San Simón. El proyecto aplicó metodologías estándar de la industria del OWASP Top 10 y OWASP API Security Top 10 para identificar, analizar y recomendar mitigaciones para vulnerabilidades de seguridad.

> **Nota:** Puedes ver el documento completo de este proyecto en el <a href="http://atlas.umss.edu.bo/handle/123456789/47539" target="_blank" rel="noopener noreferrer">repositorio institucional de la UMSS</a>.

## Antecedentes del Proyecto

El sistema SISGAA (Sistema de Gestión Académica y Administrativa) es una aplicación web crítica utilizada por el Departamento de Informática y Sistemas. Gestiona datos académicos y administrativos sensibles, lo que hace que su seguridad sea esencial para proteger tanto la información institucional como personal.

## Metodología

Mi enfoque siguió una metodología estructurada de pruebas de penetración:

1. **Planificación y Definición de Alcance**: Establecí límites claros y objetivos para la evaluación de seguridad
2. **Recopilación de Información**: Recolecté datos sobre la arquitectura del sistema y la pila tecnológica
3. **Análisis de Vulnerabilidades**: Identifiqué posibles debilidades de seguridad
4. **Explotación**: Verifiqué vulnerabilidades mediante pruebas controladas
5. **Documentación**: Detallé hallazgos y recomendaciones

## Enfoque Técnico

El proceso de pruebas de penetración incorporó dos marcos complementarios:

### Pruebas de Aplicaciones Web (OWASP Top 10)

Realicé pruebas exhaustivas para vulnerabilidades web comunes, incluyendo:

- Cross-Site Scripting (XSS)
- Autenticación Rota
- Exposición de Datos Sensibles
- Configuraciones Incorrectas de Seguridad

### Pruebas de Seguridad en API (OWASP API Security Top 10)

Con las aplicaciones web modernas dependiendo en gran medida de las API, implementé una metodología especializada:

1. **Descubrimiento**: Mapeo de la estructura y endpoints de la API
2. **Análisis de Endpoints**: Examen de patrones de solicitud/respuesta
3. **Pruebas de Autenticación**: Verificación de mecanismos de inicio de sesión
4. **Explotación de Autorización**: Prueba de límites de control de acceso

## Hallazgos Clave

Mi evaluación reveló varias vulnerabilidades de seguridad en el sistema SISGAA:

1. **Cross Site Scripting (Reflejado)**: Permitía la posible inyección de scripts maliciosos
2. **Autorización a Nivel de Objeto Rota**: Permitía acceso no autorizado a recursos
3. **Autorización a Nivel de Función Rota**: Habilitaba acceso no autorizado a funcionalidades
4. **Filtración de Documentación de API**: Exponía información sensible de endpoints a través de Swagger
5. **Cabeceras de Seguridad Faltantes**: Carecía de configuraciones críticas de seguridad del navegador
6. **Bibliotecas JavaScript Vulnerables**: Usaba componentes desactualizados con vulnerabilidades conocidas

## Implementación Técnica

El proyecto utilizó herramientas de seguridad especializadas:

- **OWASP ZAP**: Para escaneo automatizado de vulnerabilidades
- **Burp Suite**: Para interceptar y analizar solicitudes HTTP
- **Scripts Personalizados**: Para probar fallos de autorización en API
- **Herramientas de Desarrollo del Navegador**: Para analizar el comportamiento de la aplicación web

## Impacto y Mitigación

Para cada vulnerabilidad, proporcioné estrategias detalladas de mitigación:

- **Validación de Entrada y Codificación de Salida**: Para prevenir ataques XSS
- **Verificaciones Adecuadas de Autorización**: Para hacer cumplir el control de acceso
- **Controles de Seguridad de API**: Para proteger endpoints sensibles
- **Implementación de Cabeceras de Seguridad**: Para mejorar la seguridad del navegador
- **Actualizaciones de Componentes**: Para eliminar vulnerabilidades conocidas

## Conclusión

Este proyecto demostró cómo las pruebas de penetración sistemáticas pueden identificar vulnerabilidades críticas de seguridad en aplicaciones web antes de que puedan ser explotadas por actores maliciosos. Los hallazgos destacaron la importancia de incorporar seguridad a lo largo del ciclo de vida del desarrollo, particularmente para sistemas que manejan información sensible.

Las recomendaciones proporcionadas ayudarán a fortalecer la postura de seguridad del sistema SISGAA, protegiendo tanto a la institución como a sus usuarios de posibles amenazas cibernéticas.

## Habilidades Técnicas Demostradas

- Evaluación de seguridad de aplicaciones web
- Pruebas de seguridad de API
- Técnicas de explotación de vulnerabilidades
- Documentación y reportes de seguridad
- Aplicación práctica