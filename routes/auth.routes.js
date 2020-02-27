const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()


// /api/auth/register
router.post(
    '/register',
    [
      check('email', 'Ungültige E-Mail').isEmail(),
      check('password', 'Minimale Passwortlänge 3 Zeichen')
          .isLength({ min: 3 })
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'Falsche Daten bei der Registrierung'
          })
        }

        const {email, password} = req.body

        const candidate = await User.findOne({ email })

        if (candidate) {
          return res.status(400).json({ message: 'Dieser Benutzer existiert bereits.' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPassword })

        await user.save()

        res.status(201).json({ message: 'Benutzer erstellt' })

      } catch (e) {
        res.status(500).json({ message: 'uuups' })
      }
    })

// /api/auth/login
router.post(
    '/login',
    [
      check('email', 'Bitte geben Sie eine gültige E-Mail-Adresse ein').normalizeEmail().isEmail(),
      check('password', 'Passwort eingeben').exists()
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'Falsche Daten beim Login'
          })
        }

        const {email, password} = req.body

        const user = await User.findOne({ email })

        if (!user) {
          return res.status(400).json({ message: 'Benutzer nicht gefunden' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
          return res.status(400).json({ message: 'Ungültiges Passwort, versuchen Sie es erneut' })
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )

        res.json({ token, userId: user.id })

      } catch (e) {
        res.status(500).json({ message: 'Es ist ein Fehler aufgetreten. Versuchen Sie es erneut' })
      }
    })


module.exports = router
