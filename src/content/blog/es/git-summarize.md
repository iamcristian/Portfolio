---
title: "Guia completa de Git: Control de versiones para equipos de desarrollo"
slug: "es/git-summarize"
image:
  src: "/covers/git-summarize.webp"
  alt: "Git control de versiones para equipos de desarrollo"
author: "Cristian Arando"
language: "es"
tags: ["mejores prácticas", "desarrollo"]
publishDate: "2025-07-24"
authorContact: "crisarandosyse@gmail.com"
readTime: "25 min"
excerpt: "Una guía completa de Git que cubre todo, desde conceptos básicos hasta flujos de trabajo avanzados, estrategias de ramificación y mejores prácticas para equipos de desarrollo profesionales."
---

## 1. Entendiendo el Control de Versiones

El control de versiones es un sistema que registra y gestiona los cambios en archivos a lo largo del tiempo, permitiendo a los desarrolladores:

### Por qué Importa el Control de Versiones

**Para Desarrolladores Individuales:**
- **Rastrear Cambios**: Ver exactamente qué cambió, cuándo y por qué
- **Respaldo y Recuperación**: Nunca perder trabajo con respaldos distribuidos
- **Experimentación**: Probar nuevas características sin miedo a romper el código funcional
- **Gestión de Releases**: Etiquetar y mantener múltiples versiones de tu software

**Para Equipos:**
- **Colaboración**: Múltiples desarrolladores trabajando en la misma base de código simultáneamente
- **Resolución de Conflictos**: Fusión inteligente de cambios concurrentes
- **Revisión de Código**: Examen sistemático de cambios antes de la integración
- **Responsabilidad**: Rastrear quién hizo qué cambios y cuándo

### Evolución de los Sistemas de Control de Versiones

**Primera Generación: Sistemas Locales**
- Una sola computadora, base de datos local
- Ejemplos: RCS (Revision Control System)
- Limitación: Sin capacidades de colaboración

**Segunda Generación: Sistemas Centralizados**
- Servidor central almacena todas las versiones
- Ejemplos: CVS, Subversion (SVN)
- Limitación: Punto único de falla, requiere conexión de red

**Tercera Generación: Sistemas Distribuidos**
- Cada desarrollador tiene el historial completo
- Ejemplos: Git, Mercurial, Bazaar
- Ventajas: Trabajo offline, múltiples respaldos, flujos de trabajo flexibles

### Conceptos Clave en Control de Versiones

**Repositorio (Repo)**: Base de datos que contiene todas las versiones de los archivos de tu proyecto y su historial completo.

**Commit**: Instantánea de tu proyecto en un punto específico en el tiempo, con un identificador único y mensaje descriptivo.

**Rama (Branch)**: Línea independiente de desarrollo, permitiendo trabajo paralelo en diferentes características.

**Fusión (Merge)**: Proceso de combinar cambios de diferentes ramas en una sola rama.

**Conflicto**: Situación donde las mismas líneas de código se modifican de manera diferente en las ramas que se están fusionando.

## 2. Fundamentos de Git

Git es un sistema de control de versiones distribuido diseñado para velocidad, simplicidad y fuerte soporte para flujos de trabajo de desarrollo no lineales. Creado por Linus Torvalds en 2005 para el desarrollo del kernel de Linux, Git se ha convertido en el estándar de facto para control de versiones en desarrollo de software.

### Qué Hace Especial a Git

**Arquitectura Distribuida**: A diferencia de sistemas centralizados, cada repositorio Git contiene el historial completo y capacidades completas de seguimiento de versiones. Esto significa:
- Puedes trabajar offline
- Cada clon es un respaldo completo
- Sin punto único de falla
- Múltiples opciones de flujo de trabajo

**Almacenamiento Basado en Instantáneas**: Git almacena instantáneas de todo tu proyecto, no solo diferencias entre archivos. Este enfoque:
- Hace que las ramas y fusiones sean más rápidas
- Proporciona mejor integridad de datos
- Permite compresión eficiente
- Simplifica operaciones complejas

**Integridad Criptográfica**: Todo en Git es verificado usando hashes SHA-1:
- Previene corrupción de datos
- Asegura autenticidad del contenido
- Hace imposible cambiar el historial sin detección
- Proporciona identificadores únicos para cada objeto

### Git vs Otros Sistemas de Control de Versiones

| Característica | Git | Subversion (SVN) | Perforce |
|---------------|-----|------------------|----------|
| **Arquitectura** | Distribuida | Centralizada | Centralizada |
| **Trabajo Offline** | Funcionalidad completa | Limitado | Ninguno |
| **Ramificación** | Ligera, instantánea | Pesada, lenta | Moderada |
| **Fusión** | Algoritmos avanzados | Básica | Manual |
| **Almacenamiento** | Instantáneas | Deltas | Deltas |
| **Rendimiento** | Muy rápido | Moderado | Rápido |
| **Curva de Aprendizaje** | Empinada inicialmente | Suave | Moderada |

### Terminología de Git en Profundidad

