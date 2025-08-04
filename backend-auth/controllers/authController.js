const pool = require('../config/db');
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  const speakeasy = require('speakeasy');

  // Registro de usuario
  const register = async (req, res) => {
      const { nombre, apellido, correo, password } = req.body;

      try {
          // Verificar si el correo ya está registrado
          const [existingUser] = await pool.query('SELECT * FROM users WHERE correo = ?', [correo]);
          if (existingUser.length > 0) {
              return res.status(400).json({ message: 'El correo ya está registrado' });
          }

          // Encriptar contraseña
          const hashedPassword = await bcrypt.hash(password, 10);

          // Generar secreto para 2FA
          const secret = speakeasy.generateSecret({
              name: `MiApp:${correo}`
          });

          // Guardar usuario en la base de datos
          await pool.query(
              'INSERT INTO users (nombre, apellido, correo, password, secret_2fa, is_2fa_enabled) VALUES (?, ?, ?, ?, ?, ?)',
              [nombre, apellido, correo, hashedPassword, secret.base32, true]
          );

          // Devolver el secreto para que el usuario lo escanee con Google Authenticator
          res.status(201).json({
              message: 'Usuario registrado exitosamente',
              secret: secret.base32,
              qr_url: secret.otpauth_url // Para generar un QR en el frontend más adelante
          });
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error en el servidor' });
      }
  };

  // Login de usuario
  const login = async (req, res) => {
      const { correo, password, token_2fa } = req.body;

      try {
          // Verificar si el usuario existe
          const [user] = await pool.query('SELECT * FROM users WHERE correo = ?', [correo]);
          if (user.length === 0) {
              return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
          }

          // Verificar contraseña
          const isPasswordValid = await bcrypt.compare(password, user[0].password);
          if (!isPasswordValid) {
              return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
          }

          // Verificar 2FA si está habilitado
          if (user[0].is_2fa_enabled) {
              if (!token_2fa) {
                  return res.status(400).json({ message: 'Se requiere el código 2FA' });
              }

              const is2FAValid = speakeasy.totp.verify({
                  secret: user[0].secret_2fa,
                  encoding: 'base32',
                  token: token_2fa
              });

              if (!is2FAValid) {
                  return res.status(400).json({ message: 'Código 2FA inválido' });
              }
          }

          // Generar token JWT
          const token = jwt.sign(
              { id: user[0].id, correo: user[0].correo },
              process.env.JWT_SECRET,
              { expiresIn: '1h' }
          );

          res.json({ message: 'Login exitoso', token });
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error en el servidor' });
      }
  };

  module.exports = { register, login };