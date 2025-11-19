<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invitación</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .container {
            background-color: #f9f9f9;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #2563eb;
            margin: 0;
        }
        .content {
            background-color: white;
            padding: 25px;
            border-radius: 6px;
            margin-bottom: 20px;
        }
        .button {
            display: inline-block;
            background-color: #2563eb;
            color: white !important;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
            font-weight: bold;
        }
        .button:hover {
            background-color: #1d4ed8;
        }
        .info-box {
            background-color: #eff6ff;
            border-left: 4px solid #2563eb;
            padding: 15px;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #666;
            margin-top: 30px;
        }
        .highlight {
            color: #2563eb;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>¡Bienvenido!</h1>
        </div>
        
        <div class="content">
            <p>Hola <strong>{{ $user->first_name }}</strong>,</p>
            
            <p>Has sido invitado a unirte a <span class="highlight">{{ $businessName }}</span> en nuestra plataforma de fidelización.</p>
            
            <div class="info-box">
                <p style="margin: 0;"><strong>Detalles de tu cuenta:</strong></p>
                <ul style="margin: 10px 0;">
                    <li><strong>Nombre:</strong> {{ $user->first_name }} {{ $user->last_name }}</li>
                    <li><strong>Email:</strong> {{ $user->email }}</li>
                    @if($user->phone_number)
                        <li><strong>Teléfono:</strong> {{ $user->phone_number }}</li>
                    @endif
                    <li><strong>Rol:</strong> {{ $user->role }}</li>
                </ul>
            </div>
            
            <p>Para completar tu registro, debes establecer tu contraseña y confirmar tu información personal.</p>
            
            <center>
                <a href="{{ $invitationUrl }}" class="button">Completar Registro</a>
            </center>
            
            <p style="font-size: 14px; color: #666; margin-top: 20px;">
                Este enlace es válido por 48 horas. Si no completaste tu registro, puedes ignorar este correo.
            </p>
        </div>
        
        <div class="footer">
            <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
            <p>&copy; {{ date('Y') }} {{ $businessName }}. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>