**Directorio de Trabajo**: Tu sistema de archivos local donde editas archivos. Esto es lo que ves en tu explorador de archivos - los archivos reales en los que estás trabajando.

**Área de Preparación (Index)**: Un área intermedia donde preparas commits. Piénsalo como un "carrito de compras" donde agregas cambios antes de "comprarlos" (hacer commit).

**Repositorio (directorio .git)**: Donde Git almacena todos los metadatos y la base de datos de objetos para tu proyecto. Contiene todo el historial, ramas y configuración.

**Remoto**: Una versión de tu repositorio alojada en otro lugar (GitHub, GitLab, etc.), usada para colaboración y respaldo.

**HEAD**: Un puntero a la referencia de la rama actual, esencialmente te dice en qué commit estás actualmente.

**Origin**: El nombre predeterminado para el repositorio remoto del que clonaste. Solo es una convención de nomenclatura, no un concepto especial.

### Flujo Básico de Datos de Git

```
Directorio de Trabajo → Área de Preparación → Repositorio → Repositorio Remoto
         ↓                    ↓               ↓              ↓
      git add           git commit       git push      colaboración
```

Entender este flujo es crucial para el uso efectivo de Git. Cada etapa sirve un propósito específico:

1. **Directorio de Trabajo**: Donde haces cambios
2. **Área de Preparación**: Donde preparas qué hacer commit
3. **Repositorio Local**: Donde los commits se almacenan permanentemente
4. **Repositorio Remoto**: Donde compartes con otros

## 3. Arquitectura de Tres Estados de Git

Entender la arquitectura de tres estados de Git es fundamental para dominar el control de versiones. Este modelo conceptual gobierna cómo Git rastrea y gestiona tus archivos a lo largo de su ciclo de vida.

### Los Tres Estados Explicados

```
Directorio de Trabajo → Área de Preparación → Repositorio Local → Repositorio Remoto
     (Modificado)       (Preparado)        (Confirmado)        (Empujado)
        ↓                   ↓                 ↓                   ↓
   Editar archivos    git add archivo   git commit         git push origin
```

#### 1. Modificado (Directorio de Trabajo)
Archivos que han sido cambiados pero aún no están preparados para commit.

```bash
# Verificar qué está modificado
git status
git diff                    # Ver cambios exactos
git diff --name-only       # Solo nombres de archivos
git diff --stat            # Resumen de cambios
```

**Características:**
- Los archivos existen en tu sistema de archivos
- Los cambios aún no son rastreados por Git
- Pueden perderse fácilmente si no tienes cuidado
- Visibles en `git status` como "modificado" o "sin rastrear"

#### 2. Preparado (Área de Preparación/Index)
Archivos que han sido marcados para ir al próximo commit.

```bash
# Preparar archivos específicos
git add nombre-archivo.txt
git add *.js               # Todos los archivos JavaScript
git add .                  # Todos los cambios en directorio actual
git add -A                 # Todos los cambios en todo el repositorio

# Preparación interactiva
git add -p                 # Revisar y preparar fragmentos
git add -i                 # Modo interactivo

# Verificar cambios preparados
git diff --staged          # Ver qué está preparado
git diff --cached          # Comando alternativo
git status                 # Vista general de preparado/no preparado
```

**Mejores Prácticas de Preparación:**
- Preparar cambios relacionados juntos
- Usar `git add -p` para preparación parcial de archivos
- Revisar cambios preparados antes del commit
- Preparar frecuentemente para evitar perder trabajo

#### 3. Confirmado (Repositorio Local)
Archivos almacenados de forma segura en tu base de datos local de Git.

```bash
# Crear commits
git commit -m "Agregar característica de autenticación de usuario"
git commit -am "Corregir bug y actualizar docs"  # Agregar y hacer commit
git commit --amend                               # Modificar último commit

# Ver cambios confirmados
git log                    # Ver historial de commits
git log --oneline         # Vista condensada
git show HEAD             # Mostrar último commit
git show <hash-commit>    # Mostrar commit específico
```

**Características del Commit:**
- Registro permanente en el historial de Git
- Incluye autor, timestamp y mensaje
- Se le asigna un hash SHA-1 único
- Puede compartirse con otros mediante push

### Representación Visual

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Dir. Trabajo    │    │ Área Preparación│    │ Repositorio Git │
│                 │    │                 │    │                 │
│ archivo1.txt(M) │───►│ archivo1.txt    │───►│ commit abc123   │
│ archivo2.js (M) │    │ archivo3.py     │    │ commit def456   │
│ archivo3.py (M) │    │                 │    │ commit ghi789   │
│ nuevo-arch.css  │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

Leyenda: (M) = Modificado, archivos preparados listos para commit

### Estados del Ciclo de Vida de Archivos

Los archivos Git pueden estar en uno de varios estados:

**Sin rastrear**: Archivos nuevos que Git no está monitoreando
```bash
# Ver archivos sin rastrear
git status -u
git ls-files --others --exclude-standard
```

**Rastreado**: Archivos que Git conoce, subdivididos en:
- **Sin modificar**: Sin cambios desde el último commit
- **Modificado**: Cambiado pero no preparado
- **Preparado**: Listo para el próximo commit

