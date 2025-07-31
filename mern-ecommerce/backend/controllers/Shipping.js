const { calculateShippingCost, getAllShippingZones } = require('../utils/shippingCalculator');

// Calculate shipping cost for an address
exports.calculateShipping = async (req, res) => {
  try {
    const { address, shippingType = 'standard', shippingZoneId } = req.body;

    if (!address) {
      return res.status(400).json({
        success: false,
        message: 'Address is required',
      });
    }

    const result = await calculateShippingCost(address, shippingType, shippingZoneId);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.json({
      success: true,
      message: 'Shipping cost calculated',
      data: result.data,
    });
  } catch (error) {
    console.error('Shipping calculation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error calculating shipping cost',
    });
  }
};

// Get all active shipping zones
exports.getShippingZones = async (req, res) => {
  try {
    const result = await getAllShippingZones();

    if (!result.success) {
      return res.status(500).json(result);
    }

    res.json({
      success: true,
      message: 'Shipping zones fetched',
      data: result.data,
    });
  } catch (error) {
    console.error('Shipping zones fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching shipping zones',
    });
  }
};
