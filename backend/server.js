const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { MercadoPagoConfig, Preference } = require('mercadopago');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());

app.use(cors({ origin: process.env.FRONTEND_URL }));

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

// 🔒 ESTE ES TU CATÁLOGO MAESTRO (La fuente de la verdad)
// Nadie desde el frontend puede cambiar estos números
const PRODUCTOS = {
    'paquete_base': { title: 'Paquete Base', price: 5500 },
    'paquete_premium': { title: 'Paquete Premium', price: 7500 },
    'cabina_led': { title: 'Cabina LED Pro', price: 12000 },
    'cabina_espejo': { title: 'Cabina Espejo', price: 15000 }
};

app.post('/api/create-preference', async (req, res) => {
    try {
        // El frontend solo nos manda el ID del producto y horas extra
        const { productId, extraHours = 0 } = req.body;
        
        const producto = PRODUCTOS[productId];
        if (!producto) {
            return res.status(400).json({ error: "Producto no encontrado" });
        }

        // Calculamos el precio real en el backend (Seguridad)
        const precioHoraExtra = 500; 
        const total = producto.price + (Number(extraHours) * precioHoraExtra);

        const body = {
            items: [{
                id: productId,
                title: `${producto.title} ${extraHours > 0 ? `+ ${extraHours}h extra` : ''}`,
                quantity: 1,
                unit_price: total,
                currency_id: 'MXN',
            }],
            back_urls: {
                success: `${process.env.FRONTEND_URL}/pago-exitoso`,
                failure: `${process.env.FRONTEND_URL}/pago-fallido`
            },
            auto_return: 'approved',
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });

        res.json({ id: result.id, init_point: result.init_point });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error interno" });
    }
});

app.listen(PORT, () => console.log(`Servidor seguro y dinámico corriendo en ${PORT}`));
