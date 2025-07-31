const ShippingZone = require('../models/ShippingZone');

// Find shipping zone by address
exports.findShippingZone = async (address) => {
  try {
    const { city, state, country = 'US' } = address;

    // First try to match by city
    let zone = await ShippingZone.findOne({
      cities: { $regex: new RegExp(city, 'i') },
      countries: { $in: [country] },
      isActive: true,
    });

    // If no city match, try by state
    if (!zone && state) {
      zone = await ShippingZone.findOne({
        states: { $regex: new RegExp(state, 'i') },
        countries: { $in: [country] },
        isActive: true,
      });
    }

    // If still no match, try by country only
    if (!zone) {
      zone = await ShippingZone.findOne({
        countries: { $in: [country] },
        isActive: true,
      });
    }

    return zone;
  } catch (error) {
    console.error('Error finding shipping zone:', error);
    return null;
  }
};

// Calculate shipping cost
exports.calculateShippingCost = async (
  address,
  shippingType = 'standard',
  shippingZoneId = null
) => {
  try {
    let zone;

    // If shippingZoneId is provided, fetch directly
    if (shippingZoneId) {
      zone = await ShippingZone.findById(shippingZoneId);
      if (!zone || !zone.isActive) {
        return {
          success: false,
          message: 'Invalid or inactive shipping zone',
        };
      }
    } else {
      // Find zone by address
      zone = await exports.findShippingZone(address);
      if (!zone) {
        return {
          success: false,
          message: 'No shipping zone found for this address',
        };
      }
    }

    // Get shipping price based on type
    const shippingPrice = shippingType === 'express' ? zone.expressPrice : zone.standardPrice;
    const estimatedDays =
      shippingType === 'express' ? zone.estimatedDays.express : zone.estimatedDays.standard;

    return {
      success: true,
      data: {
        shippingZone: zone._id,
        shippingPrice,
        shippingType,
        estimatedDays,
        zoneName: zone.name,
      },
    };
  } catch (error) {
    console.error('Error calculating shipping cost:', error);
    return {
      success: false,
      message: 'Error calculating shipping cost',
    };
  }
};

// Get all active shipping zones
exports.getAllShippingZones = async () => {
  try {
    const zones = await ShippingZone.find({ isActive: true }).select('-__v');
    return {
      success: true,
      data: zones,
    };
  } catch (error) {
    console.error('Error fetching shipping zones:', error);
    return {
      success: false,
      message: 'Error fetching shipping zones',
    };
  }
};
