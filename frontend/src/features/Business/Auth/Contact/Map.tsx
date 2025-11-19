// src/features/Business/Auth/Contact/Map.tsx
import React from "react";

/**
 * Componente React que envuelve el iframe de Google Maps.
 */
export default function Map() {
  return (
    // Es buena práctica envolver el iframe en un div
    // para controlar el ancho dentro del layout de React.
    <div style={{ width: "100%" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1256.6048778465574!2d-58.6032358!3d-34.6405659!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc951c0fe2d9f5%3A0x9f1c540898efecbe!2sUTN%20HAEDO!5e1!3m2!1ses-419!2sar!4v1763478159850!5m2!1ses-419!2sar"
        width="100%" // Ajuste para que sea responsivo
        height="300"
        style={{ border: 0, borderRadius: "8px" }}
        allowFullScreen={true} // Correcto: camelCase en JSX
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade" // Correcto: camelCase en JSX
        title="Ubicación de la empresa en Google Maps"
      />
    </div>
  );
}