**Ignorado**: Archivos explícitamente ignorados via `.gitignore`
```bash
# Verificar si archivo está ignorado
git check-ignore nombre-archivo.txt
git status --ignored
```

### Transiciones de Estado

Entender cómo los archivos se mueven entre estados:

```bash
# Sin rastrear → Preparado
git add nuevo-archivo.txt

# Modificado → Preparado
git add archivo-existente.txt

# Preparado → Confirmado
git commit -m "Mensaje de commit"

# Confirmado → Modificado (editar archivo)
echo "nuevo contenido" >> archivo.txt

# Preparado → Modificado (despreparar)
git reset HEAD archivo.txt
git restore --staged archivo.txt  # Git 2.23+

# Modificado → Sin modificar (descartar cambios)
git checkout -- archivo.txt
git restore archivo.txt           # Git 2.23+
```

## 4. Configuración de Git

La configuración adecuada de Git es esencial para una experiencia de desarrollo fluida. Git opera en tres niveles de configuración, cada uno con diferentes alcances y prioridades.

### Niveles de Configuración

La configuración de Git funciona en un sistema jerárquico:

1. **Nivel de sistema** (`--system`): Se aplica a todos los usuarios y repositorios en la máquina
2. **Nivel global** (`--global`): Se aplica a todos los repositorios para el usuario actual
3. **Nivel local** (`--local`): Se aplica solo al repositorio específico

**Orden de Prioridad**: Local → Global → Sistema (la configuración local anula la global, la global anula el sistema)

### Configuración Inicial Esencial

#### 4.1 Configuración de Identidad de Usuario

Tu identidad se adjunta a cada commit, haciendo crucial esta configuración:

```bash
# Configuración global (recomendada para máquinas personales)
git config --global user.name "Tu Nombre Completo"
git config --global user.email "tu.email@ejemplo.com"

# Configuración local (útil para proyectos de trabajo)
git config --local user.name "Tu Nombre de Trabajo"
git config --local user.email "trabajo.email@empresa.com"

# Verificar identidad
git config user.name
git config user.email
```

**Mejores Prácticas:**
- Usa tu nombre real, no un nombre de usuario
- Usa un email que coincida con tu servicio de hosting Git (GitHub, GitLab)
- Configura emails diferentes para trabajo vs proyectos personales

#### 4.2 Configuración del Editor Predeterminado

Configura tu editor preferido para mensajes de commit y operaciones Git:

```bash
# Visual Studio Code
git config --global core.editor "code --wait"

# Vim (usuarios avanzados)
git config --global core.editor "vim"

# Nano (amigable para principiantes)
git config --global core.editor "nano"

# Sublime Text
git config --global core.editor "subl -w"

# Notepad++ (Windows)
git config --global core.editor "'C:/Program Files/Notepad++/notepad++.exe' -multiInst -notabbar -nosession -noPlugin"
```

#### 4.3 Configuración de Rama Predeterminada

Git moderno permite establecer el nombre de rama predeterminado:

```bash
# Establecer nombre de rama predeterminado para nuevos repositorios
git config --global init.defaultBranch main

# Nombres alternativos que algunos equipos usan
git config --global init.defaultBranch develop
git config --global init.defaultBranch master  # Predeterminado tradicional
```

## 5. Flujo de Trabajo Básico de Git

El flujo de trabajo básico de Git es la base del control de versiones. Dominar estas operaciones fundamentales te permite rastrear cambios, crear commits significativos y mantener un historial limpio del proyecto.

### El Ciclo Estándar del Flujo de Trabajo Git

```
1. Modificar archivos → 2. Preparar cambios → 3. Confirmar cambios → 4. (Opcional) Empujar a remoto
      ↓                        ↓                   ↓                      ↓
   Editar código          git add            git commit            git push
```

### 5.1 Verificar Estado del Repositorio

Entender el estado actual de tu repositorio es crucial antes de hacer cualquier cambio.

#### Comandos Básicos de Estado

```bash
# Estado detallado con consejos útiles
git status

# Formato de estado corto
git status -s
git status --short

# Formato porcelana (legible por máquina)
git status --porcelain

# Mostrar también archivos ignorados
git status --ignored

# Mostrar estado de archivo individual
git status nombre-archivo.txt
```

#### Entender la Salida del Estado

**Ejemplo de Estado Detallado:**
```
En la rama main
Tu rama está actualizada con 'origin/main'.

Cambios para hacer commit:
  (usa "git restore --staged <archivo>..." para despreparar)
        modificado:   src/app.js
        archivo nuevo:   src/utils.js

Cambios no preparados para commit:
  (usa "git add <archivo>..." para actualizar lo que se confirmará)
  (usa "git restore <archivo>..." para descartar cambios en directorio de trabajo)
        modificado:   README.md

Archivos sin rastrear:
  (usa "git add <archivo>..." para incluir en lo que se confirmará)
        config.json
```

