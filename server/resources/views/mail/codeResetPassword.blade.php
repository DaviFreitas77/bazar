<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <title>Recuperar senha</title>
</head>

<body style="
    margin:0;
    padding:0;
    background-color:#f6f9fc;
    font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;
">

    <div style="
        max-width:600px;
        margin:0 auto;
        padding:32px 24px;
        font-family:'Segoe UI', Helvetica, Arial, sans-serif;
        background:#ffffff;
        color:#1f2937;
        text-align:center;
    ">

    
        <p style="
            font-size:22px;
            font-weight:600;
            letter-spacing:2px;
            margin-bottom:32px;
        ">
            BAZAR
        </p>

  
        <h1 style="
            font-size:26px;
            font-weight:600;
            margin-bottom:12px;
            color:#3b2f2f;
        ">
            Recuperação de senha
        </h1>

    
        <p style="
            font-size:16px;
            font-weight:500;
            margin-bottom:24px;
            color:#6b4e3d;
        ">
            Confirme o código e recupere seu acesso.
        </p>


        <p style="
            font-size:14px;
            line-height:1.7;
            margin-bottom:28px;
            color:#4b5563;
        ">
            {{$name}}, recebemos uma solicitação para redefinir a senha da sua conta.<br>
            Se você não solicitou a recuperação de senha, por favor, desconsidere esta mensagem.
        </p>

        <div style="text-align:center; margin: 24px 0;">

            <p style="
                margin-bottom:8px;
                font-size:14px;
                color:#555;
            ">
                Use o código abaixo para continuar:
            </p>

            <div style="
                display:inline-block;
                background:#f4e7dd;
                color:#d39b72;
                padding:16px 32px;
                border-radius:12px;
                font-size:22px;
                font-weight:700;
                letter-spacing:4px;
                font-family:Arial, Helvetica, sans-serif;
            ">
                {{$code}}
            </div>

            <p style="
                margin-top:12px;
                font-size:12px;
                color:#888;
            ">
                Este código é válido por alguns minutos.
            </p>

        </div>

    </div>

</body>

</html>