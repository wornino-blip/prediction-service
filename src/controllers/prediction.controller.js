const predictionService = require("../services/prediction.service");

// Consultar características
function getFeatures(req, res) {
    res.json({
        features: predictionService.getFeatures()
    });
}

// Procesar petición de predicción
async function predict(req, res) {
    try {
        const { features } = req.body || {};

        const {prediction, latencyMs} =
                await predictionService.predict(features);

        res.json({
            predictionId: 0,
            prediction: prediction,
            timestamp:0,
            latencyMs:latencyMs
        });

    } catch (error) {
        console.error(error);

        res.status(error.status || 500).json({
            error: error.status === 400
                ? error.message
                : "Error al ejecutar la predicción"
        });
    }
}

module.exports = {
    getFeatures,
    predict
};