**Formato de Estado Corto:**
```
M  src/app.js     # Modificado y preparado
A  src/utils.js   # Agregado (archivo nuevo) y preparado
 M README.md      # Modificado pero no preparado
?? config.json    # Archivo sin rastrear
```

### 5.2 Agregar Cambios al Área de Preparación

El área de preparación te permite preparar selectivamente cambios para commit.

#### Operaciones Básicas de Preparación

```bash
# Preparar archivo específico
git add nombre-archivo.txt

# Preparar múltiples archivos específicos
git add archivo1.txt archivo2.js config.json

# Preparar todos los cambios en directorio actual y subdirectorios
git add .

# Preparar todos los cambios en todo el repositorio
git add -A
git add --all

# Preparar todos los archivos rastreados (excluye archivos nuevos)
git add -u
git add --update
```

#### Preparación Basada en Patrones

```bash
# Preparar todos los archivos JavaScript
git add "*.js"
git add src/**/*.js

# Preparar todos los archivos en directorio específico
git add src/
git add tests/

# Preparar archivos con extensión específica
git add *.css *.html

# Preparar archivos que coincidan con patrón complejo
git add "src/**/*.{js,ts,jsx,tsx}"
```

### 5.3 Crear Commits

Los commits son instantáneas de tu proyecto en puntos específicos en el tiempo.

#### Operaciones Básicas de Commit

```bash
# Commit simple con mensaje
git commit -m "Agregar característica de autenticación de usuario"

# Mensaje de commit multilínea
git commit -m "Agregar autenticación de usuario" \
           -m "- Implementar funcionalidad de login/logout" \
           -m "- Agregar validación de contraseña" \
           -m "- Crear gestión de sesión de usuario"

# Abrir editor para mensaje detallado de commit
git commit

# Commit con preparación automática de archivos rastreados
git commit -a -m "Corregir bug de login y actualizar documentación"
git commit -am "Corregir bug de login y actualizar documentación"  # Forma corta
```

#### Mejores Prácticas para Mensajes de Commit

**Convención de Formato:**
```
tipo(ámbito): descripción breve

Explicación más detallada si es necesaria.

- Listar cambios específicos
- Referenciar issues: Corrige #123
- Incluir notas de cambios importantes

Co-authored-by: Nombre <email@ejemplo.com>
```

**Tipos Comunes:**
- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Formato de código
- `refactor`: Reestructuración de código
- `test`: Agregar pruebas
- `chore`: Tareas de mantenimiento

**Buenos Mensajes de Commit:**
```bash
git commit -m "feat(auth): agregar validación de token JWT"
git commit -m "fix(ui): resolver problema de alineación de botón en móvil"
git commit -m "docs: actualizar documentación API para v2.0"
git commit -m "refactor: extraer servicio de usuario a módulo separado"
```

## 6. Visualización del Historial y Logs

El seguimiento del historial de Git es una de sus características más poderosas. Entender cómo ver y analizar efectivamente el historial de tu proyecto ayuda con la depuración, revisión de código y comprensión de la evolución del proyecto.

### 6.1 Comandos Básicos de Log

El comando `git log` es tu herramienta principal para explorar el historial del repositorio.

#### Formatos Esenciales de Log

```bash
# Log básico con información completa de commit
git log

# Formato compacto de una línea
git log --oneline

# Mostrar número específico de commits
git log -5                    # Últimos 5 commits
git log --max-count=10        # Sintaxis alternativa

# Representación gráfica de ramas
git log --graph --oneline --all
git log --graph --pretty=format:'%h -%d %s (%cr) <%an>' --abbrev-commit --all

# Mostrar cambios de archivos en cada commit
git log -p                    # Mostrar parches (diffs)
git log --stat                # Mostrar estadísticas de archivos
git log --shortstat           # Estadísticas compactas
git log --name-only           # Solo nombres de archivos
git log --name-status         # Nombres de archivos con tipo de cambio (A/M/D)
```

#### Filtrado Avanzado de Log

```bash
# Filtrar por autor
git log --author="Juan Pérez"
git log --author="juan"       # Coincidencia parcial
git log --committer="maría"   # Filtrar por committer

# Filtrar por rango de fechas
git log --since="2024-01-01"
git log --until="2024-12-31"
git log --since="1 week ago"
git log --after="2024-01-01" --before="2024-02-01"

# Filtrar por mensaje de commit
git log --grep="bugfix"       # Buscar mensajes de commit
git log --grep="feat"         # Encontrar commits de características
git log --grep="fix" --grep="bug" --all-match  # Múltiples patrones (AND)
git log --grep="fix\|bug"     # Patrón regex (OR)

# Filtrar por archivo o directorio
git log -- nombre-archivo.txt # Commits que afectan archivo específico
git log -- src/              # Commits que afectan directorio
git log --follow -- archivo.txt  # Seguir archivo a través de renombres

# Filtrar por cambios de contenido
git log -S "nombre_función"   # Encontrar commits que agregan/quitan cadena específica
git log -G "patrón_regex"     # Encontrar commits con contenido que coincide con regex
```

## 7. Ramas en Git: Desarrollo Paralelo

