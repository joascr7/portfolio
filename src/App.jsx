import "./style.css";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

import acaiImg from "./assets/acai.png";
import barbeariaImg from "./assets/barbearia.png";
import acai1 from "./assets/acai1.png";
import acai2 from "./assets/acai2.png";
import acai3 from "./assets/acai3.png";
import acai4 from "./assets/acai4.png";
import acai5 from "./assets/acai5.png";
import acai6 from "./assets/acai6.png";

const projetos = [
  {
    nome: "App Açaí",
    desc: "Sistema completo com pedidos e pagamento Pix",
    img: acai1,
    imagens: [acai1, acai2, acai3, acai4, acai5, acai6],
    link: "https://acai-daiane.vercel.app" // 🔥 CONFERE SE ESSE LINK EXISTE
  },
  {
    nome: "Barbearia",
    desc: "Agendamento com controle de clientes",
    img: barbeariaImg,
    link: "https://SEU-APP-BARBEARIA.vercel.app"
  }
];

export default function App() {


  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

  // 🔥 REFERÊNCIA DO MOCKUP
  const phoneRef = useRef();
  

  // 🔥 ESTADOS
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const lightRef = useRef();

  // 🔥 LOADING
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  // 🔥 EFEITO 3D
  function handleMove(e) {
    const rect = phoneRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 15;
    const rotateY = (x - centerX) / 15;

    phoneRef.current.style.transform = `
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg)
      scale(1.05)
    `;
  }

  function handleLight(e) {
  const rect = lightRef.current.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  lightRef.current.style.setProperty("--x", `${x}px`);
  lightRef.current.style.setProperty("--y", `${y}px`);
}

  function resetMove() {
    phoneRef.current.style.transform = `
      rotateX(0deg) 
      rotateY(0deg)
      scale(1)
    `;
  }

  // 🔥 TELA DE LOADING
  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
        <p>Carregando experiência premium...</p>
      </div>
    );
  }

  return (
    <div className="container">

      {/* HERO */}
      <motion.section 
        className="hero"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content">

          {/* TEXTO */}
          <div className="hero-text">
            <h1>Joás</h1>

            <p>
              Crio sites e sistemas que ajudam negócios a vender todos os dias.
            </p>

            <div className="buttons">
              <button onClick={() => scrollTo("projetos")}>
                Ver Projetos
              </button>

              <button 
                className="outline"
                onClick={() => window.open(import.meta.env.VITE_WHATSAPP)}
              >
                WhatsApp
              </button>
            </div>
          </div>
         {/* INFO DOS CARDS */}
          <section className="services">
            <h2>O que eu faço</h2>

            <div className="grid">
           <div className="card">
         <h3>Sites Profissionais</h3>
       <p>Sites rápidos, modernos e que convertem clientes.</p>
       </div>

       <div className="card">
      <h3>Sistemas de Pedido</h3>
      <p>Apps como iFood para seu negócio vender mais.</p>
    </div>

    <div className="card">
      <h3>Automação</h3>
      <p>Processos automáticos para economizar tempo e dinheiro.</p>
    </div>
  </div>
</section>

          {/* MOCKUP */}
          <motion.div 
            className="hero-phone" ref={lightRef} onMouseMove={handleLight}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            
          >
            <div 
              className="phone floating"
              onClick={() => setPreview(projetos[0])} // 🔥 ABRE APP AÇAÍ
              onMouseMove={handleMove}
              onMouseLeave={resetMove}
              ref={phoneRef}
            >
              <div className="phone-content">
              <img src={acaiImg} alt="App Açaí" />

              <button
              className="demo-btn"
              onClick={(e) => {
              e.stopPropagation(); // 🔥 não ativa o clique do celular
              window.open(projetos[0].link, "_blank");
              }}
              >
              demo
             </button>
             </div>

            </div>
          </motion.div>

        </div>
      </motion.section>

      {/* CONTATO */}
      <section className="contact">
  <h2>Vamos criar seu projeto?</h2>

  <p>
    Fale comigo agora e transforme sua ideia em um sistema profissional.
  </p>

  <button 
  className="whatsapp"
  onClick={() => window.open(import.meta.env.VITE_WHATSAPP)}
>
  Falar no WhatsApp
</button>
</section>

      {/* 🔥 MODAL */}
{preview && (
  <div className="modal" onClick={() => setPreview(null)}>
    
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>

      {/* 🔥 SWIPE + ANIMAÇÃO */}
      <motion.div
        className="gallery-container"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(e, info) => {
          if (info.offset.x < -50) {
            setIndex((prev) =>
              prev === preview.imagens.length - 1 ? 0 : prev + 1
            );
          }
          if (info.offset.x > 50) {
            setIndex((prev) =>
              prev === 0 ? preview.imagens.length - 1 : prev - 1
            );
          }
        }}
      >
        <motion.img
          key={index}
          src={preview.imagens[index]}
          className="gallery-main"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: zoom ? 1.5 : 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => setZoom(!zoom)}
        />
      </motion.div>

      {/* 🔥 BOTÕES */}
      <button
        className="nav left"
        onClick={() =>
          setIndex((prev) =>
            prev === 0 ? preview.imagens.length - 1 : prev - 1
          )
        }
      >
        ‹
      </button>

      <button
        className="nav right"
        onClick={() =>
          setIndex((prev) =>
            prev === preview.imagens.length - 1 ? 0 : prev + 1
          )
        }
      >
        ›
      </button>

      {/* 🔥 DOTS */}
      <div className="dots">
        {preview.imagens.map((_, i) => (
          <span
            key={i}
            className={i === index ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      {/* 🔥 AÇÕES */}
      <div className="modal-actions">
        <button onClick={() => window.open(preview.link)}>
          Ver demo real
        </button>

        <button onClick={() => setPreview(null)}>
          ✕
        </button>
      </div>

    </div>
  </div>
)}

    </div>
  );
}

// 🔥 SCROLL SUAVE
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}