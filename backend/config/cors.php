<?php
 return [
    'paths' => ['/*', 'sanctum/csrf-cookie'], // Aplica CORS a estas rutas
    'allowed_methods' => ['*'], // Permite todos los métodos (GET, POST, PUT, DELETE, etc.)
    'allowed_origins' => ['http://localhost:4200'], // Permite peticiones desde cualquier origen
    'allowed_origins_patterns' => [], // No se necesita patrón específico
    'allowed_headers' => ['*'], // Permite todos los headers
    'exposed_headers' => [],
    'max_age' => 0, // Tiempo máximo que se permite para cachear la respuesta CORS
    'supports_credentials' => false, // Cambiar a `true` si usas autenticación basada en cookies o sesiones
];