Las ramas son la característica distintiva de Git que lo diferencia de otros sistemas de control de versiones. Entender las ramas profundamente permite desarrollo paralelo, experimentación y flujos de trabajo sofisticados que escalan desde proyectos individuales hasta equipos empresariales.

### 7.1 Entendiendo las Ramas

#### ¿Qué son las Ramas?

Una rama en Git es simplemente un puntero ligero y móvil a un commit específico. A diferencia de otros sistemas de control de versiones donde las ramas pueden ser costosas y lentas, las ramas Git son:

- **Ligeras**: Solo un archivo de 41 bytes conteniendo un checksum SHA-1
- **Rápidas**: Crear y cambiar ramas es casi instantáneo
- **Independientes**: Los cambios en una rama no afectan otras hasta ser fusionadas
- **Completas**: Cada rama mantiene su propio estado de directorio de trabajo

#### El Modelo de Puntero de Rama

```
main     →  [A] ← [B] ← [C]
feature  →           ↗ [D] ← [E]
```

- `main` apunta al commit C
- `feature` apunta al commit E
- Ambas ramas comparten los commits A y B
- HEAD apunta a la rama actual

### 7.2 Operaciones Básicas de Ramas

#### Crear Ramas

```bash
# Crear nueva rama desde commit actual
git branch feature-auth

# Crear rama desde commit específico
git branch feature-auth abc123

# Crear rama desde otra rama
git branch feature-auth develop

# Crear y cambiar en un comando (moderno)
git switch -c feature-auth
git switch -c feature-auth main    # Desde rama específica

# Crear y cambiar (tradicional)
git checkout -b feature-auth
git checkout -b feature-auth main  # Desde rama específica
```

#### Listar y Ver Ramas

```bash
# Listar ramas locales
git branch
git branch --list

# Listar todas las ramas (locales y remotas)
git branch -a
git branch --all

# Listar solo ramas remotas
git branch -r
git branch --remotes

# Mostrar información de rama con seguimiento
git branch -vv                # Verbose con info de seguimiento
git branch -v                 # Solo verbose

# Mostrar ramas fusionadas/no fusionadas
git branch --merged           # Ramas fusionadas en actual
git branch --no-merged        # Ramas no fusionadas
git branch --merged main      # Ramas fusionadas en main
```

#### Cambiar Ramas

```bash
# Comando switch moderno (Git 2.23+)
git switch feature-auth
git switch main
git switch -                  # Cambiar a rama anterior

# Checkout tradicional (aún funciona)
git checkout feature-auth
git checkout main
git checkout -                # Cambiar a rama anterior

# Cambiar y crear si no existe
git switch -c nueva-feature

# Cambiar con cambios sin confirmar (stash automático)
git switch --detach HEAD~3   # Separar HEAD a commit específico
```

## 8. Fusión de Ramas (Merge)

La fusión integra cambios de diferentes ramas en un historial unificado. Entender varias estrategias de fusión y sus implicaciones te ayuda a mantener un historial limpio del proyecto y elegir el enfoque correcto para diferentes escenarios.

### 8.1 Tipos de Fusión

Git ofrece varias estrategias de fusión, cada una creando diferentes patrones de historial:

```
Fast-Forward:     A---B---C (main)
                           \
                            D---E (feature)
Resultado:        A---B---C---D---E (main)

Three-Way:        A---B---C (main)
                       \   \
                        D---E (feature)
Resultado:        A---B---C---M (main)
                       \     /
                        D---E

Squash:           A---B---C (main)
                       \
                        D---E (feature)
Resultado:        A---B---C---S (main, S contiene cambios D+E)
```

### 8.2 Fusiones Fast-Forward

Cuando la rama objetivo no ha divergido de la rama fuente, Git puede simplemente mover el puntero de rama hacia adelante.

#### Cuándo Ocurre Fast-Forward

```bash
# Escenario: main no ha cambiado desde que se creó la rama feature
git switch main               # Cambiar a rama objetivo
git merge feature-auth       # Fusión fast-forward
```

### 8.3 Resolución de Conflictos de Fusión

Los conflictos ocurren cuando Git no puede reconciliar automáticamente las diferencias entre ramas.

#### Resolución Manual de Conflictos

```bash
# 1. Ver archivos en conflicto
git status

# 2. Ver conflictos en detalle
git diff

# 3. Editar archivos para resolver conflictos
# Quitar marcadores y elegir/combinar cambios deseados

# 4. Preparar archivos resueltos
git add archivo-resuelto.js

# 5. Continuar fusión
git commit
```

## 9. Trabajar con Repositorios Remotos

Los repositorios remotos son la columna vertebral de los flujos de trabajo colaborativos de Git. Entender cómo trabajar efectivamente con remotos permite colaboración fluida en equipo, estrategias de respaldo y patrones de desarrollo distribuido.

### 9.1 Configuración de Autenticación

#### Configuración de Autenticación SSH

SSH proporciona autenticación segura sin contraseña para operaciones Git:

