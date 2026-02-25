<template>
  <div class="page">
    <div class="frame">
      <!-- Email canvas -->
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" class="email-bg">
        <tr>
          <td align="center" style="padding: 24px 12px">
            <table
                width="560"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                class="container"
            >
              <!-- Header image -->
              <tr>
                <td class="headerWrap">
                  <img :src="headerImg" width="560" class="headerImg" alt="Bienvenido a Finnova" />
                </td>
              </tr>

              <tr><td style="height: 18px; line-height: 18px; font-size: 0">&nbsp;</td></tr>

              <!-- Title -->
              <tr>
                <td align="center" class="title">
                  ¡Muchas gracias, {{ firstName }}!
                </td>
              </tr>

              <tr><td style="height: 10px; line-height: 10px; font-size: 0">&nbsp;</td></tr>

              <!-- Body -->
              <tr>
                <td align="center" class="body">
                  Queremos confirmar que ya estás oficialmente en nuestra<br />
                  waitlist para el <b>early access</b>.<br /><br />
                  Eso significa que serás de las primeras personas en acceder a la plataforma cuando la
                  lancemos, además de recibir <b>novedades, avances y beneficios exclusivos</b> para
                  early users.
                </td>
              </tr>

              <tr><td style="height: 18px; line-height: 18px; font-size: 0">&nbsp;</td></tr>

              <!-- Divider -->
              <tr>
                <td align="center">
                  <div class="divider"></div>
                </td>
              </tr>

              <tr><td style="height: 22px; line-height: 22px; font-size: 0">&nbsp;</td></tr>

              <!-- Section title -->
              <tr>
                <td align="center" class="sectionTitle">¿Qué sigue?</td>
              </tr>

              <tr><td style="height: 16px; line-height: 16px; font-size: 0">&nbsp;</td></tr>

              <!-- Cards -->
              <tr>
                <td style="padding: 0 18px">
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td>
                        <div class="card">
                          <img :src="iconAccess" width="48" height="48" class="icon" alt="" />
                          <div class="cardText">Te avisaremos por correo cuando se habilite el acceso</div>
                        </div>

                        <div style="height: 12px"></div>

                        <div class="card">
                          <img :src="iconUpdates" width="48" height="48" class="icon" alt="" />
                          <div class="cardText">Compartiremos actualizaciones del desarrollo</div>
                        </div>

                        <div style="height: 12px"></div>

                        <div class="card">
                          <img :src="iconPriority" width="48" height="48" class="icon" alt="" />
                          <div class="cardText">Tendrás prioridad en nuevas funciones y pruebas beta</div>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr><td style="height: 22px; line-height: 22px; font-size: 0">&nbsp;</td></tr>

              <!-- Divider -->
              <tr>
                <td align="center">
                  <div class="divider"></div>
                </td>
              </tr>

              <tr><td style="height: 18px; line-height: 18px; font-size: 0">&nbsp;</td></tr>

              <!-- Footer -->
              <tr>
                <td align="center" class="footer">
                  Estamos construyendo Finnova para ayudarte a tomar control de tus finanzas de forma
                  simple, inteligente y segura, y nos emociona tenerte desde el inicio.
                  <br /><br />
                  Si tienes dudas o comentarios, puedes contactarnos a través de el correo:
                  <br />
                  <a href="mailto:support@finnova.com.mx" class="mail">support@finnova.com.mx</a>
                  <br /><br />
                  Gracias por confiar en nosotros.<br />
                  Equipo Finnova.
                  <br /><br />
                  <b>Finnova.</b> Tu mapa financiero
                </td>
              </tr>

              <tr><td style="height: 12px; line-height: 12px; font-size: 0">&nbsp;</td></tr>
            </table>
          </td>
        </tr>
      </table>
    </div>

    <!-- Quick controls (solo preview) -->
    <div class="controls">
      <label>Nombre para probar</label>
      <input v-model="name" placeholder="Ricardo Sierra Roa" />
      <small>Esto es solo preview en Vue. El email real se manda como HTML con estilos inline.</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const name = ref('Ricardo Sierra Roa');
const firstName = computed(() => name.value.trim().split(/\s+/)[0] || 'Hola');

// Images desde /public/email/...
const headerImg = '/email/Welcome.png';
const iconAccess = '/email/Access.png';
const iconUpdates = '/email/Updates.png';
const iconPriority = '/email/Priority.png';
</script>

<style scoped>
.page {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 18px;
  padding: 18px;
  background: #0b0f14;
  min-height: 100vh;
  box-sizing: border-box;
}
.frame {
  background: #222;
  border-radius: 14px;
  padding: 14px;
  overflow: auto;
}
.email-bg {
  width: 100%;
  background: #ffffff;
  font-family: Arial, Helvetica, sans-serif;
}
.container {
  width: 100%;
  max-width: 560px;
}
.headerWrap {
  border-radius: 18px;
  overflow: hidden;
}
.headerImg {
  display: block;
  width: 100%;
  max-width: 560px;
  height: auto;
  border: 0;
}
.title {
  color: #0b0f14;
  font-size: 22px;
  font-weight: 700;
}
.body {
  padding: 0 18px;
  color: #2b2f33;
  font-size: 13px;
  line-height: 1.5;
}
.divider {
  width: 220px;
  height: 6px;
  border-radius: 999px;
  background: #0b3b2f;
}
.sectionTitle {
  color: #0b0f14;
  font-size: 20px;
  font-weight: 700;
}
.card {
  background: #f2f2f2;
  border-radius: 14px;
  padding: 16px;
  text-align: center;
}
.icon {
  display: block;
  margin: 0 auto;
}
.cardText {
  margin-top: 10px;
  color: #2b2f33;
  font-size: 12px;
}
.footer {
  padding: 0 22px;
  color: #2b2f33;
  font-size: 12px;
  line-height: 1.6;
}
.mail {
  color: #0b3b2f;
  text-decoration: none;
  font-weight: 700;
}
.controls {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 14px;
  color: #fff;
  height: fit-content;
}
.controls label {
  display: block;
  font-weight: 700;
  margin-bottom: 8px;
}
.controls input {
  width: 100%;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
  padding: 10px 12px;
  outline: none;
}
.controls small {
  display: block;
  margin-top: 10px;
  opacity: 0.7;
  line-height: 1.4;
}
@media (max-width: 980px) {
  .page {
    grid-template-columns: 1fr;
  }
}
</style>