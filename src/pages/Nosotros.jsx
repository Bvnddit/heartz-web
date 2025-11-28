import React from "react";
import { motion } from "framer-motion";

export default function Nosotros() {
  return (
    <div className="bg-black text-gray-200 min-h-screen">
      {/* Encabezado */}
      <section className="text-center py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl font-bold mb-6 text-white tracking-wide"
          >
            Acerca de <span className="text-red-500">Nosotros</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-lg text-gray-400 leading-relaxed"
          >
            <strong className="text-gray-100">Heartz</strong> es una tienda chilena dedicada a la venta de vinilos de música, ofreciendo a los
            melómanos una experiencia única al reconectar con el formato clásico del vinilo.
            Fundada en 2020 en Santiago, la tienda se ha posicionado como un referente en el
            mercado nacional gracias a su catálogo diverso que incluye desde clásicos del rock,
            jazz y soul hasta lanzamientos contemporáneos.
            <br /><br />
            Heartz realiza envíos a todo Chile y participa activamente en ferias musicales locales.
          </motion.p>
        </div>
      </section>

      {/* Separador visual */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "75%", opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="border-t border-gray-800 mx-auto"
      ></motion.div>

      {/* Nuestra Misión */}
      <section className="text-center py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl font-semibold mb-6 text-white tracking-wide"
          >
            Nuestra <span className="text-red-500">Misión</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-3xl mx-auto text-lg text-gray-400 leading-relaxed"
          >
            Buscamos ofrecer vinilos de alta calidad y ediciones exclusivas que permitan a nuestros clientes
            disfrutar de la música en su formato más auténtico, promoviendo al mismo tiempo la
            <span className="text-gray-100 font-medium"> cultura del vinilo en Chile</span>.
          </motion.p>
        </div>
      </section>

      {/* Pie simple */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="text-center text-gray-600 py-8 text-sm border-t border-gray-800"
      >
      </motion.footer>
    </div>
  );
}
