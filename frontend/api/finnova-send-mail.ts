import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function waitlistEmailHTML(fullName: string, appUrl: string) {
    const firstName = (fullName || '').trim().split(/\s+/)[0] || 'Hola';

    const headerImg = `${appUrl}/email/Welcome.png`;
    const iconAccess = `${appUrl}/email/Access.png`;
    const iconUpdates = `${appUrl}/email/Updates.png`;
    const iconPriority = `${appUrl}/email/Priority.png`;

    return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;">
          <tr>
            <td style="border-radius:18px;overflow:hidden;">
              <img src="${headerImg}" width="560" style="display:block;width:100%;max-width:560px;height:auto;border:0;outline:none;text-decoration:none;" alt="Bienvenido a Finnova" />
            </td>
          </tr>

          <tr><td style="height:18px;line-height:18px;font-size:0;">&nbsp;</td></tr>

          <tr>
            <td align="center" style="color:#0b0f14;font-size:22px;font-weight:700;">
              ¡Muchas gracias, ${firstName}!
            </td>
          </tr>

          <tr><td style="height:10px;line-height:10px;font-size:0;">&nbsp;</td></tr>

          <tr>
            <td align="center" style="padding:0 18px;color:#2b2f33;font-size:13px;line-height:1.5;">
              Queremos confirmar que ya estás oficialmente en nuestra<br/>
              waitlist para el <b>early access</b>.<br/><br/>
              Eso significa que serás de las primeras personas en acceder a la plataforma cuando la lancemos,
              además de recibir <b>novedades, avances y beneficios exclusivos</b> para early users.
            </td>
          </tr>

          <tr><td style="height:18px;line-height:18px;font-size:0;">&nbsp;</td></tr>

          <tr>
            <td align="center">
              <div style="width:220px;height:6px;border-radius:999px;background:#0b3b2f;"></div>
            </td>
          </tr>

          <tr><td style="height:22px;line-height:22px;font-size:0;">&nbsp;</td></tr>

          <tr>
            <td align="center" style="color:#0b0f14;font-size:20px;font-weight:700;">
              ¿Qué sigue?
            </td>
          </tr>

          <tr><td style="height:16px;line-height:16px;font-size:0;">&nbsp;</td></tr>

          <tr>
            <td style="padding:0 18px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="background:#f2f2f2;border-radius:14px;padding:16px;text-align:center;">
                  <img src="${iconAccess}" width="48" height="48" style="display:block;margin:0 auto;border:0;" alt="" />
                  <div style="height:10px;"></div>
                  <div style="font-size:12px;color:#2b2f33;">Te avisaremos por correo cuando se habilite el acceso</div>
                </td></tr>
              </table>
            </td>
          </tr>

          <tr><td style="height:12px;line-height:12px;font-size:0;">&nbsp;</td></tr>

          <tr>
            <td style="padding:0 18px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="background:#f2f2f2;border-radius:14px;padding:16px;text-align:center;">
                  <img src="${iconUpdates}" width="48" height="48" style="display:block;margin:0 auto;border:0;" alt="" />
                  <div style="height:10px;"></div>
                  <div style="font-size:12px;color:#2b2f33;">Compartiremos actualizaciones del desarrollo</div>
                </td></tr>
              </table>
            </td>
          </tr>

          <tr><td style="height:12px;line-height:12px;font-size:0;">&nbsp;</td></tr>

          <tr>
            <td style="padding:0 18px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="background:#f2f2f2;border-radius:14px;padding:16px;text-align:center;">
                  <img src="${iconPriority}" width="48" height="48" style="display:block;margin:0 auto;border:0;" alt="" />
                  <div style="height:10px;"></div>
                  <div style="font-size:12px;color:#2b2f33;">Tendrás prioridad en nuevas funciones y pruebas beta</div>
                </td></tr>
              </table>
            </td>
          </tr>

          <tr><td style="height:22px;line-height:22px;font-size:0;">&nbsp;</td></tr>

          <tr>
            <td align="center">
              <div style="width:220px;height:6px;border-radius:999px;background:#0b3b2f;"></div>
            </td>
          </tr>

          <tr><td style="height:18px;line-height:18px;font-size:0;">&nbsp;</td></tr>

          <tr>
            <td align="center" style="padding:0 22px;color:#2b2f33;font-size:12px;line-height:1.6;">
              Estamos construyendo Finnova para ayudarte a tomar control de tus finanzas de forma simple, inteligente y segura,
              y nos emociona tenerte desde el inicio.
              <br/><br/>
              Si tienes dudas o comentarios, puedes contactarnos a través del correo:
              <br/>
              <a href="mailto:finnova.lyratech@gmail.com" style="color:#0b3b2f;text-decoration:none;font-weight:700;">finnova.lyratech@gmail.com</a>
              <br/><br/>
              Gracias por confiar en nosotros.<br/>
              Equipo Finnova.
              <br/><br/>
              <b>Finnova.</b> Tu mapa financiero
            </td>
          </tr>

          <tr><td style="height:12px;line-height:12px;font-size:0;">&nbsp;</td></tr>
        </table>
      </td>
    </tr>
  </table>
  `;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ ok: false, message: 'Method not allowed' });
    }

    try {
        const { name, email } = req.body || {};

        if (!email || !/^\S+@\S+\.\S+$/.test(String(email))) {
            return res.status(400).json({ ok: false, message: 'Email inválido' });
        }

        // 🔥 Lee tu dominio público
        const appUrl =
            process.env.PUBLIC_APP_URL || 'https://finnova.com.mx';

        const html = waitlistEmailHTML(String(name || ''), appUrl);

        const result = await resend.emails.send({
            from: 'Finnova <waitlist@finnova.com.mx>',
            to: String(email),
            replyTo: 'finnova.lyratech@gmail.com',
            subject: 'Confirmación de registro - Bienvenido a Finnova',
            html,
        });

        if (result.error) {
            return res.status(result.error.statusCode || 400).json({
                ok: false,
                message: result.error.message,
            });
        }

        return res.status(200).json({
            ok: true,
            message: 'Correo enviado',
        });

    } catch (e: any) {
        console.error(e);
        return res.status(500).json({
            ok: false,
            message: 'Error enviando correo',
        });
    }
}