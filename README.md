# Taller Mecánico Landing Web

[![Deploy to GitHub Pages](https://github.com/juanpalacioscmd/taller-mecanico-landing/actions/workflows/deploy.yml/badge.svg)](https://github.com/juanpalacioscmd/taller-mecanico-landing/actions/workflows/deploy.yml)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://juanpalacioscmd.github.io/taller-mecanico-landing/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?logo=vite)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Modern-1572B6?logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Responsive](https://img.shields.io/badge/Design-Responsive-blue)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

Landing page moderna y responsive para taller mecánico en Chile, con despliegue automático en GitHub Pages y preparado para AWS S3.

## 🌐 Demo en Vivo

**👉 [Ver sitio web](https://juanpalacioscmd.github.io/taller-mecanico-landing/)**

*Sitio desplegado automáticamente con GitHub Pages y GitHub Actions*

## 🚀 Características

- ✅ Diseño responsive optimizado para móviles
- ✅ Formulario de contacto funcional
- ✅ Integración con Google Maps
- ✅ Optimizado para SEO
- ✅ Despliegue automático en AWS S3
- ✅ CDN con CloudFront
- ✅ SSL/HTTPS automático

## 🛠️ Stack Tecnológico

- **Frontend:** HTML5, CSS3, JavaScript ES6+
- **Build Tool:** Vite
- **Hosting:** AWS S3 + CloudFront
- **CI/CD:** GitHub Actions
- **IaC:** Terraform

## 📦 Instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd taller-mecanico-landing
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar en modo desarrollo:
```bash
npm run dev
```

4. Construir para producción:
```bash
npm run build
```

## 🏗️ Estructura del Proyecto

```
├── src/
│   ├── assets/
│   │   ├── images/          # Imágenes del sitio
│   │   └── icons/           # Iconos SVG
│   ├── css/                 # Archivos CSS
│   └── js/                  # JavaScript modules
├── terraform/               # Configuración de infraestructura AWS
├── .github/workflows/       # GitHub Actions
├── index.html              # Página principal
└── 404.html               # Página de error
```

## ⚙️ Configuración

### Variables de Entorno

Crear archivo `.env` con:

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### AWS Configuration

1. Configurar credenciales AWS
2. Ejecutar Terraform para crear infraestructura
3. Configurar GitHub Secrets para CI/CD

## 🚀 Despliegue

El despliegue es automático via GitHub Actions cuando se hace push a la rama `main`.

### Manual Deploy

```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name
```

## 📝 Personalización

Editar `src/js/config.js` para personalizar:
- Información del taller
- Servicios ofrecidos
- Datos de contacto
- Configuración de formularios

## 🤝 Contribución

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la branch (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.