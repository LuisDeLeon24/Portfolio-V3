# Correo de contacto

La portada envía el formulario a `POST /api/contact` del mismo dominio. El Worker atiende esa ruta independientemente de si la web se sirve desde Cloudflare Pages o Workers. El remitente es `contacto@ldeleon.com`, el destino es el Gmail del portafolio y «Responder» usa el correo del visitante.

## Activar

1. En Cloudflare Email Service, habilita el dominio remitente y verifica `ldeleonb06@gmail.com` como dirección de destino de Email Routing. La verificación llega a ese buzón. Los envíos a un destino verificado están incluidos en Workers Free. Si el dominio ya recibe correo en Zoho u otro proveedor, conserva sus MX y configura Email Routing en un subdominio dedicado. En ese caso actualiza `CONTACT_FROM` para usar ese subdominio.
2. Comprueba las rutas de `wrangler.jsonc`. Conserva los hostnames que sirvan el portafolio mediante DNS con proxy de Cloudflare. El envío queda restringido a `destination_address`, que debe coincidir con `CONTACT_TO`.
3. Desde esta carpeta, con una cuenta que tenga acceso a la zona, ejecuta `npx wrangler@4 login` y `npx wrangler@4 deploy`. Publica también la versión del frontend que contiene el nuevo formulario. No hace falta una clave de Resend ni una contraseña de Gmail.
4. Abre Contact en tu dominio, envía un mensaje de prueba y comprueba el destino de «Responder» en Gmail.

## Desarrollo

Desde esta carpeta, `npx wrangler@4 dev --port 8787` levanta el Worker. El servidor de Vite en `web/` reenvía las peticiones de contacto a ese puerto. Para probar sin enviar correo, ejecuta `node --test contact.test.mjs`, que usa dobles de los servicios de Cloudflare.

[Direcciones verificadas](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/) · [Precios](https://developers.cloudflare.com/email-service/platform/pricing/) · [Binding de envío](https://developers.cloudflare.com/email-service/configuration/send-bindings/)