```bash
# 1. Generar par de claves SSH
ssh-keygen -t ed25519 -C "tu.email@ejemplo.com"

# Cuando se solicite, guardar en ubicación predeterminada (~/.ssh/id_ed25519)
# Opcionalmente establecer una frase de paso para seguridad adicional

# 2. Iniciar agente SSH
eval "$(ssh-agent -s)"

# 3. Agregar clave al agente SSH
ssh-add ~/.ssh/id_ed25519

# 4. Copiar clave pública al portapapeles
# macOS:
pbcopy < ~/.ssh/id_ed25519.pub

# Linux:
xclip -sel clip < ~/.ssh/id_ed25519.pub

# Windows (Git Bash):
cat ~/.ssh/id_ed25519.pub | clip

# Copia manual:
cat ~/.ssh/id_ed25519.pub
```

#### Configuración Básica de Remotos

```bash
# Agregar nuevo remoto
git remote add origin https://github.com/usuario/repo.git

# Agregar remoto con SSH (recomendado para uso regular)
git remote add origin git@github.com:usuario/repo.git

# Agregar remotos adicionales
git remote add upstream https://github.com/original/repo.git
git remote add production git@servidor-produccion:repo.git

# Cambiar URL remota
git remote set-url origin git@github.com:usuario/repo.git

# Ver información de remotos
git remote -v
git remote show origin
```

### 9.2 Operaciones de Fetch y Pull

#### Operaciones Básicas de Fetch

```bash
# Obtener desde remoto predeterminado (origin)
git fetch

# Obtener desde remoto específico
git fetch upstream

# Obtener todos los remotos
git fetch --all

# Obtener rama específica
git fetch origin main
git fetch upstream develop

# Obtener todas las ramas y tags
git fetch origin --tags
git fetch --all --tags
```

#### Operaciones de Pull

```bash
# Pull desde remoto predeterminado y rama
git pull

# Pull desde remoto específico
git pull origin

# Pull rama específica
git pull origin main
git pull upstream develop

# Pull con rebase (historial más limpio)
git pull --rebase origin main

# Configurar estrategia predeterminada de pull
git config --global pull.rebase true   # Siempre rebase
git config --global pull.ff only       # Solo fast-forward
```

### 9.3 Operaciones de Push

#### Operaciones Básicas de Push

```bash
# Push rama actual a su upstream
git push

# Push a remoto y rama específicos
git push origin main

# Push nueva rama y establecer upstream
git push -u origin feature-rama
git push --set-upstream origin feature-rama

# Push todas las ramas
git push --all origin

# Push tags
git push --tags origin
git push origin --tags

# Push tag específico
git push origin v1.0.0
```

## 10. GitHub y Colaboración

GitHub ha revolucionado el desarrollo colaborativo de software proporcionando una plataforma integral que combina control de versiones Git con poderosas herramientas de colaboración.

### 10.1 Flujo de Fork y Pull Request

#### El Flujo Completo de Fork

Este flujo es esencial para contribuir a proyectos de código abierto o cuando no tienes acceso directo de escritura a un repositorio.

```bash
# 1. Fork repositorio en GitHub (vía interfaz web)
# Hacer clic en botón "Fork" en la página del repositorio

# 2. Clonar tu fork localmente
git clone git@github.com:tuusuario/proyecto-original.git
cd proyecto-original

# 3. Agregar repositorio original como upstream remoto
git remote add upstream git@github.com:propietario-original/proyecto-original.git

# 4. Verificar remotos
git remote -v
# origin    git@github.com:tuusuario/proyecto-original.git (fetch)
# origin    git@github.com:tuusuario/proyecto-original.git (push)
# upstream  git@github.com:propietario-original/proyecto-original.git (fetch)
# upstream  git@github.com:propietario-original/proyecto-original.git (push)

# 5. Mantener tu fork sincronizado
git fetch upstream
git switch main
git merge upstream/main
git push origin main
```

### 10.2 Creación y Gestión de Pull Requests

```bash
# 1. Crear rama de característica desde main actualizado
git switch main
git pull upstream main
git switch -c feature/mejorar-documentacion

# 2. Hacer cambios con buenas prácticas de commit
echo "# Documentación Mejorada" > CONTRIBUTING.md
git add CONTRIBUTING.md
git commit -m "docs: agregar guías de contribución

- Agregar sección de código de conducta
- Explicar proceso de pull request
- Incluir estándares de codificación
- Agregar plantillas de issue

Cierra #123"

# 3. Push rama de característica a tu fork
git push -u origin feature/mejorar-documentacion

# 4. Crear Pull Request (vía interfaz web de GitHub o CLI)
# Usando GitHub CLI (si está instalado):
gh pr create --title "Mejorar documentación del proyecto" --body "
Este PR mejora la documentación del proyecto mediante:

- Agregar guías completas de contribución
- Incluir código de conducta
- Explicar el proceso de pull request
- Documentar estándares de codificación

## Pruebas
- [x] Revisar todos los enlaces de documentación
- [x] Verificar formato markdown
- [x] Confirmar que los ejemplos funcionan como se espera

Cierra #123
"
```

