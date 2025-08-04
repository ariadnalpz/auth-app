const express = require('express');
  const cors = require('cors');
  const authRoutes = require('./routes/auth');

  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // Rutas
  app.use('/api/auth', authRoutes);

  // Iniciar servidor
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
  });