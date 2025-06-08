import React from "react";
import { motion } from "framer-motion";
import "./LoveLetter.css";

const LoveLetter = () => {
  const currentDate = new Date();
  const day = "06";
  const month = "junio";
  const year = "2025";

  return (
    <motion.div
      className="love-letter-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="antique-book-page">
        <div className="handmade-paper">
          {/* Filigrana de fondo */}
          <div className="watermark"></div>

          {/* Sello de cera con efecto 3D */}
          <div className="wax-seal">
            <div className="wax-texture"></div>
            <div className="seal-design">A</div>
            <div className="wax-highlight"></div>
          </div>

          {/* Encabezado ornamentado */}
          <div className="ornamental-header">
            <div className="flourish left"></div>
            <h1>
              <span className="title-word first">Para</span>
              <span className="title-word second">Mi</span>
              <span className="title-word third">Corazón Con Patas</span>
            </h1>
            <div className="flourish right"></div>
          </div>

          <div className="calligraphic-divider"></div>

          {/* Fecha con estilo antiguo */}
          <p className="antique-date">
            <span className="date-day">{day}</span>
            <span className="date-month">{month}</span>
            <span className="date-year">{year}</span>
          </p>

          {/* Cuerpo principal con efecto de pluma */}
          <div className="quill-written-content">
            <p className="first-paragraph">
              <span className="illuminated-letter">A</span>
              <span className="handwritten-text">
                veces me detengo a pensar en todo lo que hemos vivido, y no
                puedo evitar sonreír. No fue un solo momento el que cambió mi
                vida... fuiste tú, poco a poco, día a día, con tu forma de
                mirar, de reír, de abrazar el mundo y también mis emociones.
              </span>
            </p>

            <p className="handwritten-text">
              Esta historia que hemos escrito juntos no es solo un relato de
              momentos, sino un testimonio del amor verdadero, profundo y
              sincero que compartimos. Cada día a tu lado es un regalo que
              atesoro con el alma.
            </p>

            <p className="handwritten-text">
              Este pequeño detalle nace de mi deseo de recordar todo lo que
              hemos vivido. Con el paso del tiempo, he aprendido tanto de ti…
              Aprendí a querer de verdad, a amar sin miedo, y a comprender que
              no estoy solo en este camino llamado vida.
            </p>

            <p className="handwritten-text">
              ¿Quién lo diría, verdad? Aquel chico antipático, que no te
              agradaba y que ni querías ver, hoy te escribe con ternura y
              admiración. Al principio, lo admito: tú no me caías bien ni mal, y
              yo tampoco te agradaba. Mi personalidad odiosa salía sola contigo,
              era mi modo de ser. Si en aquel entonces hice algo que te
              disgustara, lo siento… pero siendo sincero, probablemente hoy
              seguiría siendo igual de odioso :v jajaja.
            </p>

            <p className="handwritten-text">
              Recuerdo bien nuestra segunda conversación. La primera también,
              claro, pero fue la segunda la que me hizo notar que tenías algo
              distinto, algo especial. Yo solo quise ayudarte a ver lo valioso
              que había en ti, y lo sigo haciendo hasta hoy. La chica de aquella
              conversación ha crecido tanto… y no puedo evitar admirarte.
            </p>

            <p className="handwritten-text">
              Te admiro por cómo sigues adelante, por cómo luchas por tus
              sueños, incluso en los días difíciles. Has crecido muchísimo, y
              qué orgullo el mío haber estado cerca para verlo.
            </p>

            <p className="handwritten-text">
              Después de aquella conversación, la vida pasó y perdimos el
              contacto. Y entonces llegó la primera canción que me enviaste:{" "}
              <i>Scared To Be Lonely</i>. Se quedó en mi reproductor y, cada
              tanto, sonaba… y me recordaba a ti. Fue mi forma de mantener tu
              recuerdo (y evitar convertirte en el meme de "Mi amigo… te
              empiezan a olvidar" de la película de Coco 😂).
            </p>

            <p className="handwritten-text">
              Recuerdo aquella clase de Física 3, o más bien la auxiliatura. Por
              alguna razón, quería ir… no para aprender, sino porque algo en mí
              decía que ibas a estar. Solo quería verte de nuevo, para pedirte
              perdón por haberme alejado. ¿Fue bueno o malo haber ido? No lo sé.
              Pero lo que sí sé es que ahí empezó todo: con dos simples
              reacciones que ni siquiera eran emojis (:"3 y :v).
            </p>

            <p className="handwritten-text">
              Lo que vino después se convirtió en el capítulo más bonito de mi
              vida: la etapa de conocernos como amigos, de no captar tus
              indirectas (o fingir que no las captaba para no ilusionarme), de
              hacerme el difícil :v, de mensajes llenos de emoción.
            </p>

            <p className="handwritten-text">
              Recuerdo perfectamente cómo empezó… y también el día en que me
              escribiste lo que sentías. No supe cómo reaccionar: me invadieron
              los nervios, la confusión, la inseguridad… Pero llegó el momento.
              Nos vimos, y estaba tan nervioso que no sabía cómo tocar el tema.
              Pero tú, directa (aunque diste bastantes indirectas primero jeje),
              sacaste el tema… y ahí cambió todo.
            </p>

            <p className="handwritten-text">
              El 05/06/2022 comenzó una nueva historia para ambos. Una historia
              llena de anécdotas, algunas buenas, otras no tanto, pero siempre
              con el corazón dispuesto y la mente positiva.
            </p>

            <p className="handwritten-text">
              Conocerte ha sido lo mejor que me pudo haber pasado. Todo lo que
              he vivido contigo ha sido maravilloso, pero solo porque tú haces
              que lo sea. 💖
            </p>

            <p className="handwritten-text">
              Karen, desde lo más profundo y honesto de mi corazón, quiero
              decirte que te admiro. Te admiro por lo que eres, por lo que
              sueñas, y por la fuerza con la que luchas cada día para hacer
              realidad esos sueños.
            </p>

            <p className="handwritten-text">
              Por eso, hoy quiero pedirte algo, algo que vale más que cualquier
              promesa:
            </p>

            <blockquote className="handwritten-text">
              Si algún día tus ojos no logran ver lo valiosa, valiente y hermosa
              que eres… mírate a través de los míos. Ahí verás a la mujer que me
              inspira, que me conmueve, que amo.
            </blockquote>

            <p className="handwritten-text">
              Quiero verte cumplir cada una de tus metas, pero más que eso,
              quiero que nunca olvides lo maravillosa que eres. Porque cuando tú
              lo olvidas, yo estoy aquí para recordártelo. Siempre.
            </p>

            <p className="handwritten-text">
              Y si alguna vez lo olvidas, vuelve a esta carta, y recuerda:
              <strong>Te Amo</strong>. Ayer, hoy y cada día que venga.
            </p>
          </div>

          {/* Despedida con firma artística */}
          <div className="artistic-signature">
            <div className="signature-line"></div>
            <p className="closing-phrase">Con todo mi amor,</p>
            <div className="signature-name">Francisco</div>
            <div className="ink-flourish"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoveLetter;