## 11. Técnicas Avanzadas de Git

### 11.1 Git Stash: Almacenamiento Temporal de Trabajo

Git stash es tu red de seguridad para gestionar cambios sin confirmar cuando necesitas cambiar rápidamente de contexto sin perder trabajo.

#### Operaciones Básicas de Stash

```bash
# Guardar cambios actuales (solo archivos rastreados)
git stash

# Guardar con mensaje descriptivo
git stash push -m "WIP: implementando autenticación de usuario"

# Guardar incluyendo archivos sin rastrear
git stash -u
git stash --include-untracked

# Guardar todo (incluyendo archivos ignorados)
git stash -a
git stash --all

# Guardar solo archivos específicos
git stash push -m "Stash parcial" -- archivo1.js archivo2.css

# Guardar interactivamente (elegir fragmentos)
git stash -p
git stash --patch
```

#### Gestión de Múltiples Stashes

```bash
# Listar todos los stashes con detalles
git stash list
git stash list --stat  # Mostrar archivos cambiados en cada stash

# Ejemplo de salida:
# stash@{0}: WIP on main: abc123 Add login feature
# stash@{1}: On feature-branch: def456 Experimental changes
# stash@{2}: WIP on main: ghi789 Bug fix attempt

# Mostrar contenido del stash
git stash show stash@{0}        # Resumen
git stash show -p stash@{0}     # Diff completo
git stash show stash@{0} --stat # Estadísticas de archivos

# Aplicar stash específico (mantiene stash en pila)
git stash apply stash@{1}

# Pop stash específico (quita de pila después de aplicar)
git stash pop stash@{0}

# Crear rama desde stash
git stash branch feature-stash-recovery stash@{1}

# Eliminar stash específico
git stash drop stash@{2}

# Limpiar todos los stashes (CUIDADO: irreversible)
git stash clear
```

### 11.2 Git Tags: Marcar Puntos Importantes

Los tags crean referencias permanentes a commits específicos, esenciales para releases, deployments y seguimiento de hitos.

#### Creación y Tipos de Tags

```bash
# Tag ligero (puntero simple a commit)
git tag v1.0.0
git tag v1.0.0 abc123  # Tag commit específico

# Tag anotado (recomendado - contiene metadatos)
git tag -a v1.0.0 -m "Versión de release 1.0.0"
git tag -a v1.0.0 -m "Versión de release 1.0.0" abc123

# Tag firmado (con firma GPG)
git tag -s v1.0.0 -m "Release firmado v1.0.0"

# Tag con mensaje detallado (abre editor)
git tag -a v1.0.0
```

#### Operaciones de Tags Remotos

```bash
# Push tag específico
git push origin v1.0.0

# Push todos los tags
git push origin --tags
git push --tags  # A remoto predeterminado

# Push tags y commits juntos
git push origin main --tags

# Obtener tags desde remoto
git fetch origin --tags

# Eliminar tag local
git tag -d v1.0.0

# Eliminar tag remoto
git push origin --delete v1.0.0
git push origin :refs/tags/v1.0.0  # Sintaxis alternativa
```

### 11.3 Git Hooks: Automatización e Integración de Flujo de Trabajo

Los hooks de Git son scripts que se ejecutan automáticamente en puntos específicos del flujo de trabajo Git, habilitando automatización poderosa y control de calidad.

#### Hook Pre-commit Esencial

```bash
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
# Prevenir commits con declaraciones de depuración

echo "Ejecutando verificaciones pre-commit..."

# Verificar console.log en archivos JavaScript
if git diff --cached --name-only | grep -E '\.(js|jsx|ts|tsx)$' | xargs grep -l "console\." 2>/dev/null; then
    echo "❌ Commit rechazado: Eliminar declaraciones console.*"
    echo "Archivos con declaraciones console:"
    git diff --cached --name-only | grep -E '\.(js|jsx|ts|tsx)$' | xargs grep -l "console\."
    exit 1
fi

# Verificar TODO/FIXME en código confirmado
if git diff --cached | grep -E "^\+.*TODO|^\+.*FIXME"; then
    echo "⚠️  Advertencia: Confirmando elementos TODO/FIXME"
    echo "¿Estás seguro de que quieres confirmar estos? (y/N)"
    read response
    if [ "$response" != "y" ] && [ "$response" != "Y" ]; then
        exit 1
    fi
fi

# Ejecutar linter si está disponible
if command -v npm >/dev/null 2>&1 && [ -f package.json ]; then
    echo "Ejecutando ESLint..."
    npm run lint 2>/dev/null || {
        echo "❌ Linting falló. Corrige errores antes de confirmar."
        exit 1
    }
fi

echo "✅ Todas las verificaciones pre-commit pasaron"
EOF

chmod +x .git/hooks/pre-commit
```

### 11.4 Git Aliases: Atajos de Usuario Avanzado

Los aliases transforman comandos largos de Git en atajos memorables, mejorando dramáticamente la eficiencia del flujo de trabajo diario.

#### Configuración de Aliases Esenciales

