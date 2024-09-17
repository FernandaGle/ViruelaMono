import { envs } from "../../src/config/envs";
export function generateIncidentEmailTemplate(title: string,description:string, lat: number, lng: number,genre: String, age: Number): string {
    const mapboxURL = generateMapboxStaticImageURL(lat,lng)
    return `
    <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalles del Incidente</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            border: 1px solid #ddd;
        }
        .header {
            background-color: #007BFF;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            border-bottom: 5px solid #0056b3;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }
        .content {
            padding: 20px;
        }
        .content h2 {
            color: #007BFF;
            margin-top: 0;
        }
        .content p {
            margin: 12px 0;
            font-size: 16px;
        }
        .content .highlight {
            color: #333;
            font-weight: bold;
        }
        .content img {
            max-width: 100%;
            border-radius: 8px;
            margin-top: 15px;
        }
        .footer {
            background-color: #f4f4f4;
            color: #777;
            padding: 15px;
            text-align: center;
            font-size: 14px;
            border-top: 1px solid #ddd;
        }
        .footer a {
            color: #007BFF;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Detalles del Incidente</h1>
        </div>
        <div class="content">
            <h2>Incidente Reportado</h2>
            <p><span class="highlight">Título:</span> ${title}</p>
            <p><span class="highlight">Descripción:</span> ${description}</p>
            <p><span class="highlight">Latitud:</span> ${lat}</p>
            <p><span class="highlight">Longitud:</span> ${lng}</p>
            <img src="${mapboxURL}" alt="Mapa del Incidente" />
        </div>
        <div class="footer">
            <p>Este es un correo generado automáticamente. Por favor, no responda a este mensaje.</p>
            <p>Para cualquier consulta, <a href="mailto:soporte@empresa.com">contáctanos</a>.</p>
        </div>
    </div>
</body>
</html>
    `;
}

export const generateMapboxStaticImageURL= (lat:number, lng:number) =>{
    const accessToken = envs.MAPBOX_ACCESS_TOKEN; // Reemplaza con tu token de acceso de Mapbox
    const zoom = 13; // Nivel de zoom
    const width = 800; // Ancho de la imagen
    const height = 500; // Altura de la imagen
 
    return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-embassy+f74e4e(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
}