```bash
# Atajos básicos de comandos
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.sw switch

# Estado y log mejorados
git config --global alias.s "status --short --branch"
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

# Aliases avanzados
git config --global alias.unstage "reset HEAD --"
git config --global alias.last "log -1 HEAD"
git config --global alias.visual "!gitk"
```

#### Aliases Compuestos Poderosos

```bash
# Formateo complejo de log
git config --global alias.hist "log --pretty=format:'%h %ad | %s%d [%an]' --graph --date=short"
git config --global alias.timeline "log --graph --branches --pretty=oneline --decorate"
git config --global alias.contributors "shortlog --summary --numbered"

# Gestión de ramas
git config --global alias.recent "for-each-ref --sort=-committerdate refs/heads/ --format='%(committerdate:short) %(refname:short)'"
git config --global alias.branches "branch -a"
git config --global alias.remotes "remote -v"

# Aliases de diff
git config --global alias.changes "diff --name-status"
git config --global alias.dic "diff --cached"
git config --global alias.diffstat "diff --stat"
```

## 12. Estrategias de Ramificación

Elegir la estrategia de ramificación correcta es crucial para la productividad del equipo y la calidad del código. Cada estrategia tiene casos de uso específicos, ventajas y compensaciones.

### 12.1 Git Flow: El Enfoque Empresarial Tradicional

Git Flow es un modelo de ramificación robusto diseñado para proyectos con releases programados y múltiples entornos.

#### Estructura de Ramas

```
main (producción) ←─── hotfix/* (correcciones de emergencia)
  │                      │
  └── release/* ←─── develop (integración) ←─── feature/* (nuevas características)
```

**Tipos de Ramas:**
- **`main`**: Código listo para producción, cada commit representa un release
- **`develop`**: Rama de integración donde las características se unen
- **`feature/*`**: Ramas de desarrollo de características individuales
- **`release/*`**: Preparación de release y corrección de bugs
- **`hotfix/*`**: Correcciones críticas de producción

### 12.2 GitHub Flow: Despliegue Continuo Simplificado

GitHub Flow enfatiza simplicidad y despliegue continuo con una sola rama principal.

#### Proceso Completo de GitHub Flow

```bash
# 1. Siempre comenzar desde main actualizado
git switch main
git pull origin main

# 2. Crear rama de característica descriptiva
git switch -c feature/add-payment-integration

# 3. Desarrollar con commits frecuentes
git add payment-service.js
git commit -m "feat: agregar servicio de pago Stripe"

git add payment-routes.js
git commit -m "feat: agregar endpoints API de pago"

git add payment.test.js
git commit -m "test: agregar pruebas de servicio de pago"

# 4. Push rama temprano y frecuentemente
git push -u origin feature/add-payment-integration

# 5. Abrir Pull Request (puede ser borrador inicialmente)
gh pr create --title "Agregar integración de pagos" --body "Implementa procesamiento de pagos Stripe con cobertura completa de pruebas"

# 6. Continuar desarrollo y push actualizaciones
git add payment-webhook.js
git commit -m "feat: agregar manejador de webhook de pago"
git push origin feature/add-payment-integration

# 7. Solicitar revisión y abordar feedback
# Los revisores agregan comentarios, tú respondes con commits

# 8. Fusionar después de aprobación
git switch main
git pull origin main
git merge --no-ff feature/add-payment-integration
git push origin main

# 9. Limpiar
git branch -d feature/add-payment-integration
git push origin --delete feature/add-payment-integration
```

## 13. Mejores Prácticas y Rendimiento

### 13.1 Excelencia en Mensajes de Commit

Los mensajes de commit bien elaborados son la base del historial mantenible del proyecto. Sirven como documentación, ayudas de depuración y herramientas de colaboración.

#### Formato de Commits Convencionales

```bash
# Formato estándar
tipo(ámbito): descripción breve

Explicación opcional más larga de qué cambió y por qué

- Cambio clave 1
- Cambio clave 2
- Notas de cambios importantes

Cierra #123
Co-authored-by: Jane Doe <jane@ejemplo.com>
```

#### Tipos de Commit y Uso

```bash
# feat: Nuevas características
git commit -m "feat(auth): agregar autenticación JWT"

# fix: Correcciones de bugs
git commit -m "fix(ui): corregir problema de responsive en móvil"

# docs: Cambios en documentación
git commit -m "docs: actualizar guía de instalación"

# style: Cambios de formato (sin afectar funcionalidad)
git commit -m "style: aplicar formato eslint a archivos JS"

# refactor: Cambios de código sin agregar características o corregir bugs
git commit -m "refactor: extraer lógica de validación a módulo separado"

# test: Agregar o modificar pruebas
git commit -m "test: agregar pruebas unitarias para servicio de usuario"

# chore: Tareas de mantenimiento
git commit -m "chore: actualizar dependencias a últimas versiones"
```

Esta guía completa de Git en español cubre todos los aspectos esenciales y avanzados del control de versiones, desde conceptos básicos hasta técnicas profesionales de colaboración y mejores prácticas para equipos de desarrollo.
